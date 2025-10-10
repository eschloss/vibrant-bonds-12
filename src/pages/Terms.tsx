import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/hooks/useSeo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Shield } from "lucide-react";

const Terms: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const seoProps = {
    title: {
      en: "Terms of Service | Pulse",
      es: "Términos de Servicio | Pulse"
    },
    description: {
      en: "Read the Terms of Service for the Pulse website.",
      es: "Lee los Términos de Servicio del sitio web de Pulse."
    },
    pathname: "/terms",
    type: "website",
    section: "Legal"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Seo {...seoProps} />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-[40px]">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue p-4">
                <Shield size={56} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              {t("legal.terms.title", "Terms of Service")}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              {t("legal.effective_date", "Effective Date")}: October 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 relative">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-gray-700 p-6 md:p-10 leading-relaxed text-gray-200">
            {currentLanguage === "es" ? (
              <>
                <p className="mb-6">
                  ¡Bienvenido a Pulse! Estos Términos de Servicio ("Términos") rigen tu uso del sitio web de Pulse ubicado en <a href="https://pulsenow.app" className="text-[#38D1BF] hover:underline">https://pulsenow.app</a> (el "Sitio Web"). Al acceder o usar el Sitio Web, aceptas estos Términos. Si no estás de acuerdo, por favor no utilices el Sitio Web.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">1. Uso del Sitio Web</h2>
                <p className="mb-4">
                  El Sitio Web proporciona información sobre Pulse, su app, servicios, actividades comunitarias y ofertas relacionadas. Puedes navegar por el Sitio Web sin crear una cuenta. Ciertas funciones, como suscribirte a novedades, boletines o asociaciones, pueden requerir que proporciones información personal.
                </p>
                <p className="mb-6">Aceptas usar el Sitio Web solo para fines legales y de acuerdo con estos Términos.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">2. Contenido Generado por el Usuario</h2>
                <p className="mb-4">
                  El Sitio Web puede permitirte enviar o compartir contenido, como comentarios, mensajes, testimonios o medios ("Contenido Generado por el Usuario"). Eres el único responsable del contenido que envíes.
                </p>
                <p className="mb-3">Aceptas no enviar ningún contenido que sea:</p>
                <ul className="list-disc list-inside space-y-1 mb-6">
                  <li>Obsceno, odioso o discriminatorio</li>
                  <li>Violento, amenazante o dañino</li>
                  <li>Difamatorio, calumnioso o ilícito</li>
                  <li>Falso o engañoso</li>
                  <li>Que infrinja derechos de propiedad intelectual de terceros</li>
                </ul>
                <p className="mb-6">Pulse se reserva el derecho de eliminar o moderar cualquier Contenido Generado por el Usuario a su discreción y sin previo aviso.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">3. Actividades Prohibidas</h2>
                <p className="mb-3">Al utilizar el Sitio Web, aceptas no:</p>
                <ul className="list-disc list-inside space-y-1 mb-6">
                  <li>Interferir o interrumpir el Sitio Web o sus servidores</li>
                  <li>Intentar obtener acceso no autorizado a cualquier parte del Sitio Web</li>
                  <li>Usar el Sitio Web para solicitudes comerciales o spam</li>
                  <li>Hacerse pasar por otra persona o tergiversar tu afiliación</li>
                  <li>Violar cualquier ley o regulación aplicable</li>
                </ul>
                <p className="mb-6">Pulse se reserva el derecho de restringir o terminar el acceso a los usuarios que violen estos Términos.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">4. Propiedad Intelectual</h2>
                <p className="mb-6">
                  Todo el contenido del Sitio Web —incluyendo textos, gráficos, logotipos, íconos, imágenes, elementos de diseño, videos y software— es propiedad de Pulse o cuenta con licencia y está protegido por las leyes de propiedad intelectual. No puedes copiar, reproducir, distribuir, modificar ni crear obras derivadas de ningún material del Sitio Web sin el consentimiento previo por escrito de Pulse.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">5. Enlaces y Servicios de Terceros</h2>
                <p className="mb-6">
                  El Sitio Web puede contener enlaces a sitios web o servicios de terceros. Se proporcionan por conveniencia y no implican respaldo. Pulse no es responsable del contenido, políticas de privacidad o prácticas de sitios o servicios de terceros. Si decides acceder a un enlace de terceros, lo haces bajo tu propio riesgo.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">6. Correo Electrónico y Comunicaciones</h2>
                <p className="mb-6">
                  Al suscribirte a nuestro boletín o enviar formularios en el Sitio Web, aceptas recibir comunicaciones de Pulse relacionadas con actualizaciones, promociones u oportunidades de asociación. Puedes darte de baja de los correos de marketing en cualquier momento siguiendo las instrucciones del correo o contactándonos en <a href="mailto:terms@pulsenow.app" className="text-[#38D1BF] hover:underline">terms@pulsenow.app</a>.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">7. Descargo de Responsabilidad</h2>
                <p className="mb-6">
                  El Sitio Web se proporciona “tal cual” y “según disponibilidad”. Pulse no otorga garantías, expresas o implícitas, sobre el Sitio Web o su contenido, incluyendo precisión, confiabilidad o disponibilidad. Pulse no garantiza que el Sitio Web sea ininterrumpido o esté libre de errores, ni que esté libre de virus u otros componentes dañinos.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">8. Limitación de Responsabilidad</h2>
                <p className="mb-6">
                  En la máxima medida permitida por la ley, Pulse no será responsable de daños directos, indirectos, incidentales, consecuentes o especiales que surjan de tu uso del Sitio Web o de la confianza en su contenido.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">9. Indemnización</h2>
                <p className="mb-6">
                  Aceptas indemnizar, defender y mantener indemne a Pulse, sus afiliados, empleados y socios de cualquier reclamación, pérdida, daño, responsabilidad o gasto (incluidos honorarios legales) derivados de tu uso del Sitio Web o del incumplimiento de estos Términos.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">10. Cambios a estos Términos</h2>
                <p className="mb-6">
                  Pulse puede modificar estos Términos en cualquier momento. Los Términos actualizados se publicarán en esta página con una fecha de vigencia revisada. Tu uso continuo del Sitio Web después de los cambios constituye la aceptación de los Términos actualizados.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">11. Ley Aplicable</h2>
                <p className="mb-6">
                  Estos Términos se rigen e interpretan de acuerdo con las leyes de España, sin referencia a sus disposiciones sobre conflicto de leyes.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">12. Contáctanos</h2>
                <p className="mb-2">Si tienes preguntas sobre estos Términos, contáctanos en:</p>
                <p className="mb-0">📧 <a href="mailto:terms@pulsenow.app" className="text-[#38D1BF] hover:underline">terms@pulsenow.app</a></p>
              </>
            ) : (
              <>
                <p className="mb-6">
                  Welcome to Pulse! These Terms of Service ("Terms") govern your use of the Pulse website located at <a href="https://pulsenow.app" className="text-[#38D1BF] hover:underline">https://pulsenow.app</a> ("Website"). By accessing or using the Website, you agree to these Terms. If you do not agree, please do not use the Website.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">1. Use of the Website</h2>
                <p className="mb-4">
                  The Website provides information about Pulse, its app, services, community activities, and related offerings. You may browse the Website without creating an account. Certain features, such as signing up for updates, newsletters, or partnerships, may require you to provide personal information.
                </p>
                <p className="mb-6">You agree to use the Website only for lawful purposes and in accordance with these Terms.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">2. User Generated Content</h2>
                <p className="mb-4">
                  The Website may allow you to submit or share content, such as comments, messages, testimonials, or media ("User Generated Content"). You are solely responsible for the content you submit.
                </p>
                <p className="mb-3">You agree not to submit any content that is:</p>
                <ul className="list-disc list-inside space-y-1 mb-6">
                  <li>Obscene, hateful, or discriminatory</li>
                  <li>Violent, threatening, or harmful</li>
                  <li>Defamatory, libelous, or tortious</li>
                  <li>False or misleading</li>
                  <li>Infringing on the intellectual property rights of others</li>
                </ul>
                <p className="mb-6">Pulse reserves the right to remove or moderate any User Generated Content at its discretion without notice.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">3. Prohibited Activities</h2>
                <p className="mb-3">When using the Website, you agree not to:</p>
                <ul className="list-disc list-inside space-y-1 mb-6">
                  <li>Interfere with or disrupt the Website or its servers</li>
                  <li>Attempt to gain unauthorized access to any portion of the Website</li>
                  <li>Use the Website for any commercial solicitation or spam</li>
                  <li>Impersonate any person or misrepresent your affiliation</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
                <p className="mb-6">Pulse reserves the right to restrict or terminate access to users who violate these Terms.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">4. Intellectual Property</h2>
                <p className="mb-6">
                  All content on the Website—including text, graphics, logos, icons, images, design elements, videos, and software—is owned or licensed by Pulse and protected by intellectual property laws.
                  You may not copy, reproduce, distribute, modify, or create derivative works of any material on the Website without the prior written consent of Pulse.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">5. Third-Party Links and Services</h2>
                <p className="mb-6">
                  The Website may contain links to third-party websites or services. These are provided for convenience and do not imply endorsement. Pulse is not responsible for the content, privacy policies, or practices of any third-party sites or services. If you choose to access a third-party link, you do so at your own risk.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">6. Email and Communication</h2>
                <p className="mb-6">
                  By subscribing to our newsletter or submitting forms on the Website, you agree to receive communications from Pulse related to updates, promotions, or partnership opportunities.
                  You can unsubscribe from marketing emails at any time by following the instructions in the email or contacting us at <a href="mailto:terms@pulsenow.app" className="text-[#38D1BF] hover:underline">terms@pulsenow.app</a>.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">7. Disclaimer</h2>
                <p className="mb-6">
                  The Website is provided “as is” and “as available.” Pulse makes no warranties, express or implied, regarding the Website or its content, including accuracy, reliability, or availability. Pulse does not warrant that the Website will be uninterrupted or error-free, or that it will be free from viruses or other harmful components.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">8. Limitation of Liability</h2>
                <p className="mb-6">
                  To the fullest extent permitted by law, Pulse shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from your use of the Website or reliance on its content.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">9. Indemnification</h2>
                <p className="mb-6">
                  You agree to indemnify, defend, and hold harmless Pulse, its affiliates, employees, and partners from any claims, losses, damages, liabilities, or expenses (including legal fees) arising from your use of the Website or violation of these Terms.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">10. Changes to These Terms</h2>
                <p className="mb-6">
                  Pulse may modify these Terms at any time. Updated Terms will be posted on this page with a revised effective date. Your continued use of the Website after changes are posted constitutes your acceptance of the updated Terms.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">11. Governing Law</h2>
                <p className="mb-6">
                  These Terms are governed by and construed in accordance with the laws of Spain, without regard to its conflict of law provisions.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">12. Contact Us</h2>
                <p className="mb-2">If you have any questions about these Terms, please contact us at:</p>
                <p className="mb-0">📧 <a href="mailto:terms@pulsenow.app" className="text-[#38D1BF] hover:underline">terms@pulsenow.app</a></p>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;


