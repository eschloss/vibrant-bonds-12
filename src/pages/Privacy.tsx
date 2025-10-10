import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/hooks/useSeo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Shield } from "lucide-react";

const Privacy: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const seoProps = {
    title: {
      en: "Privacy & Cookie Policy | Pulse",
      es: "Política de Privacidad y Cookies | Pulse"
    },
    description: {
      en: "Learn how Pulse collects, uses, and protects your data on our Website.",
      es: "Conoce cómo Pulse recopila, usa y protege tus datos en nuestro sitio."
    },
    pathname: "/privacy",
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
              {t("legal.privacy.title", "Privacy & Cookie Policy")}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              {currentLanguage === "es" ? `${t("legal.effective_date", "Fecha de vigencia")}: Octubre 2025 · ${t("legal.last_updated", "Última actualización")}: 10 de octubre de 2025` : `${t("legal.effective_date", "Effective Date")}: October 2025 · ${t("legal.last_updated", "Last Updated")}: October 10, 2025`}
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
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">1. Introducción</h2>
                <p className="mb-4">
                  Pulse ("Pulse", "nosotros" o "nuestro") respeta tu privacidad y se compromete a proteger tu información personal. Esta Política de Privacidad y Cookies explica cómo recopilamos, usamos, divulgamos y protegemos la información cuando visitas nuestro sitio web <a href="https://pulsenow.app" className="text-[#38D1BF] hover:underline">https://pulsenow.app</a> (el "Sitio Web") o interactúas con nuestras comunicaciones y marketing.
                </p>
                <p className="mb-6">Al utilizar el Sitio Web, aceptas los términos de esta Política. Si no estás de acuerdo, por favor deja de utilizar el Sitio Web.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">2. Información que Recopilamos</h2>
                <h3 className="text-xl font-semibold text-white mt-4 mb-2">2.1 Información que Proporcionas Directamente</h3>
                <p className="mb-3">Recopilamos la información que proporcionas voluntariamente cuando:</p>
                <ul className="list-disc list-inside space-y-1 mb-3">
                  <li>Te suscribes a boletines o novedades</li>
                  <li>Envías formularios de contacto o colaboración</li>
                  <li>Solicitas información o materiales de prensa sobre Pulse</li>
                </ul>
                <p className="mb-2">Esto puede incluir:</p>
                <ul className="list-disc list-inside space-y-1 mb-3">
                  <li>Nombre</li>
                  <li>Dirección de email</li>
                  <li>Ciudad o país</li>
                  <li>Contenido de texto libre de formularios o mensajes</li>
                </ul>
                <p className="mb-6">Esta información se almacena de forma segura en Supabase (nuestro proveedor de base de datos y backend).
                </p>

                <h3 className="text-xl font-semibold text-white mt-6 mb-2">2.2 Información Recopilada Automáticamente</h3>
                <p className="mb-3">Cuando visitas nuestro Sitio Web, recopilamos automáticamente cierta información mediante cookies y tecnologías similares. Esto puede incluir:</p>
                <ul className="list-disc list-inside space-y-1 mb-3">
                  <li>Dirección IP</li>
                  <li>Tipo de navegador, sistema operativo y tipo de dispositivo</li>
                  <li>Páginas de referencia y salida</li>
                  <li>Páginas vistas, tiempo de permanencia e interacciones con enlaces</li>
                  <li>Ubicación general derivada de la IP</li>
                </ul>
                <p className="mb-6">Estos datos se recopilan para analítica, seguridad y optimización del rendimiento.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">3. Cookies y Tecnologías de Seguimiento</h2>
                <h3 className="text-xl font-semibold text-white mt-4 mb-2">3.1 ¿Qué son las Cookies?</h3>
                <p className="mb-6">Las cookies son pequeños archivos de texto que se colocan en tu dispositivo y ayudan a operar y analizar el Sitio Web. También utilizamos píxeles de seguimiento y scripts para fines similares.</p>

                <h3 className="text-xl font-semibold text-white mt-4 mb-2">3.2 Tipos de Cookies que Usamos</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full text-left text-sm border border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-800/70 text-gray-300">
                      <tr>
                        <th className="px-4 py-3 border-b border-gray-700">Tipo</th>
                        <th className="px-4 py-3 border-b border-gray-700">Propósito</th>
                        <th className="px-4 py-3 border-b border-gray-700">Ejemplos</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="px-4 py-3 text-white">Cookies Esenciales</td>
                        <td className="px-4 py-3 text-gray-300">Habilitan funciones básicas del sitio (p. ej., navegación, seguridad).</td>
                        <td className="px-4 py-3 text-gray-300">Gestión de sesión de Supabase</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="px-4 py-3 text-white">Cookies de Analítica</td>
                        <td className="px-4 py-3 text-gray-300">Miden y analizan el uso del sitio.</td>
                        <td className="px-4 py-3 text-gray-300">Google Analytics</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="px-4 py-3 text-white">Cookies de Marketing y Publicidad</td>
                        <td className="px-4 py-3 text-gray-300">Rastrean conversiones, entregan anuncios dirigidos y miden la eficacia de campañas.</td>
                        <td className="px-4 py-3 text-gray-300">Meta Pixel, Reddit Pixel, HubSpot, Instantly</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-white">Cookies de Rendimiento</td>
                        <td className="px-4 py-3 text-gray-300">Ayudan a comprender y mejorar la velocidad, usabilidad y engagement del sitio.</td>
                        <td className="px-4 py-3 text-gray-300">Herramientas de seguimiento de HubSpot</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-semibold text-white mt-4 mb-2">3.3 Gestión de Cookies</h3>
                <ul className="list-disc list-inside space-y-1 mb-6">
                  <li>Puedes controlar o eliminar cookies en cualquier momento desde la configuración de tu navegador.</li>
                  <li>Los usuarios de la UE/EEE pueden gestionar el consentimiento mediante el banner de cookies mostrado en la primera visita.</li>
                  <li>Deshabilitar cookies puede afectar la funcionalidad del sitio.</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mt-4 mb-2">3.4 Banner de Consentimiento de Cookies</h3>
                <p className="mb-6">Al visitar nuestro Sitio Web desde una región que requiera consentimiento (p. ej., EEE o Reino Unido), verás un banner que te permite aceptar todas las cookies, rechazar las no esenciales o gestionar preferencias. Tus elecciones se guardan y pueden cambiarse en cualquier momento.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">4. Cómo Usamos tu Información</h2>
                <ul className="list-disc list-inside space-y-1 mb-6">
                  <li>Operar, mantener y mejorar el Sitio Web</li>
                  <li>Responder a consultas de usuarios y solicitudes de colaboración</li>
                  <li>Enviar boletines, actualizaciones de producto y materiales promocionales</li>
                  <li>Analizar el comportamiento de usuarios y optimizar el rendimiento de marketing</li>
                  <li>Garantizar la seguridad, detectar fraude y cumplir obligaciones legales</li>
                </ul>
                <p className="mb-6">Los correos de marketing se envían solo a usuarios que han dado su consentimiento válido. Puedes darte de baja en cualquier momento.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">5. Bases Legales para el Tratamiento (RGPD)</h2>
                <p className="mb-3">Para visitantes ubicados en el Espacio Económico Europeo (EEE) o Reino Unido, nos basamos en las siguientes bases legales para tratar datos personales:</p>
                <ul className="list-disc list-inside space-y-1 mb-6">
                  <li><span className="font-semibold text-white">Consentimiento</span> – para boletines, emails de marketing y cookies de analítica.</li>
                  <li><span className="font-semibold text-white">Interés Legítimo</span> – para operar y mejorar el Sitio Web.</li>
                  <li><span className="font-semibold text-white">Obligación Legal</span> – para cumplir leyes aplicables o requerimientos.</li>
                </ul>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">6. Cómo Compartimos la Información</h2>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full text-left text-sm border border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-800/70 text-gray-300">
                      <tr>
                        <th className="px-4 py-3 border-b border-gray-700">Proveedor</th>
                        <th className="px-4 py-3 border-b border-gray-700">Propósito</th>
                        <th className="px-4 py-3 border-b border-gray-700">Jurisdicción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="px-4 py-3 text-white">Supabase</td>
                        <td className="px-4 py-3 text-gray-300">Base de datos y hosting</td>
                        <td className="px-4 py-3 text-gray-300">EE. UU./UE</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="px-4 py-3 text-white">Google LLC</td>
                        <td className="px-4 py-3 text-gray-300">Analítica del sitio web</td>
                        <td className="px-4 py-3 text-gray-300">EE. UU.</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="px-4 py-3 text-white">Meta Platforms, Inc.</td>
                        <td className="px-4 py-3 text-gray-300">Publicidad y seguimiento de conversiones</td>
                        <td className="px-4 py-3 text-gray-300">EE. UU.</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="px-4 py-3 text-white">Reddit, Inc.</td>
                        <td className="px-4 py-3 text-gray-300">Analítica publicitaria</td>
                        <td className="px-4 py-3 text-gray-300">EE. UU.</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="px-4 py-3 text-white">HubSpot, Inc.</td>
                        <td className="px-4 py-3 text-gray-300">CRM, analítica y tracking de leads</td>
                        <td className="px-4 py-3 text-gray-300">EE. UU.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-white">Instantly, Inc.</td>
                        <td className="px-4 py-3 text-gray-300">Envío de emails de marketing y analítica</td>
                        <td className="px-4 py-3 text-gray-300">EE. UU.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mb-6">Cada encargado externo está contractualmente obligado a cumplir RGPD, CCPA y normas equivalentes de protección de datos. No vendemos ni alquilamos tus datos personales a terceros.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">7. Transferencias Internacionales de Datos</h2>
                <p className="mb-6">Debido a que Pulse tiene sede en Estados Unidos, los datos personales pueden transferirse y procesarse en EE. UU. y otras jurisdicciones. Cuando los datos se transfieren desde el EEE o Reino Unido a un tercer país, garantizamos salvaguardas legales conforme al Artículo 46 del RGPD, como las Cláusulas Contractuales Tipo (SCC).</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">8. Conservación de Datos</h2>
                <p className="mb-6">Conservamos la información personal solo durante el tiempo necesario para los fines descritos en esta Política o según lo requiera la ley aplicable. Los datos de boletines y formularios de contacto se eliminan a petición o cuando ya no son necesarios para su propósito original.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">9. Tus Derechos (Usuarios EEE/Reino Unido)</h2>
                <p className="mb-3">Tienes los siguientes derechos bajo el RGPD:</p>
                <ul className="list-disc list-inside space-y-1 mb-3">
                  <li>Acceso – Obtener una copia de tus datos personales.</li>
                  <li>Rectificación – Corregir información inexacta.</li>
                  <li>Supresión – Solicitar la eliminación ("Derecho al olvido").</li>
                  <li>Restricción – Limitar el tratamiento en ciertas circunstancias.</li>
                  <li>Portabilidad – Recibir tus datos en un formato estructurado y legible por máquina.</li>
                  <li>Oposición – Oponerte a ciertos tratamientos, como marketing.</li>
                  <li>Retirar el Consentimiento – Retirarlo en cualquier momento.</li>
                </ul>
                <p className="mb-6">Para ejercer cualquiera de estos derechos, contacta a <a href="mailto:privacy@pulsenow.app" className="text-[#38D1BF] hover:underline">privacy@pulsenow.app</a>. Respondemos en un plazo de 30 días desde la recepción de tu solicitud verificada.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">10. Derechos de Privacidad en California (CCPA/CPRA)</h2>
                <p className="mb-3">Si eres residente de California, tienes los siguientes derechos conforme a la Ley de Privacidad del Consumidor de California (CCPA) y la Ley de Derechos de Privacidad de California (CPRA):</p>
                <ul className="list-disc list-inside space-y-1 mb-3">
                  <li>Derecho a Saber – Solicitar detalles sobre categorías de datos recopilados y fines de uso.</li>
                  <li>Derecho a Eliminar – Solicitar la eliminación de datos personales, sujeto a excepciones legales.</li>
                  <li>Derecho a Corregir – Solicitar corrección de información inexacta.</li>
                  <li>Derecho a Optar por No Vender/Compartir – No vendemos ni compartimos datos personales. Si cambia, se proporcionará un enlace de “No vender ni compartir mi información”.</li>
                  <li>Derecho a No Discriminación – No serás penalizado por ejercer tus derechos.</li>
                </ul>
                <p className="mb-6">Envía solicitudes verificadas a <a href="mailto:privacy@pulsenow.app" className="text-[#38D1BF] hover:underline">privacy@pulsenow.app</a> con el asunto “Solicitud de Privacidad de California”. Verificaremos tu identidad antes de cumplir cualquier solicitud.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">11. Seguridad de los Datos</h2>
                <p className="mb-6">Implementamos salvaguardas técnicas, administrativas y físicas apropiadas para proteger tu información personal, incluyendo cifrado, controles de acceso y almacenamiento seguro. Aunque ningún sistema en línea es completamente seguro, monitorizamos y actualizamos continuamente nuestras medidas de seguridad para prevenir accesos no autorizados o uso indebido.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">12. Privacidad de Menores</h2>
                <p className="mb-6">El Sitio Web no está dirigido a menores de 16 años. No recopilamos ni tratamos deliberadamente datos de menores. Si sabemos que se ha recopilado dicha información, la eliminaremos de inmediato.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">13. Enlaces a Sitios de Terceros</h2>
                <p className="mb-6">El Sitio Web puede contener enlaces a sitios de terceros. Pulse no es responsable de las prácticas de privacidad, contenido o seguridad de dichos sitios externos. Recomendamos revisar sus políticas de privacidad antes de proporcionar información personal.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">14. Cambios a Esta Política</h2>
                <p className="mb-6">Podemos actualizar periódicamente esta Política de Privacidad y Cookies para reflejar cambios en nuestras prácticas o requisitos legales. La última versión siempre estará disponible en <a href="https://pulsenow.app/privacy" className="text-[#38D1BF] hover:underline">https://pulsenow.app/privacy</a>. Tu uso continuado del Sitio Web tras las actualizaciones constituye la aceptación de la Política revisada.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">15. Información de Contacto</h2>
                <p className="mb-3">Si tienes preguntas o deseas ejercer tus derechos de privacidad, contáctanos en:</p>
                <p className="mb-1">📧 <a href="mailto:privacy@pulsenow.app" className="text-[#38D1BF] hover:underline">privacy@pulsenow.app</a></p>
                <p className="mb-6">📍 Pulse, 100 Fore Street, Portland, Maine 04101, EE. UU.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">16. Jurisdicción y Cumplimiento</h2>
                <p className="mb-0">Esta Política se rige por las leyes del Estado de Maine (Estados Unidos) y, cuando corresponda, por el Reglamento General de Protección de Datos (UE 2016/679) y el RGPD del Reino Unido. Pulse cumple con marcos internacionales de privacidad, incluyendo RGPD, CCPA/CPRA y CAN-SPAM.</p>
              </>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">1. Introduction</h2>
                <p className="mb-4">
                  Pulse ("Pulse," "we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy & Cookie Policy explains how we collect, use, disclose, and safeguard information when you visit our website <a href="https://pulsenow.app" className="text-[#38D1BF] hover:underline">https://pulsenow.app</a> (the "Website") or interact with our communications and marketing.
                </p>
                <p className="mb-6">By using the Website, you agree to the terms of this Policy. If you do not agree, please discontinue use of the Website.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold text-white mt-4 mb-2">2.1 Information You Provide Directly</h3>
                <p className="mb-3">We collect information that you voluntarily provide when you:</p>
                <ul className="list-disc list-inside space-y-1 mb-3">
                  <li>Subscribe to newsletters or updates</li>
                  <li>Submit partnership or contact forms</li>
                  <li>Request information or press materials about Pulse</li>
                </ul>
                <p className="mb-2">This may include:</p>
                <ul className="list-disc list-inside space-y-1 mb-3">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>City or country</li>
                  <li>Free-text content from forms or messages</li>
                </ul>
                <p className="mb-6">This information is securely stored in Supabase (our database and backend provider).</p>

                <h3 className="text-xl font-semibold text-white mt-6 mb-2">2.2 Information Collected Automatically</h3>
                <p className="mb-3">When you visit our Website, we automatically collect certain information using cookies and similar tracking technologies. This may include:</p>
                <ul className="list-disc list-inside space-y-1 mb-3">
                  <li>IP address</li>
                  <li>Browser type, operating system, and device type</li>
                  <li>Referring and exit pages</li>
                  <li>Pages viewed, time spent, and link interactions</li>
                  <li>General location derived from IP address</li>
                </ul>
                <p className="mb-6">This data is collected for analytics, security, and performance optimization.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">3. Cookies and Tracking Technologies</h2>
                <h3 className="text-xl font-semibold text-white mt-4 mb-2">3.1 What Are Cookies?</h3>
                <p className="mb-6">Cookies are small text files placed on your device that help us operate and analyze the Website. We also use tracking pixels and scripts for similar purposes.</p>

                <h3 className="text-xl font-semibold text-white mt-4 mb-2">3.2 Types of Cookies We Use</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full text-left text-sm border border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-800/70 text-gray-300">
                      <tr>
                        <th className="px-4 py-3 border-b border-gray-700">Type</th>
                        <th className="px-4 py-3 border-b border-gray-700">Purpose</th>
                        <th className="px-4 py-3 border-b border-gray-700">Examples</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="px-4 py-3 text-white">Essential Cookies</td>
                        <td className="px-4 py-3 text-gray-300">Enable core website functions (e.g., page navigation, security).</td>
                        <td className="px-4 py-3 text-gray-300">Supabase session management</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="px-4 py-3 text-white">Analytics Cookies</td>
                        <td className="px-4 py-3 text-gray-300">Measure and analyze site usage.</td>
                        <td className="px-4 py-3 text-gray-300">Google Analytics</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="px-4 py-3 text-white">Marketing & Advertising Cookies</td>
                        <td className="px-4 py-3 text-gray-300">Track conversions, deliver targeted ads, and measure campaign effectiveness.</td>
                        <td className="px-4 py-3 text-gray-300">Meta Pixel, Reddit Pixel, HubSpot, Instantly</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-white">Performance Cookies</td>
                        <td className="px-4 py-3 text-gray-300">Help us understand and improve website speed, usability, and engagement.</td>
                        <td className="px-4 py-3 text-gray-300">HubSpot tracking tools</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-semibold text-white mt-4 mb-2">3.3 Managing Cookies</h3>
                <ul className="list-disc list-inside space-y-1 mb-6">
                  <li>You can control or delete cookies at any time through your browser settings.</li>
                  <li>EU/EEA users can manage consent via the cookie banner displayed on first visit.</li>
                  <li>Disabling cookies may impact website functionality.</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mt-4 mb-2">3.4 Cookie Consent Banner</h3>
                <p className="mb-6">When visiting our Website from a region requiring consent (e.g., EEA or UK), you will see a banner allowing you to accept all cookies, reject non-essential cookies, or manage preferences. Your consent choices are stored and can be changed anytime.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">4. How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-1 mb-6">
                  <li>Operate, maintain, and improve the Website</li>
                  <li>Respond to user inquiries and partnership requests</li>
                  <li>Send newsletters, product updates, and promotional materials</li>
                  <li>Analyze user behavior and optimize marketing performance</li>
                  <li>Ensure security, detect fraud, and comply with legal obligations</li>
                </ul>
                <p className="mb-6">Marketing emails are sent only to users who have opted in or provided valid consent. You can unsubscribe at any time.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">5. Legal Bases for Processing (GDPR)</h2>
                <p className="mb-3">For visitors located in the European Economic Area (EEA) or United Kingdom, we rely on the following lawful bases for processing personal data:</p>
                <ul className="list-disc list-inside space-y-1 mb-6">
                  <li><span className="font-semibold text-white">Consent</span> – for newsletters, marketing emails, and analytics cookies.</li>
                  <li><span className="font-semibold text-white">Legitimate Interest</span> – for operating and improving the Website.</li>
                  <li><span className="font-semibold text-white">Legal Obligation</span> – for compliance with applicable laws or requests.</li>
                </ul>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">6. How We Share Information</h2>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full text-left text-sm border border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-800/70 text-gray-300">
                      <tr>
                        <th className="px-4 py-3 border-b border-gray-700">Service Provider</th>
                        <th className="px-4 py-3 border-b border-gray-700">Purpose</th>
                        <th className="px-4 py-3 border-b border-gray-700">Jurisdiction</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="px-4 py-3 text-white">Supabase</td>
                        <td className="px-4 py-3 text-gray-300">Database and hosting</td>
                        <td className="px-4 py-3 text-gray-300">USA/EU</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="px-4 py-3 text-white">Google LLC</td>
                        <td className="px-4 py-3 text-gray-300">Website analytics</td>
                        <td className="px-4 py-3 text-gray-300">USA</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="px-4 py-3 text-white">Meta Platforms, Inc.</td>
                        <td className="px-4 py-3 text-gray-300">Advertising and conversion tracking</td>
                        <td className="px-4 py-3 text-gray-300">USA</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="px-4 py-3 text-white">Reddit, Inc.</td>
                        <td className="px-4 py-3 text-gray-300">Advertising analytics</td>
                        <td className="px-4 py-3 text-gray-300">USA</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="px-4 py-3 text-white">HubSpot, Inc.</td>
                        <td className="px-4 py-3 text-gray-300">CRM, analytics, and lead tracking</td>
                        <td className="px-4 py-3 text-gray-300">USA</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-white">Instantly, Inc.</td>
                        <td className="px-4 py-3 text-gray-300">Marketing email delivery and analytics</td>
                        <td className="px-4 py-3 text-gray-300">USA</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mb-6">Each third-party processor is contractually bound to comply with GDPR, CCPA, and equivalent data protection standards. We do not sell or rent your personal data to third parties.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">7. International Data Transfers</h2>
                <p className="mb-6">Because Pulse is headquartered in the United States, personal data may be transferred to and processed in the U.S. and other jurisdictions. Where data is transferred from the EEA or UK to a third country, we ensure lawful safeguards under GDPR Article 46, such as Standard Contractual Clauses (SCCs).</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">8. Data Retention</h2>
                <p className="mb-6">We retain personal information only for as long as necessary to fulfill the purposes outlined in this Policy or as required by applicable law. Newsletter and contact form data are deleted upon your request or when no longer needed for their original purpose.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">9. Your Rights (EEA/UK Users)</h2>
                <p className="mb-3">You have the following rights under the GDPR:</p>
                <ul className="list-disc list-inside space-y-1 mb-3">
                  <li>Access – Obtain a copy of your personal data.</li>
                  <li>Rectification – Correct inaccurate information.</li>
                  <li>Erasure – Request deletion ("Right to be Forgotten").</li>
                  <li>Restriction – Limit processing in certain circumstances.</li>
                  <li>Portability – Receive your data in a structured, machine-readable format.</li>
                  <li>Objection – Object to certain processing, such as marketing.</li>
                  <li>Withdraw Consent – Withdraw your consent at any time.</li>
                </ul>
                <p className="mb-6">To exercise any of these rights, contact <a href="mailto:privacy@pulsenow.app" className="text-[#38D1BF] hover:underline">privacy@pulsenow.app</a>. We respond within 30 days of receiving your verified request.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">10. California Privacy Rights (CCPA/CPRA)</h2>
                <p className="mb-3">If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA):</p>
                <ul className="list-disc list-inside space-y-1 mb-3">
                  <li>Right to Know – Request details on categories of data collected and purposes of use.</li>
                  <li>Right to Delete – Request deletion of personal data, subject to legal exceptions.</li>
                  <li>Right to Correct – Request correction of inaccurate information.</li>
                  <li>Right to Opt Out of Sale/Sharing – We do not sell or share personal data. If that changes, a “Do Not Sell or Share My Personal Information” link will be provided.</li>
                  <li>Right to Non-Discrimination – You will not be penalized for exercising your rights.</li>
                </ul>
                <p className="mb-6">Submit verified requests to <a href="mailto:privacy@pulsenow.app" className="text-[#38D1BF] hover:underline">privacy@pulsenow.app</a> with the subject line “California Privacy Request.” We will verify your identity before fulfilling any request.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">11. Data Security</h2>
                <p className="mb-6">We implement appropriate technical, administrative, and physical safeguards to protect your personal information, including encryption, access controls, and secure storage. While no online system is fully secure, we continuously monitor and update our security measures to prevent unauthorized access or misuse.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">12. Children’s Privacy</h2>
                <p className="mb-6">The Website is not directed to individuals under 16 years of age. We do not knowingly collect or process data from minors. If we learn that such data has been collected, we will delete it immediately.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">13. Links to Third-Party Websites</h2>
                <p className="mb-6">The Website may contain links to third-party websites. Pulse is not responsible for the privacy practices, content, or security of such external sites. We recommend reviewing the privacy policies of those websites before providing personal information.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">14. Changes to This Policy</h2>
                <p className="mb-6">We may update this Privacy & Cookie Policy periodically to reflect changes in our practices or legal requirements. The latest version will always be available at <a href="https://pulsenow.app/privacy" className="text-[#38D1BF] hover:underline">https://pulsenow.app/privacy</a>. Your continued use of the Website after updates constitutes acceptance of the revised Policy.</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">15. Contact Information</h2>
                <p className="mb-3">If you have questions or wish to exercise your privacy rights, please contact us at:</p>
                <p className="mb-1">📧 <a href="mailto:privacy@pulsenow.app" className="text-[#38D1BF] hover:underline">privacy@pulsenow.app</a></p>
                <p className="mb-6">📍 Pulse, 100 Fore Street, Portland, Maine 04101, USA</p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">16. Jurisdiction and Compliance</h2>
                <p className="mb-0">This Policy is governed by the laws of the State of Maine (United States) and, where applicable, the General Data Protection Regulation (EU 2016/679) and UK GDPR. Pulse complies with international privacy frameworks including GDPR, CCPA/CPRA, and CAN-SPAM regulations.</p>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;


