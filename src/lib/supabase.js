import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials not found. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth functions
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getSession();
  return data?.session?.user || null;
};

// Database functions
export const getContentData = async () => {
  const { data, error } = await supabase
    .from('cms_content')
    .select('*')
    .single();
  return { data, error };
};

export const updateContentData = async (updates) => {
  const { data, error } = await supabase
    .from('cms_content')
    .update(updates)
    .eq('id', 1)
    .select()
    .single();
  return { data, error };
};

// Image upload function
export const uploadImage = async (file, folder = 'portfolio') => {
  if (!file) return { data: null, error: 'No file provided' };

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('portfolio-images')
    .upload(filePath, file);

  if (error) return { data: null, error };

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from('portfolio-images')
    .getPublicUrl(filePath);

  return { data: { path: filePath, publicUrl: publicUrlData.publicUrl }, error: null };
};

// Delete image function
export const deleteImage = async (filePath) => {
  const { error } = await supabase.storage
    .from('portfolio-images')
    .remove([filePath]);
  return { error };
};

// Update team member image
export const updateTeamMemberImage = async (memberId, imageUrl) => {
  const { data, error } = await supabase
    .from('cms_content')
    .update({ data: supabase.rpc('update_team_member_image', { member_id: memberId, image_url: imageUrl }) })
    .eq('id', 1)
    .select()
    .single();
  return { data, error };
};
