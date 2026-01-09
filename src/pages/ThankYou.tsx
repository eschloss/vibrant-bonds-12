import Footer from "@/components/Footer";
import { Seo } from "@/hooks/useSeo";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

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
      <div className="flex flex-col min-h-screen bg-white">
        <main className="flex-1 w-full">
          <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                {t.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </div>

            <div className="mt-16 space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                  {t.whereItGoes}
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  {t.whereItGoesDescription}
                </p>
                <ul className="space-y-4">
                  {t.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-3 mt-1">•</span>
                      <span className="text-gray-700 text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                  {t.multiplyImpact}
                </h2>
                <p className="text-lg text-gray-700">
                  {t.multiplyImpactDescription}
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/"
                className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                {currentLanguage === 'es' ? 'Volver al inicio' : 'Back to Home'}
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ThankYou;

