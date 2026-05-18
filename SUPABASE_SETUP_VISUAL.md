# Supabase Setup - Visual Step-by-Step Guide

## 📍 Step 1: Create Supabase Project

### 1.1 Go to supabase.com
- Visit https://supabase.com
- Click "Sign Up" (or "Sign In" if you have account)
- Use email or GitHub login

### 1.2 Create New Project
- Dashboard → "New Project"
- Fill in:
  - **Project Name:** `conexus-cms`
  - **Database Password:** Create strong password (save it!)
    - Example: `Conexus#2024$Secure123`
  - **Region:** Choose closest to you
    - USA: Northern Virginia
    - Europe: Ireland / Frankfurt
    - Asia: Singapore / Tokyo

- Click **Create new project**
- ⏳ Wait 2-5 minutes for initialization

### 1.3 You're in!
Once loaded, you'll see:
- Project name at top left
- Dashboard with stats
- Menu on left side

---

## 📍 Step 2: Create Database Tables

### 2.1 Open SQL Editor
- Left menu → **SQL Editor**
- Click **New Query**

### 2.2 Copy SQL Schema
- Copy all SQL from `sql/schema.sql` file in your project
- Paste into SQL editor
- Click **Run** button

### 2.3 Verify Tables Created
- Left menu → **Database** → **Tables**
- You should see:
  - ✅ `cms_content` table
  - ✅ `cms_audit_log` table (if audit enabled)

If you see errors, check:
- Syntax is correct (no typos)
- You're on correct database
- Database is running (green status)

---

## 📍 Step 3: Create Storage Bucket

### 3.1 Open Storage
- Left menu → **Storage**
- Click **Create new bucket**

### 3.2 Create Bucket
- **Name:** `portfolio-images` (exactly!)
- **Description:** Portfolio images (optional)
- **Bucket type:** Public bucket (uncheck "Private bucket")
- Click **Create**

### 3.3 Configure Bucket
- Click on `portfolio-images` bucket
- Go to **Configuration**
- Under **Allowed MIME types:**
  - Add: `image/*`
- Click **Save**

### 3.4 Verify
- You should see:
  - Bucket name: `portfolio-images`
  - Status: Public
  - MIME types: `image/*`

---

## 📍 Step 4: Set Up Authentication

### 4.1 Enable Email Provider
- Left menu → **Authentication**
- Click **Providers**
- Find **Email** provider
- Toggle **Enabled** (should be green/on)

### 4.2 Email Settings (Optional)
- Click on **Email**
- Leave defaults as is
- These work with Supabase auth out of box

### 4.3 Add Redirect URLs
- Left menu → **Authentication**
- Click **URL Configuration**
- Under **Redirect URLs**, add:
  ```
  http://localhost:5173/admin.html
  http://localhost:5173/admin-login.html
  ```
- If deploying, also add:
  ```
  https://yourdomain.com/admin.html
  https://yourdomain.com/admin-login.html
  ```
- Click **Save**

---

## 📍 Step 5: Create Admin Users

### Option A: Invite Users (Recommended)

#### 5A.1 Open Users
- Left menu → **Authentication**
- Click **Users**

#### 5A.2 Invite User
- Click **Invite user**
- Enter email: `your-admin@example.com`
- Click **Send invite**
- User receives email with link
- They click link and create password

#### 5A.3 Admin receives:
- Email with sign-up link
- Click link, creates password
- Can now log in to CMS

### Option B: Create User Manually

#### 5B.1 Open Users
- Left menu → **Authentication**
- Click **Users**

#### 5B.2 Add User
- Click **Add user**
- Email: `your-email@example.com`
- Password: Create strong one
- Confirm password
- Click **Save user**

#### 5B.3 User created!
- User appears in list
- Can log in with email/password

---

## 📍 Step 6: Get API Keys

### 6.1 Open Project Settings
- Left menu (bottom) → **Settings**
- Go to **API** (or **Project Settings**)

### 6.2 Copy Credentials
You need two things:

**Project URL (VITE_SUPABASE_URL):**
- Find: "Project URL"
- Looks like: `https://abc123def.supabase.co`
- Copy it

**Anon Public Key (VITE_SUPABASE_ANON_KEY):**
- Find: "Anon public"
- Starts with: `eyJhbGciOiJIUzI1NiIs...`
- Copy it

### 6.3 Save Somewhere Safe
- ✅ Copy both values
- ✅ Paste into `.env.local` file

---

## 📝 Create .env.local File

In your project root (`d:\Conexus\`), create file named `.env.local`:

```
VITE_SUPABASE_URL=https://abc123def.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace with YOUR actual values from step 6.

⚠️ **Important:** Don't share or commit this file!

---

## 🧪 Test Your Setup

### 7.1 Install Dependencies
```bash
npm install
```

### 7.2 Start Dev Server
```bash
npm run dev
```

### 7.3 Test Login
1. Go to: http://localhost:5173/admin-login.html
2. Enter email: Your admin email
3. Enter password: Your admin password
4. Click **Sign In**
5. Should redirect to admin panel!

### 7.4 Test CMS
1. Click **Team Members** tab
2. Edit a name
3. Click **Save Changes**
4. Should see "success" message
5. Refresh page - changes should persist!

### 7.5 Test Image Upload
1. Click **Change Image** on any card
2. Select image from computer
3. Wait for "Image uploaded successfully!"
4. Image preview should update
5. Click **Save Changes**

---

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] Database tables created (cms_content visible)
- [ ] Storage bucket created (portfolio-images)
- [ ] Email provider enabled
- [ ] Redirect URLs added
- [ ] Admin user created
- [ ] API keys copied
- [ ] .env.local file created
- [ ] Dependencies installed (npm install)
- [ ] Login works (can access /admin.html)
- [ ] Can edit content and save
- [ ] Can upload images

If all checked ✅, you're ready to use the CMS!

---

## 🆘 Troubleshooting

### "Supabase credentials not found"
```
✅ Check .env.local file exists
✅ Check VITE_SUPABASE_URL is correct
✅ Check VITE_SUPABASE_ANON_KEY is correct
✅ Restart dev server: Ctrl+C, then npm run dev
```

### "Cannot authenticate"
```
✅ Verify user exists (check Authentication → Users)
✅ Check email/password are correct (case-sensitive)
✅ Try clearing cookies (F12 → Application → Cookies)
```

### "Storage errors"
```
✅ Bucket name is exactly: portfolio-images
✅ Bucket is public (not private)
✅ MIME type includes: image/*
```

### "Changes not saving"
```
✅ Check internet connection
✅ Check network tab (F12 → Network)
✅ Verify Supabase project is running
✅ Try logging out and back in
```

---

## 📚 Video Tutorials

If you prefer videos, check Supabase YouTube channel:
- https://youtube.com/supabase
- Search: "Supabase Getting Started"
- Watch first 10-15 minutes

---

## 🎯 Next Steps

1. ✅ Complete this setup
2. ✅ Test local login and CMS
3. → Read `CMS_INTEGRATION.md` to connect to main site
4. → Deploy to Vercel
5. → Share admin link with team

---

**Need help?** Check `SETUP_CMS.md` for more detailed info!
