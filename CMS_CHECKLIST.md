# CMS Quick Start Checklist

Complete these steps to get your CMS running:

## 📋 Setup Phase (One-time)

- [ ] **Create Supabase Account**
  - [ ] Go to https://supabase.com
  - [ ] Sign up or log in
  - [ ] Create new project (note: `conexus-cms` name, save DB password)

- [ ] **Create Database Tables**
  - [ ] Open Supabase SQL Editor
  - [ ] Copy SQL from `SETUP_CMS.md` Step 2
  - [ ] Run the query
  - [ ] Verify tables created

- [ ] **Create Storage Bucket**
  - [ ] In Supabase, go to Storage
  - [ ] Create bucket: `portfolio-images`
  - [ ] Make it public (uncheck Private bucket)
  - [ ] Set MIME types: `image/*`

- [ ] **Setup Authentication**
  - [ ] Enable Email provider in Auth
  - [ ] Add redirect URLs:
    - `http://localhost:5173/admin.html`
    - `http://localhost:5173/admin-login.html`
    - `https://yourdomain.com/admin.html` (when deployed)

- [ ] **Create Admin User(s)**
  - [ ] Go to Authentication → Users
  - [ ] Create/invite admin user
  - [ ] Share login credentials securely

- [ ] **Get API Keys**
  - [ ] Go to Settings → API
  - [ ] Copy Project URL
  - [ ] Copy Anon Public Key
  - [ ] Save for next step

## 🔧 Local Setup

- [ ] **Configure Environment**
  - [ ] Create file: `.env.local`
  - [ ] Add Supabase URL: `VITE_SUPABASE_URL=...`
  - [ ] Add Anon Key: `VITE_SUPABASE_ANON_KEY=...`
  - [ ] Save file (don't commit!)

- [ ] **Install Dependencies**
  - [ ] Run: `npm install`
  - [ ] Wait for completion

- [ ] **Start Dev Server**
  - [ ] Run: `npm run dev`
  - [ ] Visit: http://localhost:5173
  - [ ] Verify main site loads

## ✅ Testing

- [ ] **Test Admin Login**
  - [ ] Go to: http://localhost:5173/admin-login.html
  - [ ] Enter admin email
  - [ ] Enter admin password
  - [ ] Click Sign In
  - [ ] Should redirect to admin panel

- [ ] **Test CMS Features**
  - [ ] Click Team Members tab
  - [ ] Edit a member's name
  - [ ] Click Save Changes
  - [ ] Verify success message
  - [ ] Refresh page, verify changes persist

- [ ] **Test Image Upload**
  - [ ] Click Change Image on any card
  - [ ] Select image from computer
  - [ ] Wait for upload
  - [ ] Verify image preview updates
  - [ ] Click Save Changes

- [ ] **Test Other Sections**
  - [ ] Services tab - edit description
  - [ ] Projects tab - upload new image
  - [ ] Achievements tab - edit title
  - [ ] All should save successfully

## 🚀 Deployment

- [ ] **Build Project**
  - [ ] Run: `npm run build`
  - [ ] Check for errors
  - [ ] Verify `dist` folder created

- [ ] **Deploy to Vercel** (Recommended)
  - [ ] Push code to GitHub
  - [ ] Go to Vercel.com
  - [ ] Import GitHub repository
  - [ ] Add environment variables:
    - `VITE_SUPABASE_URL`
    - `VITE_SUPABASE_ANON_KEY`
  - [ ] Deploy
  - [ ] Add redirect URLs to Supabase auth config

- [ ] **Update Supabase Auth**
  - [ ] Add production URLs:
    - `https://yourdomain.com/admin.html`
    - `https://yourdomain.com/admin-login.html`

- [ ] **Test Production**
  - [ ] Go to https://yourdomain.com/admin-login.html
  - [ ] Test login with admin credentials
  - [ ] Test content editing
  - [ ] Test image upload

## 🔐 Security

- [ ] **Protect Repository**
  - [ ] Verify `.gitignore` includes `.env.local`
  - [ ] Never commit credentials
  - [ ] Review git history: `git log --oneline`

- [ ] **Secure Supabase**
  - [ ] Set strong password for Supabase
  - [ ] Enable 2FA on Supabase account
  - [ ] Review RLS policies
  - [ ] Regular backups

- [ ] **Manage Access**
  - [ ] Give admin access only to team members who need it
  - [ ] Create separate admin users (don't share one account)
  - [ ] Document password management process

## 📚 Documentation

- [ ] **Read Documentation**
  - [ ] Read: `SETUP_CMS.md` - Detailed setup guide
  - [ ] Read: `CMS_README.md` - User guide and API reference
  - [ ] Read: `SETUP_CMS.md` troubleshooting section

- [ ] **Share with Team**
  - [ ] Send CMS login credentials
  - [ ] Share link: https://yourdomain.com/admin.html
  - [ ] Share how-to guide for common tasks
  - [ ] Document team responsibilities

## 🎯 Advanced (Optional)

- [ ] **Migrate Existing Data** (if keeping current data)
  - [ ] Open browser console on admin page
  - [ ] Run migration script (see SETUP_CMS.md Step 2)
  - [ ] Verify all data in CMS

- [ ] **Connect Main Website**
  - [ ] Update App.jsx to use CMS data
  - [ ] Import `useCMSContent` from lib
  - [ ] Replace static data with dynamic data
  - [ ] Test website with live CMS

- [ ] **Set Up Real-time Sync**
  - [ ] Enable Supabase subscriptions
  - [ ] Website auto-updates when admin makes changes
  - [ ] No need to refresh

- [ ] **Add Email Notifications**
  - [ ] Set up Supabase email on content updates
  - [ ] Alert team when changes made
  - [ ] Track who made changes and when

---

## 🚨 Common Issues

**"Supabase credentials not found"**
- ✅ Create `.env.local` file
- ✅ Copy credentials from Supabase Settings > API
- ✅ Restart dev server: Ctrl+C, then `npm run dev`

**"Cannot read properties of null"**
- ✅ Clear browser cache (Ctrl+Shift+Delete)
- ✅ Verify `.env.local` is correct
- ✅ Check Supabase project is running

**"Images won't upload"**
- ✅ Check bucket exists and is public
- ✅ Verify file size < 50MB
- ✅ Check MIME types setting in Supabase

**"Save button doesn't work"**
- ✅ Check internet connection
- ✅ Verify you're logged in
- ✅ Check browser console for errors

---

## 📞 Need Help?

1. Check error message in browser console (F12)
2. See troubleshooting in `SETUP_CMS.md`
3. Check Supabase logs in dashboard
4. Review README files
5. Check GitHub issues

---

**Status:** Ready to use
**Last Updated:** 2024
