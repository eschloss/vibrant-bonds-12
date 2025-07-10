
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Redirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = searchParams.get('url');
    
    if (url) {
      // Decode the URL parameter and redirect
      let decodedUrl = decodeURIComponent(url);
      
      window.location.href = decodedUrl;
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
