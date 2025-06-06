
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const TeamSection = () => {
  const { t } = useTranslation();
  
  const teamMembers = [
    {
      nameKey: "team.eric.name",
      roleKey: "team.eric.role",
      bioKey: "team.eric.bio",
      image: "/lovable-uploads/bd8cf463-4a58-4a21-8681-90c958baf08a.jpg"
    },
    {
      nameKey: "team.stian.name",
      roleKey: "team.stian.role",
      bioKey: "team.stian.bio",
      image: "https://s.kikiapp.eu/img/team/stian.jpeg"
    },
    {
      nameKey: "team.pedro.name",
      roleKey: "team.pedro.role",
      bioKey: "team.pedro.bio",
      image: "https://s.kikiapp.eu/img/team/pedro_hipster.jpeg"
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
              key={t(member.nameKey, index.toString())}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="aspect-square mb-6 overflow-hidden rounded-xl">
                <img 
                  alt={t(member.nameKey, "")} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  src={member.image}
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{t(member.nameKey, "")}</h3>
              <p className="text-gray-300 mb-4">{t(member.roleKey, "")}</p>
              <p className="text-sm text-gray-400">{t(member.bioKey, "")}</p>
            </motion.div>
          ))}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-pulse-purple/20 to-pulse-blue/20 rounded-2xl p-6 border border-pulse-purple/30 md:col-span-3"
          >
            <Link to="/contact" className="block">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{t("team.join", "Join Our Team")}</h3>
                  <p className="text-gray-300 mb-4 md:mb-0">
                    {t("team.join_subtitle", "We're looking for bold, curious minds to help us bring people together.")}
                  </p>
                </div>
                <Button variant="gradient">
                  {t("team.get_in_touch", "Get in Touch")}
                </Button>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
