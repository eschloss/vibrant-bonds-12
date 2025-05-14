
import { Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import Text from "@/components/Text";

const Blog = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-24 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Terminal className="w-12 h-12 mx-auto mb-6 text-pulse-purple" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            {t("blog.coming_soon", "Blog Coming Soon")}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t("blog.description", "We're crafting interesting stories and insights about building meaningful connections. Stay tuned!")}
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Blog;
