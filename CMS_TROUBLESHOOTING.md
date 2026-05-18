# CMS Troubleshooting & FAQ

## ❓ Frequently Asked Questions

### General CMS Questions

**Q: What's the CMS for?**
A: Manage your portfolio content (team, services, projects, achievements) without touching code. Edit once, changes appear everywhere.

**Q: Can multiple people edit at same time?**
A: Yes! Each person logs in separately. Changes sync instantly. No conflicts.

**Q: Do I need to restart the website?**
A: No! Changes save instantly. But you may need to refresh browser to see updates (or set up real-time sync).

**Q: Where's my data stored?**
A: In Supabase database (cloud). Images stored in Supabase Storage (CDN). Both are secure.

**Q: Is my data backed up?**
A: Yes, Supabase auto-backs up. You can also export manually via their dashboard.

### Technical Questions

**Q: What's Supabase?**
A: Backend-as-a-service platform with PostgreSQL database, auth, and storage. Open source, affordable, powerful.

**Q: Do I need to know SQL?**
A: No! CMS handles everything. SQL file is just for initial setup.

**Q: Can I use MySQL instead?**
A: CMS is built for Supabase/PostgreSQL. Would need significant changes for other databases.

**Q: What if I already have a backend?**
A: Supabase is optional. You could integrate CMS code with your backend.

### Deployment Questions

**Q: Can I host this myself?**
A: Yes, but Supabase is free tier (very generous) and handles hosting. Self-hosting is more complex.

**Q: How much does Supabase cost?**
A: Free tier includes:
- 500MB database
- 1GB storage
- 2M auth users
- Way more than enough for portfolio

**Q: What's included in free tier?**
- Unlimited API calls
- Unlimited users
- Email auth
- Real-time subscriptions
- Full SQL database

**Q: When do I need to pay?**
- If you exceed free tier limits
- If you need advanced features
- Plan starts at $25/month

---

## 🆘 Common Issues & Solutions

### Issue: "Cannot read properties of null (reading 'email')"

**Symptoms:**
- Error in browser console
- Can't access admin panel
- Redirects to login repeatedly

**Solutions:**
1. Check `.env.local` file exists with correct credentials
   ```bash
   type .env.local  # Show file contents
   ```
2. Verify Supabase URL format:
   ```
   https://abc123def.supabase.co
   # Should NOT have /rest/ or extra slashes
   ```
3. Verify Anon key format:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   # Should be ~140 characters
   ```
4. Clear browser cookies:
   - F12 → Application → Cookies
   - Delete all Conexus cookies
   - Refresh page
5. Restart dev server:
   ```bash
   # Ctrl+C to stop
   npm run dev  # Start again
   ```

**Still not working?**
- Copy exact URL from Supabase Settings → API
- Copy exact key (watch for truncation)
- Verify .env.local is in project root, not in src/

---

### Issue: "Images won't upload"

**Symptoms:**
- Upload button does nothing
- Error message about permissions
- Image disappears after save

**Solutions:**
1. Check storage bucket:
   - Supabase → Storage
   - Verify bucket named: `portfolio-images` (exactly!)
   - Should show "Public" badge
   - If not, delete and recreate

2. Check MIME types:
   - Click bucket name
   - Configuration → Allowed MIME types
   - Should contain: `image/*`
   - If not, add it

3. Check file size:
   - Supabase max: 50MB
   - Try smaller image (< 5MB)
   - Compress image first

4. Check browser console:
   - F12 → Console tab
   - Look for error messages
   - Screenshot and check docs

5. Check network:
   - F12 → Network tab
   - Upload image
   - Look for failed requests
   - Red status means problem

**Still not working?**
- Try different browser
- Try different image format (JPG → PNG)
- Check internet connection
- Try uploading from different device

---

### Issue: "Changes don't save"

**Symptoms:**
- Click Save, see success message
- Refresh page, changes gone
- Or save button shows error

**Solutions:**
1. Check internet connection
   - Open google.com in new tab
   - If that fails, no internet

2. Check Supabase status
   - Go to https://status.supabase.com
   - Look for red alerts
   - If red, Supabase is down - wait for fix

3. Check database connection
   - Supabase → Database
   - Look for green status indicator
   - If red/grey, database is not running

4. Check RLS policies
   - Supabase → SQL Editor
   - Run: `SELECT * FROM auth.users;`
   - If error, RLS policy issue

5. Try logout & login
   - Click Logout button
   - Log back in
   - Try again

6. Check browser console
   - F12 → Console
   - Look for red errors
   - Copy error message
   - Search in docs

**Database query to verify:**
```sql
-- Run in Supabase SQL Editor
SELECT * FROM cms_content WHERE id = 1;
-- Should see your content in JSONB column
```

---

### Issue: "Can't log in"

**Symptoms:**
- Says "invalid email or password"
- Or email field is empty
- Or redirects back to login

**Solutions:**
1. Verify user exists:
   - Supabase → Authentication → Users
   - Find your email in list
   - If not there, create user first

2. Verify password:
   - Password is case-sensitive!
   - "Password123" ≠ "password123"
   - Try resetting password

3. Check email format:
   - Must be valid email
   - Example: user@example.com
   - Not: user@localhost (invalid)

4. Check Supabase credentials:
   - `.env.local` must have VITE_SUPABASE_ANON_KEY
   - Not the service role key!
   - Anon key starts with: eyJhbGc...

5. Browser issue:
   - Try incognito window
   - Try different browser
   - Clear cookies (F12 → Application → Cookies)

**Password reset:**
```
1. In Supabase, go to Users
2. Find your email
3. Click three dots (•••)
4. Click "Delete user"
5. Create user again with new password
```

---

### Issue: "Uploads show 404"

**Symptoms:**
- Image uploads successfully
- But image is broken (404 error)
- Broken image icon shown

**Solutions:**
1. Check URL format:
   - Should start with: `https://...supabase.co/storage/v1/object/public/`
   - Should contain: `portfolio-images/` in path

2. Wait a moment:
   - Image takes 1-2 seconds to be available
   - CDN caching

3. Check image still exists:
   - Supabase → Storage → portfolio-images
   - Browse files
   - Look for your uploaded image

4. Try uploading again:
   - Delete old image if visible
   - Re-upload fresh
   - Sometimes first upload fails silently

---

### Issue: "Supabase dashboard is slow"

**Symptoms:**
- Dashboard takes forever to load
- Buttons don't respond
- Pages hang

**Solutions:**
1. Refresh browser: F5 or Ctrl+R
2. Clear cache: Ctrl+Shift+Delete
3. Try different browser
4. Try incognito mode
5. Check internet speed
6. Supabase might have issues - check status.supabase.com

---

### Issue: "Can't upload on mobile/tablet"

**Symptoms:**
- Works on laptop but not phone
- File picker not opening
- Error when selecting image

**Solutions:**
1. Check browser:
   - Use Chrome, Firefox, or Safari
   - Some browsers have issues

2. Check permissions:
   - Phone must allow file access
   - Allow storage/gallery permissions

3. Try different:
   - Use different image
   - Try on different device
   - Try different browser

4. Note:
   - CMS works best on desktop
   - Mobile support is secondary

---

## 🐛 Advanced Troubleshooting

### Check Browser Console

**How to open:**
- Windows/Linux: F12
- Mac: Cmd+Option+I
- Or right-click → "Inspect"

**What to look for:**
- Red errors (bad)
- Yellow warnings (usually ok)
- Network requests failing

**Screenshot console:**
- Take screenshot
- Include full error message
- Share in bug report

### Check Network Tab

**How to open:**
- F12 → Network tab
- Reload page
- Try operation (upload, save, etc)

**What to look for:**
- Red failed requests
- 401/403 errors (permission issues)
- 500 errors (server issues)
- Timeouts

### Check Supabase Logs

**View logs:**
- Supabase dashboard
- Logs → Edge Functions (if using)
- Or Database → Query results

**Common logs:**
- Auth failures (401)
- RLS policy denials (403)
- Storage access denied

---

## 📞 When to Ask for Help

Ask if:
- ✓ You've tried all solutions above
- ✓ You see error messages
- ✓ Something stopped working suddenly
- ✓ You're stuck for > 30 minutes

Provide:
- ✓ Screenshot of error
- ✓ Browser console log
- ✓ What you did before error
- ✓ Your OS and browser version

**Don't share:**
- ✗ Your `.env.local` credentials
- ✗ Your passwords
- ✗ Your Supabase API keys

---

## 🔧 Advanced Fixes

### Reset Everything

**If everything is broken:**

```bash
# 1. Stop dev server (Ctrl+C)

# 2. Clear cache
npm run build  # Rebuild
rm -r node_modules  # Remove dependencies
npm install  # Reinstall

# 3. Clear browser cache
# F12 → Application → Clear site data

# 4. Start fresh
npm run dev
```

### Rebuild Database

**If database is corrupted:**

1. Supabase Dashboard → SQL Editor
2. Run:
```sql
DROP TABLE IF EXISTS cms_content CASCADE;
DROP TABLE IF EXISTS cms_audit_log CASCADE;
```
3. Paste full schema from `sql/schema.sql`
4. Click Run

### Reset User Password

**For lost passwords:**

1. Supabase → Authentication → Users
2. Find user
3. Delete user
4. Create new user with new password

---

## 📊 Performance Tips

**If CMS is slow:**

1. Check internet connection
2. Close other tabs (uses memory)
3. Try different browser
4. Refresh page
5. Restart dev server

**If uploads are slow:**

1. Use smaller images (< 3MB)
2. Compress images first
3. Check internet speed
4. Close other downloads

**If images aren't showing:**

1. Wait 2-3 seconds (CDN caching)
2. Hard refresh: Ctrl+Shift+R
3. Try incognito mode
4. Check image URL in browser

---

## ✅ Health Checklist

Run this monthly:

- [ ] Supabase project running (green status)
- [ ] Storage bucket public and MIME types set
- [ ] Auth providers enabled
- [ ] Database tables exist
- [ ] Can log in successfully
- [ ] Can edit and save content
- [ ] Can upload images
- [ ] All images loading correctly
- [ ] No error messages in console

---

## 📚 Resources

- **Supabase Docs:** https://supabase.com/docs
- **Browser DevTools:** https://developer.chrome.com/docs/devtools/
- **Status Page:** https://status.supabase.com
- **Community Discord:** https://discord.supabase.com

---

**Still stuck?** Read the main documentation:
- `SETUP_CMS.md` - Setup guide
- `CMS_README.md` - User manual
- `CMS_INTEGRATION.md` - Integration guide
