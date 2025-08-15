import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

/**
 * Hook to handle ref parameter propagation throughout the application
 */
export const useRefParam = () => {
  const location = useLocation();
  
  const refParam = useMemo(() => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('ref');
  }, [location.search]);
  
  const addRefToUrl = (url: string): string => {
    if (!refParam) return url;
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}ref=${encodeURIComponent(refParam)}`;
  };
  
  return {
    refParam,
    addRefToUrl
  };
};