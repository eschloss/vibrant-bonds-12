
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Redirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = searchParams.get('url');
    
    if (url) {
      try {
        // Decode the URL parameter
        let decodedUrl = decodeURIComponent(url);
        
        // Parse the URL to validate it
        const urlObj = new URL(decodedUrl);
        
        // Only allow redirects to pulsenow.app and its subdomains
        const allowedDomain = 'pulsenow.app';
        const hostname = urlObj.hostname.toLowerCase();
        
        if (hostname === allowedDomain || hostname.endsWith('.' + allowedDomain)) {
          window.location.href = decodedUrl;
        } else {
          // Invalid domain, redirect to home
          navigate('/');
        }
      } catch (error) {
        // Invalid URL, redirect to home
        navigate('/');
      }
    } else {
      // If no URL parameter, redirect to home
      navigate('/');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};

export default Redirect;
