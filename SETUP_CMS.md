# Conexus CMS Setup Guide

## Overview
This guide walks you through setting up the Conexus Admin CMS with Supabase authentication and image hosting.

## Prerequisites
- Supabase account (https://supabase.com)
- Node.js and npm installed
- Git repository set up

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in:
   - Project Name: `conexus-cms`
   - Database Password: Create a strong password (save it!)
   - Region: Choose closest to your location
4. Wait for project to initialize (2-5 minutes)

## Step 2: Create Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the SQL schema below:

```sql
-- Create cms_content table
CREATE TABLE cms_content (
  id BIGSERIAL PRIMARY KEY,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create storage bucket for images
-- (This is done via Supabase dashboard)

-- Create a trigger to update updated_at
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

-- Insert initial content row
INSERT INTO cms_content (content) VALUES ('{
  "team": [],
  "services": [],
  "projects": [],
  "achievements": []
}'::jsonb) ON CONFLICT DO NOTHING;

-- Enable RLS (Row Level Security)
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read
CREATE POLICY "Allow authenticated users to read cms_content"
ON cms_content
FOR SELECT
TO authenticated
USING (true);

-- Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated users to update cms_content"
ON cms_content
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
```

4. Click **Run** button
5. Confirm the query executed successfully

## Step 3: Create Storage Bucket

1. In Supabase dashboard, go to **Storage**
2. Click **Create new bucket**
3. Name it: `portfolio-images`
4. Uncheck "Private bucket" (make it public)
5. Click **Create bucket**
6. Select the bucket and go to **Configuration**
7. Under "Allowed MIME types", add: `image/*`
8. Save

## Step 4: Set Up Authentication

1. Go to **Authentication** > **Providers**
2. Ensure **Email** is enabled
3. Go to **URL Configuration**
4. Add your domain(s) to "Redirect URLs":
   ```
   http://localhost:5173/admin.html
   http://localhost:5173/admin-login.html
   https://yourdomain.com/admin.html
   https://yourdomain.com/admin-login.html
   ```

## Step 5: Create Admin User(s)

1. Go to **Authentication** > **Users**
2. Click **Invite user**
3. Enter admin email and send invite
4. User will receive email with sign-up link
5. Or manually create users by clicking **Add user**

### Create First Admin (Manual Method):
1. Go to **SQL Editor**
2. Run:
```sql
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'your-email@example.com',
  crypt('your-password', gen_salt('bf')),
  now(),
  now(),
  now()
) ON CONFLICT DO NOTHING;
```

## Step 6: Get API Keys

1. Go to **Project Settings** > **API**
2. Copy:
   - **Project URL** (your VITE_SUPABASE_URL)
   - **Anon Public Key** (your VITE_SUPABASE_ANON_KEY)

## Step 7: Configure Environment

1. In your project root, create `.env.local`:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

2. Save the file (don't commit to git!)

## Step 8: Install Dependencies

```bash
npm install
```

## Step 9: Test Locally

```bash
npm run dev
```

Visit:
- Main site: http://localhost:5173
- Admin login: http://localhost:5173/admin-login.html
- Admin CMS: http://localhost:5173/admin.html (after login)

## Step 10: Deploy

### Option A: Vercel
1. Push your code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Option B: Other Hosting
1. Ensure `.env.local` is in `.gitignore`
2. Set environment variables in your hosting platform
3. Deploy

## Features

### Team Member Management
- Upload/change member photos
- Edit names, roles, LinkedIn, and Facebook links
- Changes sync across the site automatically

### Services Management
- Edit service titles and descriptions
- Changes appear on main website instantly

### Projects Management
- Upload project images
- Edit project details, type, location, stats
- Manage featured projects

### Achievements Management
- Upload achievement images
- Edit titles and descriptions
- Reorder achievements by saving

### Image Upload
- Upload from any device/laptop
- Images stored securely in Supabase
- Automatic URL generation
- Works offline-capable with service workers

## Troubleshooting

### "Cannot read properties of null (reading 'email')"
- User not authenticated
- Check Supabase credentials in `.env.local`
- Clear browser cache and cookies

### Images not uploading
- Check storage bucket permissions
- Verify MIME type settings
- Ensure file size < 50MB

### Changes not saving
- Check network connection
- Verify Supabase database connection
- Check RLS policies are enabled

### "Row Level Security violation"
- Ensure RLS policies are created correctly
- User must be authenticated
- Verify auth.users table has the user

## Database Structure

The CMS stores all content in a single JSONB column:

```json
{
  "team": [
    {
      "name": "John Doe",
      "role": "Developer",
      "avatar": "https://...",
      "linkedin": "https://...",
      "facebook": "https://..."
    }
  ],
  "services": [
    {
      "title": "Service Name",
      "desc": "Service Description",
      "icon": "browser"
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "type": "Project Type",
      "detail": "Description",
      "image": "https://...",
      "location": "City, Country",
      "statA": "Tech Stack",
      "statB": "Performance Metric"
    }
  ],
  "achievements": [
    {
      "title": "Achievement Title",
      "description": "Achievement Description",
      "image": "https://..."
    }
  ]
}
```

## Security Notes

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **Use strong passwords** for admin accounts
3. **Enable 2FA** in Supabase for extra security
4. **Regular backups** - Export data periodically
5. **Monitor RLS policies** - Ensure only authenticated users can modify content
6. **Change anon key** if compromised

## Next Steps

1. Set up email notifications for content updates
2. Add approval workflow for changes
3. Create content versioning/history
4. Add analytics dashboard
5. Implement audit logging

## Support

For issues:
1. Check Supabase docs: https://supabase.com/docs
2. Check Supabase community: https://github.com/supabase/supabase/discussions
3. Review error messages in browser console and Supabase logs
