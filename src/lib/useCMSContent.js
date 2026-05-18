/**
 * Hook to fetch and use CMS content from Supabase
 * Use this in your main App.jsx to dynamically load portfolio data
 */

import { useState, useEffect } from 'react';
import { getContentData } from './supabase';

export const useCMSContent = (defaultData = null) => {
  const [content, setContent] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error: fetchError } = await getContentData();
        
        if (fetchError) {
          setError(fetchError);
          // Fall back to default data if available
          if (defaultData) {
            setContent(defaultData);
          }
        } else if (data) {
          setContent(data.content);
        }
      } catch (err) {
        setError(err);
        if (defaultData) {
          setContent(defaultData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContent();

    // Optional: Set up real-time subscription to content changes
    // This will auto-update when admin makes changes
    const subscription = getContentData.onChange?.((payload) => {
      if (payload.new?.content) {
        setContent(payload.new.content);
      }
    });

    return () => {
      subscription?.unsubscribe?.();
    };
  }, [defaultData]);

  return { content, loading, error };
};

/**
 * Context provider to share CMS content across your app
 * Wrap your main App with <CMSProvider>
 */

import { createContext, useContext } from 'react';

const CMSContext = createContext(null);

export const CMSProvider = ({ children, defaultData }) => {
  const contentState = useCMSContent(defaultData);

  return (
    <CMSContext.Provider value={contentState}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within CMSProvider');
  }
  return context;
};
