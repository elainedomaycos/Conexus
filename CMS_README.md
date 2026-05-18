# Conexus Admin CMS

A modern, self-hosted Content Management System built with React, Supabase, and designed to match your portfolio website aesthetics.

## Features

✅ **Secure Authentication**
- Email/password login via Supabase Auth
- Protected admin routes
- Session persistence across devices

✅ **Content Management**
- Edit team members (name, role, avatar, social links)
- Manage services (titles, descriptions)
- Update projects (images, details, stats)
- Organize achievements (images, titles, descriptions)

✅ **Media Management**
- Upload images from any device/laptop
- Images stored securely in Supabase Storage
- Automatic image URL generation
- Support for multiple image formats

✅ **Design Consistency**
- Dark theme matching your portfolio
- Responsive layout for all screen sizes
- Intuitive tabbed interface
- Real-time preview

✅ **Multi-Device Sync**
- Edit from different laptops
- Changes sync instantly
- No file conflicts

## Quick Start

### 1. Prerequisites
```bash
Node.js 16+ and npm installed
```

### 2. Set Up Supabase
Follow the detailed guide in `SETUP_CMS.md`:
- Create Supabase account
- Set up database tables
- Create storage bucket
- Configure authentication

### 3. Configure Environment
Create `.env.local` in project root:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Migrate Existing Data (Optional)
If you want to keep your current portfolio data:
1. Start dev server: `npm run dev`
2. Open browser console on admin page (F12)
3. Run:
```javascript
const { runFullMigration } = await import('./src/lib/migrationHelpers.js');
await runFullMigration();
```
4. Refresh the page

### 6. Run Locally
```bash
npm run dev
```

Access:
- 🏠 Main site: http://localhost:5173
- 🔐 Admin login: http://localhost:5173/admin-login.html
- 📊 Admin panel: http://localhost:5173/admin.html

## Usage Guide

### Admin Login
1. Go to `/admin-login.html`
2. Enter email and password
3. Click "Sign In"

### Managing Content

#### Team Members
- Click **Team Members** tab
- Edit member information
- Click **Change Image** to upload new photo
- Click **Save Changes** to update

#### Services
- Click **Services** tab
- Edit service titles and descriptions
- Click **Save Changes**

#### Projects
- Click **Projects** tab
- Upload project images
- Edit project details
- Click **Save Changes**

#### Achievements
- Click **Achievements** tab
- Upload achievement images
- Edit titles and descriptions
- Click **Save Changes**

### Uploading Images

1. Click **Change Image** button on any card
2. Select image from your device
3. Wait for "Image uploaded successfully!" message
4. Click **Save Changes** to persist

**Supported formats:** JPG, PNG, GIF, WebP
**Max file size:** 50MB
**Auto-optimization:** Supabase automatically optimizes images

### Logout
- Click **Logout** button in top-right corner
- You'll be redirected to login page

## File Structure

```
src/
├── lib/
│   ├── supabase.js              # Supabase client & auth functions
│   └── migrationHelpers.js      # Data migration utilities
├── pages/
│   ├── AdminCMS.jsx             # Main CMS dashboard
│   └── AdminLogin.jsx           # Login page
├── admin.jsx                    # Admin app entry point
├── admin-login.jsx              # Login app entry point
└── ...

admin.html                       # Admin CMS page
admin-login.html                 # Admin login page
```

## Database Schema

Supabase stores all content in a single flexible JSONB structure:

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
      "desc": "Description",
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
      "statB": "Metric"
    }
  ],
  "achievements": [
    {
      "title": "Achievement",
      "description": "Details",
      "image": "https://..."
    }
  ]
}
```

## Integration with Main Website

To use CMS data on your main website:

```jsx
import { getContentData } from './lib/supabase';

export default function App() {
  const [contentData, setContentData] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      const { data } = await getContentData();
      setContentData(data?.content);
    };
    loadContent();
  }, []);

  if (!contentData) return <div>Loading...</div>;

  return (
    <div>
      {/* Use contentData.team, contentData.projects, etc. */}
    </div>
  );
}
```

## Security Best Practices

🔒 **Protect Your Admin Panel**
- Use strong, unique passwords
- Enable 2FA in Supabase
- Regularly update credentials

🔒 **Secure Your API Keys**
- Never commit `.env.local` to git
- Add `.env.local` to `.gitignore` (already done)
- Regenerate keys if compromised
- Use environment variables in production

🔒 **Database Security**
- Supabase RLS (Row Level Security) is configured
- Only authenticated users can modify content
- All changes are tracked with `updated_by` and `updated_at`

🔒 **Image Storage**
- Images are stored in public bucket (CDN cached)
- Original files can't be accessed without URL
- Use Supabase URL signing for private images if needed

## Troubleshooting

### "Cannot read properties of null (reading 'email')"
**Problem:** Authentication failed
**Solution:**
1. Check `.env.local` has correct Supabase URL and key
2. Clear browser cookies: DevTools → Application → Cookies → Clear
3. Check network tab (F12) for 401/403 errors

### Images won't upload
**Problem:** Upload fails with permission error
**Solution:**
1. Verify storage bucket exists: Supabase → Storage → `portfolio-images`
2. Check bucket is public (not private)
3. Verify MIME types allow `image/*`
4. Check file size < 50MB

### Changes not saving
**Problem:** Save button shows error
**Solution:**
1. Check network connection (DevTools → Network tab)
2. Verify RLS policy created: Supabase → SQL Editor → Run test query
3. Check Supabase project status (no maintenance)
4. Try logout and login again

### Login not working
**Problem:** Can't sign in with email/password
**Solution:**
1. Verify user exists: Supabase → Authentication → Users
2. Check password is correct (case-sensitive)
3. Verify email is confirmed (if using email confirmations)
4. Check Supabase project isn't paused

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://abc123.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous API key | `eyJhbGc...` |

## Performance Tips

⚡ **Optimize Images**
- Compress images before uploading (< 500KB)
- Use JPG for photos, PNG for icons
- Supabase auto-compresses to WebP

⚡ **Caching**
- Images are cached by CDN
- Hard refresh (Ctrl+Shift+R) if images don't update

⚡ **Database**
- JSONB is efficient for flexible data
- Queries are optimized by Supabase
- No N+1 query problems

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy (automatic on push)

### Other Platforms
1. Set environment variables
2. Run `npm run build`
3. Deploy `dist` folder
4. Ensure environment vars are set

## API Reference

### Authentication
```javascript
import { signIn, signOut, getCurrentUser } from './lib/supabase';

// Sign in
const { data, error } = await signIn('email@example.com', 'password');

// Get current user
const user = await getCurrentUser();

// Sign out
await signOut();
```

### Content
```javascript
import { getContentData, updateContentData } from './lib/supabase';

// Get all content
const { data } = await getContentData();

// Update content
const { data } = await updateContentData({ 
  content: { team: [...], projects: [...] } 
});
```

### Images
```javascript
import { uploadImage, deleteImage } from './lib/supabase';

// Upload image
const { data, error } = await uploadImage(file, 'team');

// Delete image
const { error } = await deleteImage('team/image.jpg');
```

## Support & Resources

📚 **Documentation**
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)

🐛 **Report Issues**
- Check browser console (F12) for errors
- Check Supabase logs in dashboard
- Share error messages in issue report

💡 **Feature Requests**
- Email admin
- Submit via GitHub issues
- Create pull request with feature

## License

Conexus © 2024. All rights reserved.

---

**Last Updated:** 2024
**Version:** 1.0.0
