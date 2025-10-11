import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Seo } from "@/hooks/useSeo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Seo
        title={{
          en: "404 Not Found | Pulse",
          es: "404 No Encontrado | Pulse"
        }}
        description={{
          en: "The page you're looking for doesn't exist. Head back to the Pulse homepage to continue.",
          es: "La página que buscas no existe. Vuelve a la página principal de Pulse para continuar."
        }}
        type="website"
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
