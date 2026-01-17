import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/hooks/useSeo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Shield } from "lucide-react";

const CommunityGuidelines: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isEs = currentLanguage === "es";

  const seoProps = {
    title: {
      en: "Community Guidelines | Pulse",
      es: "Normas de la Comunidad | Pulse",
    },
    description: {
      en: "Read Pulse Community Guidelines, acceptable use policy, and user safety guidelines.",
      es: "Lee las normas de la comunidad de Pulse, la política de uso aceptable y las pautas de seguridad.",
    },
    pathname: "/community-guidelines",
    type: "website",
    section: "Legal",
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
              {t("legal.community_guidelines.title", "Community Guidelines")}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 relative">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-gray-700 p-6 md:p-10 leading-relaxed text-gray-200">
            <div className="prose prose-invert max-w-none text-gray-200 prose-headings:text-white prose-a:text-[#38D1BF] prose-a:no-underline prose-a:hover:underline prose-strong:text-white prose-li:marker:text-gray-400 prose-hr:border-gray-700">
              {isEs ? (
                <>
                  <h2>Normas de la Comunidad Pulse</h2>
                  <p>
                    <strong>Política de Uso Aceptable y Directrices de Seguridad</strong>
                  </p>
                  <p>
                    <strong>Fecha de entrada en vigor:</strong> 30 de diciembre de 2025
                    <br />
                    <strong>Versión:</strong> 1.2
                  </p>
                  <p>
                    Esta Política de Uso Aceptable explica qué está permitido y qué no lo está en Pulse. Su finalidad es
                    ayudar a mantener Pulse como un entorno seguro, respetuoso y fiable para todas las personas
                    usuarias.
                  </p>
                  <p>
                    Al utilizar Pulse, aceptas cumplir esta política, además de nuestros Términos y Condiciones y nuestra
                    Política de Privacidad.
                  </p>

                  <h3>1. Quién puede utilizar Pulse</h3>
                  <h4>Requisito de edad mínima</h4>
                  <p>Pulse es una plataforma exclusivamente para personas adultas.</p>
                  <p>
                    Debes tener al menos 18 años, o la mayoría de edad legal en tu país si esta es superior, para utilizar
                    Pulse.
                  </p>
                  <p>
                    Durante el proceso de registro, las personas usuarias deben confirmar su fecha de nacimiento. No está
                    permitido falsear la edad.
                  </p>
                  <p>
                    Las cuentas que se sospeche que pertenecen a menores de edad, o que hayan proporcionado información
                    falsa sobre la edad, podrán ser suspendidas de forma preventiva para su revisión o eliminadas de
                    manera permanente.
                  </p>
                  <h4>Tolerancia cero respecto a menores de edad</h4>
                  <p>Los menores de edad no pueden utilizar Pulse bajo ninguna circunstancia.</p>
                  <p>
                    Está estrictamente prohibido cualquier contenido que involucre a menores de edad. Esto incluye
                    contenido sexual, romántico, explotador, sugerente o de rol relacionado con menores, ya sea de forma
                    explícita o implícita.
                  </p>
                  <p>
                    Cualquier intento de interactuar, solicitar contacto o involucrar a menores de edad dará lugar a la
                    cancelación inmediata de la cuenta y podrá ser comunicado a las autoridades competentes cuando así lo
                    exija la ley.
                  </p>

                  <h3>2. Qué es Pulse y qué no es</h3>
                  <p>
                    Pulse es una plataforma tecnológica que ayuda a personas adultas a descubrir oportunidades sociales en
                    grupo, comunicarse y coordinar conexiones sociales genuinas.
                  </p>
                  <p>Pulse no:</p>
                  <ul>
                    <li>Organiza, gestiona ni supervisa encuentros privados entre personas usuarias</li>
                    <li>Verifica la identidad ni realiza comprobaciones de antecedentes</li>
                    <li>Garantiza intenciones, compatibilidad ni resultados entre personas usuarias</li>
                    <li>Actúa como agencia de citas, servicio de acompañamiento ni plataforma de emparejamiento</li>
                    <li>Facilita pagos o transacciones económicas entre personas usuarias</li>
                  </ul>
                  <p>
                    Pulse realiza esfuerzos razonables y de buena fe para mantener un entorno seguro mediante el diseño del
                    producto, la moderación y la aplicación de normas. No obstante, cada persona usuaria es responsable
                    de su propio comportamiento, decisiones, límites y seguridad.
                  </p>

                  <h3>3. Principios de uso aceptable</h3>
                  <p>Pulse se basa en unas expectativas fundamentales:</p>
                  <ul>
                    <li>Tratar a las demás personas con respeto</li>
                    <li>Actuar de buena fe</li>
                    <li>Respetar el consentimiento y los límites personales</li>
                    <li>Utilizar la plataforma para una conexión social genuina</li>
                  </ul>
                  <p>
                    Cualquier uso que contradiga estos principios no está permitido, incluso si no se menciona expresamente
                    en otros apartados de esta política.
                  </p>

                  <h3>4. Contenido prohibido</h3>
                  <p>No está permitido publicar, enviar ni compartir contenido que incluya, promueva o facilite:</p>
                  <h4>Explotación y abuso sexual</h4>
                  <ul>
                    <li>Cualquier contenido sexual o romántico que involucre a menores de edad</li>
                    <li>Explotación o abuso sexual de cualquier tipo</li>
                    <li>Contenido sexual no consentido</li>
                    <li>Violencia sexual, coacción o amenazas</li>
                    <li>Contenido pornográfico o explícitamente sexual destinado a provocar excitación</li>
                    <li>
                      Solicitud de servicios sexuales o intimidad transaccional, incluyendo acompañamiento de pago o
                      relaciones de tipo “sugar dating”
                    </li>
                  </ul>
                  <p>
                    Se permite el coqueteo o la conversación romántica consensuada entre personas adultas. No se permite
                    el contenido sexual explícito ni la solicitud de actos sexuales.
                  </p>
                  <h4>Acoso y abuso</h4>
                  <ul>
                    <li>Amenazas, intimidación, acecho o comportamientos coercitivos</li>
                    <li>Acoso, hostigamiento o intimidación dirigida</li>
                    <li>Discurso de odio o conductas discriminatorias</li>
                    <li>Lenguaje degradante, humillante o deshumanizador</li>
                  </ul>
                  <h4>Fraude y engaño</h4>
                  <ul>
                    <li>Estafas, phishing o manipulación financiera</li>
                    <li>Estafas románticas o manipulación emocional con fines económicos</li>
                    <li>Oportunidades falsas o emergencias ficticias destinadas a obtener dinero</li>
                    <li>Suplantación de identidad o tergiversación con fines de engaño o explotación</li>
                  </ul>
                  <h4>Actividades ilegales o peligrosas</h4>
                  <ul>
                    <li>Promoción o facilitación de actividades ilegales</li>
                    <li>Venta o distribución de drogas ilegales</li>
                    <li>Incitación a la violencia o a la autolesión</li>
                    <li>Instrucciones o guías para cometer actos delictivos o perjudiciales</li>
                  </ul>
                  <h4>Vulneraciones de privacidad y seguridad</h4>
                  <ul>
                    <li>Compartir información privada o identificativa de terceros sin su consentimiento</li>
                    <li>Doxxing, chantaje o extorsión</li>
                    <li>Grabar, distribuir o amenazar con difundir interacciones privadas sin autorización</li>
                  </ul>

                  <h3>5. Comportamientos prohibidos</h3>
                  <p>No está permitido utilizar Pulse para:</p>
                  <ul>
                    <li>Acosar, presionar o coaccionar a otras personas para interactuar</li>
                    <li>Ignorar o vulnerar reiteradamente el consentimiento o los límites expresados</li>
                    <li>
                      Contactar de forma reiterada con personas que hayan rechazado la interacción, se hayan desvinculado
                      o hayan bloqueado el contacto
                    </li>
                    <li>Solicitar dinero, regalos, ayuda económica o beneficios materiales a otras personas usuarias</li>
                    <li>
                      Publicitar, captar o redirigir a personas usuarias hacia servicios externos con fines comerciales,
                      explotadores o inseguros
                    </li>
                    <li>Organizar, promover o participar en actividades inseguras, explotadoras o ilegales</li>
                  </ul>
                  <p>Las personas usuarias no pueden enviarse imágenes ni archivos multimedia entre sí en Pulse.</p>
                  <p>
                    Se permite compartir de forma casual perfiles de redes sociales o trasladar conversaciones fuera de la
                    plataforma para una conexión social genuina, siempre que no implique solicitud económica ni
                    explotación.
                  </p>

                  <h3>6. Pagos y conducta financiera</h3>
                  <p>Pulse no facilita pagos entre personas usuarias.</p>
                  <p>Los pagos en Pulse se limitan exclusivamente a servicios y funcionalidades operados por Pulse, incluyendo:</p>
                  <ul>
                    <li>Suscripciones premium</li>
                    <li>Acceso a un mayor número de coincidencias de grupos</li>
                    <li>Coincidencias de grupos basadas en aficiones o intereses específicos</li>
                    <li>
                      Funcionalidades adicionales como insignias, rompehielos personalizados u otras herramientas similares
                    </li>
                    <li>Acceso a eventos verificados por Pulse organizados por socios o espacios aprobados</li>
                  </ul>
                  <p>
                    Los pagos nunca se realizan por presentaciones, acceso a personas concretas, resultados románticos ni
                    interacciones interpersonales.
                  </p>
                  <p>
                    Cualquier intento de solicitar, intercambiar o insinuar pagos, bienes o servicios de naturaleza sexual,
                    romántica o explotadora está estrictamente prohibido y podrá dar lugar a la cancelación inmediata de la
                    cuenta.
                  </p>

                  <h3>7. Herramientas de reporte y seguridad</h3>
                  <p>Pulse proporciona herramientas que permiten a las personas usuarias:</p>
                  <ul>
                    <li>Bloquear a otras personas usuarias</li>
                    <li>Denunciar contenido o comportamientos inapropiados</li>
                  </ul>
                  <p>
                    Al enviar una denuncia, se solicita seleccionar un motivo para facilitar la identificación de posibles
                    usos indebidos.
                  </p>
                  <p>
                    Todas las denuncias son revisadas por el equipo de Pulse. Las denuncias relacionadas con menores de
                    edad, explotación sexual, solicitudes económicas, estafas o amenazas creíbles se priorizan para una
                    revisión inmediata.
                  </p>
                  <p>
                    Las cuentas que reciban múltiples denuncias podrán ser suspendidas temporalmente mientras se realiza
                    una revisión interna. Tras dicha revisión, Pulse podrá reactivar la cuenta o proceder a su eliminación
                    permanente.
                  </p>

                  <h3>8. Aplicación de la política</h3>
                  <p>Las infracciones de esta Política de Uso Aceptable pueden dar lugar a:</p>
                  <ul>
                    <li>Eliminación de contenido</li>
                    <li>Restricción de funcionalidades</li>
                    <li>Suspensión temporal de la cuenta</li>
                    <li>Cancelación permanente de la cuenta</li>
                  </ul>
                  <p>
                    Las infracciones graves, incluidas aquellas que involucren a menores de edad, explotación sexual,
                    fraude o amenazas creíbles de daño, podrán dar lugar a la cancelación inmediata de la cuenta sin previo
                    aviso.
                  </p>
                  <p>Las infracciones reiteradas pueden dar lugar a medidas de aplicación progresivas.</p>

                  <h3>9. Cooperación con las autoridades</h3>
                  <p>
                    Pulse podrá cooperar con solicitudes legales de tribunales, organismos reguladores o fuerzas de
                    seguridad, y podrá divulgar información cuando así lo exija la legislación aplicable.
                  </p>

                  <h3>10. Uso de buena fe</h3>
                  <p>
                    Cualquier comportamiento destinado a explotar, manipular, engañar, causar daño o socavar la seguridad,
                    la confianza o la integridad de la comunidad de Pulse está prohibido, incluso si no se menciona
                    expresamente en esta política.
                  </p>

                  <h3>11. Cambios en esta política</h3>
                  <p>
                    Pulse podrá actualizar esta Política de Uso Aceptable periódicamente. Los cambios sustanciales podrán
                    comunicarse a través de la aplicación, por correo electrónico o mediante otros medios razonables.
                  </p>
                  <p>
                    El uso continuado de Pulse tras la entrada en vigor de los cambios implica la aceptación de la política
                    actualizada.
                  </p>

                  <h3>12. Contacto</h3>
                  <p>Si tienes preguntas o dudas sobre esta política, puedes ponerte en contacto con nosotros en:</p>
                  <p>
                    <a href="mailto:legal@pulsenow.app">legal@pulsenow.app</a>
                  </p>
                </>
              ) : (
                <>
                  <h2>Pulse Community Guidelines</h2>
                  <p>
                    <strong>Acceptable Use Policy &amp; User Safety Guidelines</strong>
                  </p>
                  <p>
                    <strong>Effective date:</strong> 2025-12-30
                    <br />
                    <strong>Version:</strong> 1.2
                  </p>
                  <p>
                    This Acceptable Use Policy explains what is allowed and not allowed on Pulse. It exists to help keep
                    Pulse safe, respectful, and trustworthy for everyone.
                  </p>
                  <p>
                    By using Pulse, you agree to follow this policy in addition to our Terms and Conditions and Privacy
                    Policy.
                  </p>

                  <h3>1. Who Can Use Pulse</h3>
                  <h4>Minimum age requirement</h4>
                  <p>Pulse is for adults only.</p>
                  <p>
                    You must be at least 18 years old, or the age of majority in your country if higher, to use Pulse.
                  </p>
                  <p>During onboarding, users are required to confirm their date of birth. You may not misrepresent your age.</p>
                  <p>
                    Accounts suspected of belonging to minors, or accounts that provide false age information, may be
                    suspended pending review or permanently removed.
                  </p>
                  <h4>Zero tolerance regarding minors</h4>
                  <p>Minors are not allowed on Pulse under any circumstances.</p>
                  <p>
                    Content involving minors is strictly prohibited. This includes any sexual, romantic, exploitative,
                    suggestive, or roleplay related content involving minors, whether explicit or implied.
                  </p>
                  <p>
                    Any attempt to engage with, solicit, or involve minors will result in immediate account termination and
                    may be reported to law enforcement or relevant authorities where required by law.
                  </p>

                  <h3>2. What Pulse Is and Is Not</h3>
                  <p>
                    Pulse is a technology platform that helps adults discover group based social opportunities, communicate,
                    and coordinate genuine social connection.
                  </p>
                  <p>Pulse does not:</p>
                  <ul>
                    <li>Organize, host, or supervise private user meetups</li>
                    <li>Verify user identities or background check users</li>
                    <li>Guarantee user intentions, compatibility, or outcomes</li>
                    <li>Act as a dating agency, escort service, or matchmaking service</li>
                    <li>Facilitate payments or transactions between users</li>
                  </ul>
                  <p>
                    Pulse makes reasonable, good faith efforts to maintain a safe environment through product design,
                    moderation, and enforcement, but users remain responsible for their own behavior, decisions, boundaries,
                    and safety.
                  </p>

                  <h3>3. Acceptable Use Principles</h3>
                  <p>Pulse is built around a few simple expectations:</p>
                  <ul>
                    <li>Treat others with respect</li>
                    <li>Act in good faith</li>
                    <li>Respect consent and personal boundaries</li>
                    <li>Use the platform for genuine social connection</li>
                  </ul>
                  <p>
                    Any use that undermines these principles is not allowed, even if not explicitly listed elsewhere in this policy.
                  </p>

                  <h3>4. Prohibited Content</h3>
                  <p>You may not post, send, or share content that includes, promotes, or facilitates:</p>
                  <h4>Sexual exploitation and abuse</h4>
                  <ul>
                    <li>Any sexual or romantic content involving minors</li>
                    <li>Sexual exploitation or abuse of any kind</li>
                    <li>Non consensual sexual content</li>
                    <li>Sexual violence, coercion, or threats</li>
                    <li>Pornographic or explicitly sexual content intended to arouse</li>
                    <li>
                      Solicitation of sexual services or transactional intimacy, including escorting, paid companionship, or sugar dating
                    </li>
                  </ul>
                  <p>
                    Consensual flirting or romantic conversation between adults is allowed. Explicit sexual content or sexual solicitation is not.
                  </p>
                  <h4>Harassment and abuse</h4>
                  <ul>
                    <li>Threats, intimidation, stalking, or coercive behavior</li>
                    <li>Bullying or targeted harassment</li>
                    <li>Hate speech or discriminatory conduct</li>
                    <li>Degrading, humiliating, or dehumanizing language</li>
                  </ul>
                  <h4>Fraud and deception</h4>
                  <ul>
                    <li>Scams, phishing, or financial manipulation</li>
                    <li>Romance scams or emotional manipulation for financial gain</li>
                    <li>Fake opportunities or false emergencies intended to extract money</li>
                    <li>Impersonation or misrepresentation intended to deceive or exploit others</li>
                  </ul>
                  <h4>Illegal or dangerous activity</h4>
                  <ul>
                    <li>Promotion or facilitation of illegal activities</li>
                    <li>Sale or distribution of illegal drugs</li>
                    <li>Encouragement of violence or self harm</li>
                    <li>Instructions or guidance for criminal or harmful acts</li>
                  </ul>
                  <h4>Privacy and safety violations</h4>
                  <ul>
                    <li>Sharing another person’s private or identifying information without consent</li>
                    <li>Doxxing, blackmail, or extortion</li>
                    <li>Recording, distributing, or threatening to distribute private interactions without permission</li>
                  </ul>

                  <h3>5. Prohibited Behavior</h3>
                  <p>You may not use Pulse to:</p>
                  <ul>
                    <li>Harass, pressure, or coerce others into interactions</li>
                    <li>Ignore or repeatedly violate expressed consent or personal boundaries</li>
                    <li>Repeatedly contact users who have disengaged, declined interaction, or blocked you</li>
                    <li>Solicit money, gifts, financial assistance, or material benefits from other users</li>
                    <li>
                      Advertise, recruit, or redirect users to external services for commercial, exploitative, or unsafe purposes
                    </li>
                    <li>Organize, promote, or participate in unsafe, exploitative, or illegal activities</li>
                  </ul>
                  <p>Users cannot send images or media files to each other on Pulse.</p>
                  <p>
                    Casual sharing of social media handles or moving conversations off platform for genuine social connection is allowed, provided it does not involve solicitation or exploitation.
                  </p>

                  <h3>6. Payments and Financial Conduct</h3>
                  <p>Pulse does not facilitate payments between users.</p>
                  <p>Payments on Pulse are limited to Pulse operated services and features, including:</p>
                  <ul>
                    <li>Premium subscriptions</li>
                    <li>Additional group matching opportunities</li>
                    <li>Hobby focused group matching</li>
                    <li>Feature enhancements such as badges, custom icebreakers, or similar tools</li>
                    <li>Access to Pulse vetted events organized by approved partners or venues</li>
                  </ul>
                  <p>Payments are never for introductions, access to individuals, romantic outcomes, or interpersonal interactions.</p>
                  <p>
                    Any attempt to request, exchange, or imply payment, goods, or services of a sexual, romantic, or exploitative nature is strictly prohibited and may result in immediate account termination.
                  </p>

                  <h3>7. Reporting and Safety Tools</h3>
                  <p>Pulse provides tools that allow users to:</p>
                  <ul>
                    <li>Block other users</li>
                    <li>Report inappropriate content or behavior</li>
                  </ul>
                  <p>When submitting a report, users are asked to select a reason to help identify potential misuse.</p>
                  <p>
                    All reports are reviewed by the Pulse team. Reports involving minors, sexual exploitation, financial solicitation, scams, or credible threats are prioritized for immediate review.
                  </p>
                  <p>
                    Accounts that receive multiple reports may be temporarily suspended pending internal review. Pulse may unblock or permanently remove accounts based on review findings.
                  </p>

                  <h3>8. Enforcement</h3>
                  <p>Violations of this Acceptable Use Policy may result in:</p>
                  <ul>
                    <li>Content removal</li>
                    <li>Feature restrictions</li>
                    <li>Temporary account suspension</li>
                    <li>Permanent account termination</li>
                  </ul>
                  <p>
                    Severe violations, including those involving minors, sexual exploitation, fraud, or credible threats of harm, may result in immediate termination without prior warning.
                  </p>
                  <p>Repeated violations may escalate enforcement actions.</p>

                  <h3>9. Cooperation With Authorities</h3>
                  <p>
                    Pulse may cooperate with lawful requests from courts, regulators, or law enforcement agencies and may disclose information when legally required.
                  </p>

                  <h3>10. Good Faith Use</h3>
                  <p>
                    Any behavior intended to exploit, manipulate, deceive, harm, or undermine the safety, trust, or integrity of the Pulse community is prohibited, even if not explicitly listed in this policy.
                  </p>

                  <h3>11. Changes to This Policy</h3>
                  <p>
                    Pulse may update this Acceptable Use Policy from time to time. Material changes may be communicated through the app, by email, or by other reasonable means.
                  </p>
                  <p>Continued use of Pulse after changes take effect constitutes acceptance of the updated policy.</p>

                  <h3>12. Contact</h3>
                  <p>If you have questions or concerns about this policy, contact:</p>
                  <p>
                    <a href="mailto:legal@pulsenow.app">legal@pulsenow.app</a>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommunityGuidelines;

