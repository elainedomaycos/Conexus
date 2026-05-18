import { supabase } from './supabase';

/**
 * This file contains utility functions to help migrate your portfolio data
 * from the App.jsx static data to Supabase
 */

// Import your current data from App.jsx
import elaineImage from '../../elaine.png';
import allenImage from '../../allen.jpeg';
import alvinImage from '../../alvin.jpg';
import gilImage from '../../gil.jpg';
import mcneilImage from '../../mcneil.png';
import sirJoshImage from '../../sir josh.jpeg';
import nagaImage from '../../naga.jpg';
import picImage from '../../pic.jpg';
import gulwayImage from '../../gulway.jpeg';
import nagacareImage from '../../nagacare.jpg';

// Current data structure
export const INITIAL_PORTFOLIO_DATA = {
  team: [
    {
      name: "Joshua Abella",
      role: "Mentor & Strategy Advisor",
      avatar: sirJoshImage,
      linkedin: "https://linkedin.com/in/sirjosh",
      facebook: "https://facebook.com/sirjosh",
    },
    {
      name: "Elaine Domaycos",
      role: "Project Manager/ UI-UX Designer/ Front-end Developer",
      avatar: elaineImage,
      linkedin: "https://www.linkedin.com/in/ma-kassandra-elaine-domaycos/",
      facebook: "https://www.facebook.com/elaine.domaycos.1",
    },
    {
      name: "Alvin Aloya",
      role: "Full Stack Developer/Cloud Engineer",
      avatar: alvinImage,
      linkedin: "https://www.linkedin.com/in/alvin-aloya-45248b340/",
      facebook: "https://www.facebook.com/alvin.sucke/",
    },
    {
      name: "Francis Gil Aloya",
      role: "Full Stack Developer/ Database Administrator",
      avatar: gilImage,
      linkedin: "https://linkedin.com/in/gil",
      facebook: "https://facebook.com/gil",
    },
    {
      name: "Mcneil Magtibay",
      role: "Full Stack Developer",
      avatar: mcneilImage,
      linkedin: "https://linkedin.com/in/mcneil",
      facebook: "https://facebook.com/mcneil",
    },
    {
      name: "Allen Martillan",
      role: "Full Stack Developer",
      avatar: allenImage,
      linkedin: "https://linkedin.com/in/allen",
      facebook: "https://facebook.com/allen",
    },
  ],
  services: [
    {
      title: "Web & App Development",
      desc: "Modern, responsive websites and powerful mobile applications built to scale your business and engage users seamlessly.",
      icon: "browser",
    },
    {
      title: "UI/UX Design",
      desc: "Clean, intuitive, and user-centered interfaces that deliver seamless digital experiences.",
      icon: "design",
    },
    {
      title: "API & Cloud Solutions",
      desc: "API & system integration, secure cloud hosting, and scalable infrastructure for your business.",
      icon: "server",
    },
    {
      title: "IT Consultation",
      desc: "Strategic technical guidance to help businesses make smarter digital decisions and optimize their tech stack.",
      icon: "strategy",
    },
  ],
  projects: [
    {
      name: "NagaCare",
      type: "Analytics SaaS",
      detail: "Real-time KPI dashboard for growth teams with custom reports and team workspaces.",
      image: nagacareImage,
      location: "Remote • Global Teams",
      statA: "React + Node",
      statB: "37% faster reporting",
      link: "https://example.com/pulseboard",
      featured: true,
    },
  ],
  achievements: [
    {
      title: "1st Naga City Mayoral Hackathon",
      description: "Top 5 Finalist in Health Category held at Naga, City",
      image: nagaImage,
    },
    {
      title: "Philippine Innovation Conference 2025",
      description: "Participant in PIC 2025 held at University of Batangas",
      image: picImage,
    },
    {
      title: "SUCCESS Program 2024",
      description: "FIRST PLACE in the Start up Pitching Competition entitled \"SUCCESS Program\" during the Technovation Summit held at Steer Hub, BatStateU Alangilan",
      image: gulwayImage,
    },
  ],
};

/**
 * Upload local images to Supabase storage and return public URLs
 * Run this once to migrate all images
 */
export const migrateImagesToSupabase = async () => {
  console.log('Starting image migration to Supabase...');
  
  const imageMap = {
    [elaineImage]: 'team/elaine.png',
    [allenImage]: 'team/allen.jpeg',
    [alvinImage]: 'team/alvin.jpg',
    [gilImage]: 'team/gil.jpg',
    [mcneilImage]: 'team/mcneil.png',
    [sirJoshImage]: 'team/sirlosh.jpeg',
    [nagaImage]: 'achievements/naga.jpg',
    [picImage]: 'achievements/pic.jpg',
    [gulwayImage]: 'achievements/gulway.jpeg',
    [nagacareImage]: 'projects/nagacare.jpg',
  };

  const uploadedUrls = {};

  for (const [localPath, remotePath] of Object.entries(imageMap)) {
    try {
      // Fetch the image
      const response = await fetch(localPath);
      const blob = await response.blob();
      const file = new File([blob], remotePath.split('/').pop(), { type: blob.type });

      // Upload to Supabase
      const { data, error } = await supabase.storage
        .from('portfolio-images')
        .upload(remotePath, file, { upsert: true });

      if (error) {
        console.error(`Error uploading ${remotePath}:`, error);
      } else {
        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('portfolio-images')
          .getPublicUrl(remotePath);
        uploadedUrls[localPath] = publicUrlData.publicUrl;
        console.log(`✓ Uploaded: ${remotePath}`);
      }
    } catch (err) {
      console.error(`Error processing ${remotePath}:`, err);
    }
  }

  return uploadedUrls;
};

/**
 * Migrate portfolio data to Supabase after uploading images
 */
export const migrateDataToSupabase = async (imageUrlMap) => {
  console.log('Migrating portfolio data to Supabase...');

  // Transform data to use uploaded image URLs
  const dataToMigrate = { ...INITIAL_PORTFOLIO_DATA };

  // Update team member avatars
  dataToMigrate.team = dataToMigrate.team.map(member => ({
    ...member,
    avatar: imageUrlMap[member.avatar] || member.avatar,
  }));

  // Update achievement images
  dataToMigrate.achievements = dataToMigrate.achievements.map(achievement => ({
    ...achievement,
    image: imageUrlMap[achievement.image] || achievement.image,
  }));

  // Update project images
  dataToMigrate.projects = dataToMigrate.projects.map(project => ({
    ...project,
    image: imageUrlMap[project.image] || project.image,
  }));

  // Save to Supabase
  const { data, error } = await supabase
    .from('cms_content')
    .update({ content: dataToMigrate })
    .eq('id', 1)
    .select();

  if (error) {
    console.error('Error migrating data:', error);
    return { success: false, error };
  }

  console.log('✓ Data migration complete!');
  return { success: true, data };
};

/**
 * Helper function to run full migration from console
 * Usage: In browser console on admin page:
 * const { migrateImagesToSupabase, migrateDataToSupabase } = await import('./migrationHelpers.js');
 * const urls = await migrateImagesToSupabase();
 * await migrateDataToSupabase(urls);
 */
export const runFullMigration = async () => {
  try {
    const urls = await migrateImagesToSupabase();
    await migrateDataToSupabase(urls);
    console.log('✓ Full migration complete!');
  } catch (err) {
    console.error('Migration failed:', err);
  }
};
