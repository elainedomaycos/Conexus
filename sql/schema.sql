-- Conexus CMS - Supabase SQL Schema
-- Run this in Supabase SQL Editor to set up the database

-- ============================================================================
-- 1. CREATE MAIN CONTENT TABLE
-- ============================================================================

CREATE TABLE cms_content (
  id BIGSERIAL PRIMARY KEY,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Add index for faster queries
CREATE INDEX idx_cms_content_id ON cms_content(id);
CREATE INDEX idx_cms_content_updated_at ON cms_content(updated_at DESC);

-- ============================================================================
-- 2. CREATE UPDATE TRIGGER
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cms_content_updated_at
BEFORE UPDATE ON cms_content
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- 3. INSERT INITIAL CONTENT ROW
-- ============================================================================

INSERT INTO cms_content (content) 
VALUES ('{
  "team": [],
  "services": [],
  "projects": [],
  "achievements": []
}'::jsonb) 
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 5. CREATE RLS POLICIES
-- ============================================================================

-- Allow authenticated users to read content
CREATE POLICY "Allow authenticated users to read cms_content"
ON cms_content
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to update content
CREATE POLICY "Allow authenticated users to update cms_content"
ON cms_content
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================================================
-- 6. CREATE AUDIT LOG TABLE (Optional - for tracking changes)
-- ============================================================================

CREATE TABLE cms_audit_log (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL, -- 'CREATE', 'UPDATE', 'DELETE'
  table_name TEXT NOT NULL,
  record_id BIGINT,
  changes JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_audit_log_user_id ON cms_audit_log(user_id);
CREATE INDEX idx_audit_log_created_at ON cms_audit_log(created_at DESC);
CREATE INDEX idx_audit_log_table_name ON cms_audit_log(table_name);

-- ============================================================================
-- 7. CREATE AUDIT TRIGGER (Optional)
-- ============================================================================

CREATE OR REPLACE FUNCTION audit_cms_changes()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO cms_audit_log (user_id, action, table_name, record_id, changes)
  VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    NEW.id,
    jsonb_build_object(
      'old', to_jsonb(OLD),
      'new', to_jsonb(NEW)
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_cms_content
AFTER UPDATE ON cms_content
FOR EACH ROW
EXECUTE FUNCTION audit_cms_changes();

-- ============================================================================
-- 8. STORAGE BUCKET SETUP (Run in Supabase Dashboard)
-- ============================================================================

-- Note: Storage buckets must be created via Supabase Dashboard UI
-- Steps:
-- 1. Go to Storage in Supabase Dashboard
-- 2. Click "Create new bucket"
-- 3. Name: portfolio-images
-- 4. Uncheck "Private bucket" (make it public)
-- 5. Click Create
-- 6. Go to Configuration → MIME Types
-- 7. Add: image/*
-- 8. Save

-- ============================================================================
-- 9. HELPFUL QUERIES
-- ============================================================================

-- Get all content
SELECT content FROM cms_content WHERE id = 1;

-- Get only team data
SELECT content->'team' as team FROM cms_content WHERE id = 1;

-- Get only services
SELECT content->'services' as services FROM cms_content WHERE id = 1;

-- Get specific team member
SELECT content->'team'->0 as first_member FROM cms_content WHERE id = 1;

-- Count team members
SELECT jsonb_array_length(content->'team') as team_count FROM cms_content WHERE id = 1;

-- View audit log
SELECT * FROM cms_audit_log ORDER BY created_at DESC LIMIT 20;

-- Get updates by specific user
SELECT * FROM cms_audit_log 
WHERE user_id = 'your-user-id-here' 
ORDER BY created_at DESC;

-- ============================================================================
-- 10. BACKUP & RESTORE
-- ============================================================================

-- Backup content to JSON (run in pgAdmin or terminal)
-- SELECT content FROM cms_content WHERE id = 1;

-- Restore from backup
-- UPDATE cms_content SET content = '{"team":...}' WHERE id = 1;

-- ============================================================================
-- 11. CLEANUP & MAINTENANCE
-- ============================================================================

-- Delete old audit logs (keep last 90 days)
DELETE FROM cms_audit_log 
WHERE created_at < now() - interval '90 days';

-- Check table size
SELECT pg_size_pretty(pg_total_relation_size('cms_content'));
SELECT pg_size_pretty(pg_total_relation_size('cms_audit_log'));

-- Vacuum & analyze (optimize performance)
VACUUM ANALYZE cms_content;
VACUUM ANALYZE cms_audit_log;

-- ============================================================================
-- 12. TESTING QUERIES
-- ============================================================================

-- Test INSERT (create admin user first)
-- CREATE USER test_admin@example.com PASSWORD 'test123';

-- Test RLS (should work if authenticated)
-- SELECT * FROM cms_content WHERE id = 1;

-- Test UPDATE (should work if authenticated)
-- UPDATE cms_content 
-- SET content = content || '{"test": true}'
-- WHERE id = 1;

-- ============================================================================
-- Notes:
-- - JSONB is flexible and allows storing complex nested data
-- - RLS ensures only authenticated users can access data
-- - Audit log tracks all changes for compliance & recovery
-- - Storage bucket is managed via Supabase UI (not SQL)
-- - All timestamps use UTC (good practice)
-- - updated_at auto-updates on every modification
-- ============================================================================
