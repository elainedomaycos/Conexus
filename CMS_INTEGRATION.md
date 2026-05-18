# CMS Integration Guide for App.jsx

This guide shows how to connect your main App.jsx to the CMS so portfolio data loads dynamically from Supabase instead of being hardcoded.

## Option 1: Using the CMS Hook (Recommended)

### Step 1: Import the hook
At the top of `src/App.jsx`, add:

```jsx
import { useCMSContent } from './lib/useCMSContent';

// Keep your current hardcoded data as fallback
const DEFAULT_DATA = {
  team: [/* existing team data */],
  services: [/* existing services data */],
  projects: [/* existing projects data */],
  achievements: [/* existing achievements data */],
};
```

### Step 2: Use the hook in App component
Replace your static data with dynamic data:

```jsx
export default function App() {
  const { content, loading, error } = useCMSContent(DEFAULT_DATA);
  
  // Use content instead of TEAM, SERVICES, etc.
  const TEAM = content?.team || [];
  const SERVICES = content?.services || [];
  const PROJECTS = content?.projects || [];
  const ACHIEVEMENTS = content?.achievements || [];

  if (error) {
    console.warn('Failed to load CMS data, using defaults:', error);
  }

  // Rest of your component...
  return (
    <div>
      {/* Your existing JSX remains the same */}
      {/* Just replace hardcoded arrays with the dynamic ones */}
    </div>
  );
}
```

### Step 3: Update data references
Replace all hardcoded data references:

```jsx
// Before:
const TEAM = [
  { name: "John Doe", role: "Developer", ... },
  { name: "Jane Smith", role: "Designer", ... },
];

// After:
const TEAM = content?.team || [];
```

## Option 2: Using Context Provider (For large apps)

### Step 1: Wrap App with Provider
In `src/main.jsx`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CMSProvider } from './lib/useCMSContent'
import DEFAULT_DATA from './defaultData' // Optional

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CMSProvider defaultData={DEFAULT_DATA}>
      <App />
    </CMSProvider>
  </React.StrictMode>,
)
```

### Step 2: Use in components
In any component (including App.jsx):

```jsx
import { useCMS } from './lib/useCMSContent'

export default function SomeComponent() {
  const { content, loading, error } = useCMS()
  
  const TEAM = content?.team || []
  
  return (
    <div>
      {/* Use TEAM to render */}
    </div>
  )
}
```

## Option 3: Manual Implementation

If you prefer more control:

```jsx
import { useState, useEffect } from 'react'
import { getContentData } from './lib/supabase'
import DEFAULT_DATA from './defaultData'

export default function App() {
  const [data, setData] = useState(DEFAULT_DATA)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCMS = async () => {
      try {
        const { data: cmsData, error } = await getContentData()
        if (!error && cmsData?.content) {
          setData(cmsData.content)
        }
      } catch (err) {
        console.error('CMS load error:', err)
      } finally {
        setLoading(false)
      }
    }
    
    loadCMS()
  }, [])

  const TEAM = data.team || []
  const SERVICES = data.services || []
  const PROJECTS = data.projects || []
  const ACHIEVEMENTS = data.achievements || []

  // Rest of component...
}
```

## Real-time Updates (Advanced)

Make your website update instantly when admins make changes:

```jsx
import { useEffect } from 'react'
import { supabase } from './lib/supabase'

useEffect(() => {
  // Subscribe to content changes
  const channel = supabase
    .channel('cms_content_changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'cms_content',
        filter: 'id=eq.1'
      },
      (payload) => {
        // Update state when admin makes changes
        setData(payload.new.content)
      }
    )
    .subscribe()

  return () => {
    channel.unsubscribe()
  }
}, [])
```

## Testing the Integration

1. **Start dev server:** `npm run dev`
2. **Open main site:** http://localhost:5173
3. **Open admin in new tab:** http://localhost:5173/admin-login.html
4. **Login** with admin credentials
5. **Edit content** (e.g., change a team member's name)
6. **Click Save Changes**
7. **Check main site** - content should update (or refresh to see changes)

## Troubleshooting Integration

### Data not loading
- Check browser console (F12) for errors
- Verify Supabase URL and key in `.env.local`
- Ensure database table has data

### Component renders before data loads
- Use loading state: `if (loading) return <div>Loading...</div>`
- Provide default/fallback data
- Use skeleton loaders

### Images not showing
- Check image URLs in Supabase Storage
- Verify storage bucket is public
- Check CORS settings if needed

### Performance issues
- CMS data is cached by default
- Refresh is required for latest changes (unless real-time enabled)
- Use React.memo() to prevent unnecessary re-renders

## Recommended File Structure

```
src/
├── lib/
│   ├── supabase.js           # Supabase client
│   ├── useCMSContent.js      # CMS hook & context
│   └── migrationHelpers.js   # Data migration
├── data/
│   └── defaultData.js        # Fallback data when CMS unavailable
├── pages/
│   ├── AdminCMS.jsx
│   └── AdminLogin.jsx
├── App.jsx                   # Updated to use CMS
├── main.jsx
└── admin.jsx
```

## Migration Path

### Phase 1: Read-only (Current)
- Website reads from CMS
- Admin can edit in CMS
- Website shows latest data

### Phase 2: Real-time (Optional)
- Enable Supabase subscriptions
- Changes appear instantly (no refresh needed)
- Better user experience

### Phase 3: Advanced (Future)
- Content versioning/history
- Approval workflows
- Scheduled publishing
- Content analytics

## Complete Example

Here's a minimal example of App.jsx using CMS:

```jsx
import { useCMSContent } from './lib/useCMSContent'

const DEFAULT_DATA = {
  team: [{ name: "Your Name", role: "Role", ... }],
  services: [],
  projects: [],
  achievements: [],
}

export default function App() {
  const { content } = useCMSContent(DEFAULT_DATA)

  const TEAM = content?.team || []
  const SERVICES = content?.services || []

  return (
    <div>
      {/* Team section */}
      <section id="team">
        {TEAM.map((member, idx) => (
          <div key={idx}>
            <img src={member.avatar} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </section>

      {/* Services section */}
      <section id="services">
        {SERVICES.map((service, idx) => (
          <div key={idx}>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
```

---

**Ready to integrate?** Start with Option 1 (using the hook) - it's the simplest and most flexible approach.
