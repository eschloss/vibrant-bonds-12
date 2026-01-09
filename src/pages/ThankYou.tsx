import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Seo } from "@/hooks/useSeo";
import { useLanguage } from "@/contexts/LanguageContext";

const ThankYou = () => {
  const { currentLanguage } = useLanguage();

  const content = {
    en: {
      title: "You just helped keep Pulse going. Thank you.",
      subtitle: "Your donation goes straight into making Pulse better and helps keep it free for the community. We're grateful you're here.",
      whereItGoes: "Where it goes",
      whereItGoesDescription: "Support like this helps us:",
      benefits: [
        "keep the service running (keeping the app running costs money)",
        "build improvements and new features faster",
        "keep Pulse accessible without paywalls getting in the way"
      ],
      multiplyImpact: "If you want to multiply the impact",
      multiplyImpactDescription: "The biggest help is simply inviting one person you'd actually want to hang out with. Pulse works best when good people bring good people."
    },
    es: {
      title: "Acabas de ayudar a mantener Pulse funcionando. Gracias.",
      subtitle: "Tu donación va directamente a mejorar Pulse y ayuda a mantenerlo gratis para la comunidad. Estamos agradecidos de que estés aquí.",
      whereItGoes: "A dónde va",
      whereItGoesDescription: "Apoyo como este nos ayuda a:",
      benefits: [
        "mantener el servicio funcionando (mantener la aplicación funcionando cuesta dinero)",
        "construir mejoras y nuevas funciones más rápido",
        "mantener Pulse accesible sin muros de pago que se interpongan"
      ],
      multiplyImpact: "Si quieres multiplicar el impacto",
      multiplyImpactDescription: "La mayor ayuda es simplemente invitar a una persona con la que realmente querrías pasar el rato. Pulse funciona mejor cuando las buenas personas traen buenas personas."
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

          <section className="py-16 md:py-24 relative">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto space-y-12">
                <div className="bg-white/5 backdrop-blur-md ring-1 ring-white/10 rounded-3xl p-8 md:p-10">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {t.whereItGoes}
                  </h2>
                  <p className="text-lg text-gray-300 mb-6">
                    {t.whereItGoesDescription}
                  </p>
                  <ul className="space-y-4">
                    {t.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-pulse-pink mr-3 mt-1 text-xl">•</span>
                        <span className="text-gray-300 text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/5 backdrop-blur-md ring-1 ring-white/10 rounded-3xl p-8 md:p-10">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {t.multiplyImpact}
                  </h2>
                  <p className="text-lg text-gray-300">
                    {t.multiplyImpactDescription}
                  </p>
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

