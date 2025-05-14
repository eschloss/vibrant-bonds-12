
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const TeamSection = () => {
  const { t } = useTranslation();
  
  const teamMembers = [
    {
      name: "Eric Schlossberg",
      role: "Founder, Engineering & Strategy",
      image: "/lovable-uploads/bd8cf463-4a58-4a21-8681-90c958baf08a.jpg"
    },
    {
      name: "Stian Hansen",
      role: "Product & Growth",
      image: "/lovable-uploads/a26a7983-2c55-4dca-8d85-5b0d8154c5a8.jpg"
    },
    {
      name: "Pedro Corchado",
      role: "Marketing & Communications",
      image: "/lovable-uploads/e59e2f5f-3b38-4156-b86e-fe05d138962f.jpg"
    }
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("team.title", "Our Team")}</h2>
          <p className="text-xl text-gray-300">
            {t("team.description", "Meet the people building the future of social connection")}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="aspect-square mb-6 overflow-hidden rounded-xl">
                <img 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  src={member.image}
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-gray-300">{member.role}</p>
            </motion.div>
          ))}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-pulse-purple/20 to-pulse-blue/20 rounded-2xl p-6 border border-pulse-purple/30"
          >
            <Link to="/contact" className="block">
              <div className="aspect-square mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-pulse-purple to-pulse-blue opacity-75">
                <img 
                  alt={t("team.join", "Join Our Team")} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  src="/lovable-uploads/6c2d1f54-0f4e-431e-9cef-97783bc29b11.png"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("team.join", "Join Our Team")}</h3>
              <Button variant="gradient" className="w-full">
                {t("team.get_in_touch", "Get in Touch")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
