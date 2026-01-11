import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Seo } from "@/hooks/useSeo";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import ShareSection from "@/components/ShareSection";
import { Users } from "lucide-react";

const ThankYou = () => {
  const { currentLanguage } = useLanguage();

  const content = {
    en: {
      title: "You just helped keep Pulse going. Thank you.",
      subtitle: "Your donation goes straight into making Pulse better and helps keep it free for the community. We're grateful you're here.",
      multiplyImpact: "If you want to multiply the impact",
      multiplyImpactDescription: "The biggest help is simply inviting one person you'd actually want to hang out with. Pulse works best when good people bring good people.",
      spreadTheWord: "Spread the word",
      spreadTheWordDescription: "Share Pulse with friends and help grow your local crew."
    },
    es: {
      title: "Acabas de ayudar a mantener Pulse funcionando. Gracias.",
      subtitle: "Tu donación va directamente a mejorar Pulse y ayuda a mantenerlo gratis para la comunidad. Estamos agradecidos de que estés aquí.",
      multiplyImpact: "Si quieres multiplicar el impacto",
      multiplyImpactDescription: "La mayor ayuda es simplemente invitar a una persona con la que realmente querrías pasar el rato. Pulse funciona mejor cuando las buenas personas traen buenas personas.",
      spreadTheWord: "Difunde la palabra",
      spreadTheWordDescription: "Comparte Pulse con amigos y ayuda a hacer crecer tu grupo local."
    }
  };

  const t = content[currentLanguage as 'en' | 'es'] || content.en;

  return (
    <>
      <Seo
        title={{
          en: "Thank You | Pulse",
          es: "Gracias | Pulse"
        }}
        description={{
          en: "Thank you for supporting Pulse and helping keep it free for the community",
          es: "Gracias por apoyar a Pulse y ayudar a mantenerlo gratis para la comunidad"
        }}
        pathname="/thank-you"
      />
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        
        <main className="w-full">
          <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden opacity-30">
              <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-pulse-purple blur-3xl"></div>
              <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-pulse-blue blur-3xl"></div>
              <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full bg-pulse-pink blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {t.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                  {t.subtitle}
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-pulse-purple blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-pulse-blue blur-3xl"></div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-white/5 via-white/5 to-white/0 backdrop-blur-md ring-1 ring-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
                    {/* Decorative gradient border effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pulse-pink/20 via-pulse-purple/20 to-pulse-blue/20 opacity-50 blur-xl -z-10" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pulse-pink/20 via-pulse-purple/20 to-pulse-blue/20 flex items-center justify-center ring-2 ring-white/10">
                          <Users className="w-8 h-8 text-pulse-pink" />
                        </div>
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text">
                        <span className="pulse-gradient-text">
                          {t.multiplyImpact}
                        </span>
                      </h2>
                      
                      <div className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue rounded-full animate-glow-bar" />
                      
                      <motion.p
                        className="text-lg md:text-xl text-gray-300 text-center font-medium leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      >
                        {t.multiplyImpactDescription}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>

                <div className="bg-white/5 backdrop-blur-md ring-1 ring-white/10 rounded-3xl p-8 md:p-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text">
                      <span className="pulse-gradient-text">
                        {t.spreadTheWord}
                      </span>
                    </h2>
                    <div className="w-32 h-1 mx-auto mb-6 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue rounded-full animate-glow-bar" />
                    <motion.p
                      className="text-lg md:text-xl text-gray-300 font-medium mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      {t.spreadTheWordDescription}
                    </motion.p>
                    <ShareSection />
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ThankYou;

