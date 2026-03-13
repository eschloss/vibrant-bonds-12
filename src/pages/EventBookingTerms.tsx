import React, { useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/hooks/useSeo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Shield } from "lucide-react";

const LAST_UPDATED = {
  en: "March 13, 2026",
  es: "13 de marzo de 2026",
} as const;

const GOVERNING_STATE = "[STATE - TODO]";

const BOOKING_TERMS_HTML = {
  en: `
    <p><strong>Last updated:</strong> ${LAST_UPDATED.en}</p>
    <p>These Terms &amp; Conditions ("Terms") govern your purchase of event tickets and use of the Pulse platform and social coordination features.</p>
    <p>By booking an event through Pulse, you agree to these Terms.</p>

    <h2>1. About Pulse</h2>
    <p>Pulse is a platform that helps people attend events and meet new people through coordinated group experiences.</p>
    <p>When you book an event through Pulse, you purchase a bundled experience that may include:</p>
    <ul>
      <li>an event ticket sourced from a third-party event provider</li>
      <li>access to Pulse's social coordination features, which may include group matching, messaging, and event coordination tools</li>
    </ul>
    <p>Pulse may act as a reseller or intermediary when sourcing event tickets from third-party providers.</p>
    <p>Pulse does not organize, operate, host, or control events.</p>
    <p>All events listed on Pulse are organized and operated by independent third-party providers, such as venues, promoters, and ticket marketplaces.</p>
    <p>Users must be at least 18 years old to book events or use Pulse social features.</p>
    <p>Use of the Pulse platform is also governed by our Privacy Policy, which explains how we collect, use, and protect user data.</p>

    <h2>2. Event Providers</h2>
    <p>Each event available through Pulse is operated by an independent event provider.</p>
    <p>Event providers are responsible for:</p>
    <ul>
      <li>organizing and delivering the event</li>
      <li>setting participation requirements</li>
      <li>venue operations and safety</li>
      <li>event scheduling and logistics</li>
    </ul>
    <p>Pulse is not the event organizer or event operator.</p>
    <p>Your attendance at an event is also subject to the event provider's own terms and policies, which may be displayed or linked during booking.</p>

    <h2>3. Pulse Social Experience</h2>
    <p>Pulse provides a social coordination service designed to help attendees connect with others who are attending the same event.</p>
    <p>Pulse features may include:</p>
    <ul>
      <li>group matching</li>
      <li>private group chats</li>
      <li>coordination tools for meeting before or after events</li>
    </ul>
    <p>Pulse does not guarantee:</p>
    <ul>
      <li>that a group will form</li>
      <li>that attendees will communicate</li>
      <li>that attendees will meet before or after the event</li>
      <li>any particular social outcome</li>
    </ul>
    <p>Pulse's responsibility is limited to providing the platform features described above.</p>
    <p>Pulse does not guarantee that platform features, including group chats or messaging tools, will always be available or error-free.</p>

    <h2>4. Pricing and Payment</h2>
    <p>The total price shown at checkout includes:</p>
    <ul>
      <li>the event ticket price</li>
      <li>the Pulse service fee</li>
    </ul>
    <p>The price breakdown is displayed before purchase.</p>
    <p>Payments are processed at the time of booking unless otherwise stated.</p>
    <p>Payments may be processed by third-party payment providers and are subject to their respective terms and policies.</p>
    <p>In some cases, the ticket price included in the bundled experience may differ from the original face value of the ticket.</p>

    <h2>5. Booking Confirmation and Ticket Delivery</h2>
    <p>After completing your purchase, you will receive:</p>
    <ul>
      <li>a booking confirmation</li>
      <li>your event ticket or voucher</li>
      <li>access to the Pulse group chat if a group is created</li>
    </ul>
    <p>Event tickets may be issued directly by the event provider, a ticketing platform, or by Pulse depending on the event.</p>
    <p>You are responsible for reviewing your booking confirmation and ensuring the details are correct.</p>

    <h2>6. Group Formation</h2>
    <p>Pulse may attempt to match attendees into small groups for a particular event.</p>
    <p>If enough participants book the same event, Pulse may create a group chat where participants can coordinate meeting.</p>
    <p>If not enough participants book to form a group, the following applies:</p>
    <ul>
      <li>the Pulse service fee will be refunded</li>
      <li>your event ticket remains valid</li>
    </ul>
    <p>Refunds for the Pulse service fee are typically processed within 7 business days.</p>

    <h2>7. Refunds and Ticket Validity</h2>
    <p>All bookings are final.</p>
    <p>Pulse does not provide refunds, exchanges, or booking modifications after purchase except in the following situations.</p>
    <p><strong>Group Not Formed</strong></p>
    <p>If Pulse cannot form a group, the Pulse service fee will be refunded.</p>
    <p><strong>Event Cancelled by Provider</strong></p>
    <p>If the event provider cancels the event, refunds are governed by the provider's policies.</p>
    <p>Pulse may assist in communicating refund information but is not responsible for provider decisions.</p>
    <p><strong>Ticket Validity</strong></p>
    <p>Pulse sources tickets from third-party providers and marketplaces. While Pulse makes reasonable efforts to ensure ticket validity, entry to an event is ultimately determined by the event provider and venue.</p>
    <p>If a ticket purchased through Pulse is determined to be invalid at the venue due to an error by the ticket provider, Pulse may assist in facilitating a refund or replacement in accordance with applicable ticketing laws and the provider's policies.</p>
    <p><strong>Legal Requirements</strong></p>
    <p>Refunds may be provided where required by applicable law.</p>

    <h2>8. Event Changes</h2>
    <p>Event providers may change event details including:</p>
    <ul>
      <li>event time</li>
      <li>event location</li>
      <li>performers or program</li>
      <li>event format</li>
    </ul>
    <p>Event providers may also cancel or reschedule events.</p>
    <p>If Pulse receives notice of changes, we will attempt to notify you using the contact details you provided.</p>
    <p>Pulse is not responsible for provider decisions or changes to events.</p>

    <h2>9. Attending Events</h2>
    <p>You are responsible for:</p>
    <ul>
      <li>arriving on time</li>
      <li>complying with venue rules and event requirements</li>
      <li>meeting any age or participation requirements</li>
    </ul>
    <p>Failure to attend an event does not entitle you to a refund.</p>

    <h2>10. Behavior and Community Guidelines</h2>
    <p>Pulse is designed to create positive social experiences.</p>
    <p>By participating in Pulse groups you agree to:</p>
    <ul>
      <li>treat other participants with respect</li>
      <li>avoid harassment, discrimination, or abusive behavior</li>
      <li>comply with applicable laws</li>
    </ul>
    <p>Pulse may remove users from group chats, coordination spaces, events, or the platform entirely if these guidelines are violated.</p>
    <p>Removal from a group or platform does not entitle you to a refund.</p>
    <p>By sharing content through Pulse features, you grant Pulse a limited license to host, display, and process that content as necessary to operate the platform.</p>
    <p>Pulse reserves the right, but not the obligation, to monitor, review, remove, or restrict user-generated content that violates these Terms or applicable laws.</p>

    <h2>11. Interactions with Other Attendees</h2>
    <p>Pulse does not supervise or control interactions between users.</p>
    <p>You are solely responsible for your interactions with other attendees.</p>
    <p>Pulse does not conduct background checks on users and makes no representations regarding the safety, identity, or conduct of any participant.</p>
    <p>Pulse is not responsible for the actions, conduct, or behavior of other users.</p>

    <h2>12. Risks and Assumption of Responsibility</h2>
    <p>By attending events or meeting other users through Pulse, you acknowledge that interacting with people you do not previously know involves inherent risks.</p>
    <p>You voluntarily assume all risks associated with attending events, meeting other attendees, and participating in group activities, including risks of personal injury, illness, communicable diseases, or other harm.</p>

    <h2>13. Limitation of Liability</h2>
    <p>To the maximum extent permitted by law:</p>
    <p>Pulse provides its platform and services on an "as-is" and "as-available" basis.</p>
    <p>Pulse makes no warranties regarding the quality, safety, legality, or suitability of events.</p>
    <p>Pulse is not responsible for the organization, operation, safety, or quality of events.</p>
    <p>Pulse is not liable for the actions of event providers, venues, or other attendees.</p>
    <p>Pulse will not be liable for indirect, incidental, consequential, or special damages, including travel costs, lost profits, or personal losses.</p>
    <p>Pulse's total liability related to any booking will not exceed the greater of:</p>
    <ul>
      <li>(a) the Pulse service fee paid for that booking</li>
      <li>(b) $100</li>
    </ul>

    <h2>14. Release of Claims</h2>
    <p>To the fullest extent permitted by law, you release and hold harmless Pulse from any claims, damages, or losses arising from:</p>
    <ul>
      <li>the event itself</li>
      <li>actions or omissions of event providers</li>
      <li>actions or behavior of other attendees</li>
    </ul>
    <p>Any claims relating to the event must be directed to the event provider.</p>

    <h2>15. Indemnification</h2>
    <p>You agree to indemnify, defend, and hold harmless Pulse and its affiliates, employees, partners, and service providers from any claims, damages, liabilities, losses, or expenses arising from:</p>
    <ul>
      <li>your participation in events</li>
      <li>your interactions with other users</li>
      <li>your violation of these Terms or applicable law</li>
    </ul>

    <h2>16. Platform Use and Fraud Prevention</h2>
    <p>You agree not to:</p>
    <ul>
      <li>misuse the Pulse platform</li>
      <li>create fraudulent bookings</li>
      <li>attempt to manipulate group matching systems</li>
    </ul>
    <p>Pulse reserves the right to cancel bookings, suspend accounts, or refuse service where fraud, abuse, or violation of these Terms is suspected.</p>
    <p>Pulse may also recover costs, fees, or losses incurred due to fraudulent payments, chargebacks, or misuse of the platform.</p>
    <p>You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.</p>
    <p>Pulse is not liable for losses resulting from unauthorized use of your account.</p>

    <h2>17. Intellectual Property</h2>
    <p>All content, branding, software, and technology used on the Pulse platform are owned by Pulse or its licensors and are protected by intellectual property laws.</p>
    <p>You may not reproduce, copy, distribute, or exploit any part of the platform without permission.</p>

    <h2>18. Force Majeure</h2>
    <p>Pulse is not responsible for delays, cancellations, or service failures caused by circumstances beyond our reasonable control, including but not limited to natural disasters, government actions, strikes, pandemics, or network failures.</p>

    <h2>19. Dispute Resolution and Arbitration</h2>
    <p>These Terms are governed by the laws of the State of ${GOVERNING_STATE}, United States.</p>
    <p>Any dispute arising from these Terms or your use of the Pulse platform will be resolved through binding arbitration administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules.</p>
    <p>Arbitration will take place in the State of ${GOVERNING_STATE}, unless otherwise required by law.</p>
    <p>You may opt out of this arbitration agreement by notifying Pulse in writing within 30 days of accepting these Terms.</p>
    <p>Users waive the right to participate in class actions or collective proceedings.</p>

    <h2>20. Severability</h2>
    <p>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.</p>

    <h2>21. Entire Agreement</h2>
    <p>These Terms constitute the entire agreement between you and Pulse regarding event bookings and use of the Pulse platform.</p>

    <h2>22. Changes to These Terms</h2>
    <p>Pulse may update these Terms from time to time.</p>
    <p>Updated Terms will apply to future bookings and will be posted on the Pulse platform.</p>

    <h2>23. Contact</h2>
    <p>If you have questions regarding these Terms or your booking, please contact:</p>
    <p><a href="mailto:support@pulsenow.app">support@pulsenow.app</a></p>
  `,
  es: `
    <h2>Condiciones de Reserva de Eventos de Pulse</h2>
    <p><em>(Pulse Event Booking Terms &amp; Conditions)</em></p>
    <p><strong>Última actualización:</strong> ${LAST_UPDATED.es}</p>
    <p>Estas Condiciones ("Condiciones") rigen la compra de entradas para eventos y el uso de la plataforma Pulse y sus funciones de coordinación social.</p>
    <p>Al reservar un evento a través de Pulse, aceptas estas Condiciones.</p>

    <h2>1. Sobre Pulse</h2>
    <p><em>(About Pulse)</em></p>
    <p>Pulse es una plataforma que ayuda a las personas a asistir a eventos y conocer gente nueva mediante experiencias grupales coordinadas.</p>
    <p>Cuando reservas un evento a través de Pulse, compras una experiencia combinada que puede incluir:</p>
    <ul>
      <li>una entrada para un evento obtenida de un proveedor de eventos externo</li>
      <li>acceso a las funciones de coordinación social de Pulse, que pueden incluir emparejamiento de grupos, mensajería y herramientas de coordinación para eventos</li>
    </ul>
    <p>Pulse puede actuar como revendedor o intermediario al obtener entradas de proveedores de eventos externos.</p>
    <p>Pulse no organiza, opera, hospeda ni controla eventos.</p>
    <p>Todos los eventos listados en Pulse son organizados y operados por proveedores externos independientes, como recintos, promotores y mercados de venta de entradas.</p>
    <p>Los usuarios deben tener al menos 18 años para reservar eventos o utilizar las funciones sociales de Pulse.</p>
    <p>El uso de la plataforma Pulse también se rige por nuestra Política de Privacidad, que explica cómo recopilamos, utilizamos y protegemos los datos de los usuarios.</p>

    <h2>2. Proveedores de Eventos</h2>
    <p><em>(Event Providers)</em></p>
    <p>Cada evento disponible a través de Pulse es operado por un proveedor de eventos independiente.</p>
    <p>Los proveedores de eventos son responsables de:</p>
    <ul>
      <li>organizar y llevar a cabo el evento</li>
      <li>establecer los requisitos de participación</li>
      <li>las operaciones y seguridad del recinto</li>
      <li>la programación y logística del evento</li>
    </ul>
    <p>Pulse no es el organizador ni operador del evento.</p>
    <p>Tu asistencia a un evento también está sujeta a los propios términos y políticas del proveedor del evento, que pueden mostrarse o enlazarse durante el proceso de reserva.</p>

    <h2>3. Experiencia Social de Pulse</h2>
    <p><em>(Pulse Social Experience)</em></p>
    <p>Pulse proporciona un servicio de coordinación social diseñado para ayudar a los asistentes a conectar con otras personas que asistirán al mismo evento.</p>
    <p>Las funciones de Pulse pueden incluir:</p>
    <ul>
      <li>emparejamiento de grupos</li>
      <li>chats privados de grupo</li>
      <li>herramientas de coordinación para reunirse antes o después de los eventos</li>
    </ul>
    <p>Pulse no garantiza:</p>
    <ul>
      <li>que se forme un grupo</li>
      <li>que los asistentes se comuniquen</li>
      <li>que los asistentes se reúnan antes o después del evento</li>
      <li>ningún resultado social específico</li>
    </ul>
    <p>La responsabilidad de Pulse se limita a proporcionar las funciones de la plataforma descritas anteriormente.</p>
    <p>Pulse no garantiza que las funciones de la plataforma, incluidos los chats de grupo o herramientas de mensajería, estén siempre disponibles o libres de errores.</p>

    <h2>4. Precios y Pagos</h2>
    <p><em>(Pricing and Payment)</em></p>
    <p>El precio total mostrado durante el proceso de pago incluye:</p>
    <ul>
      <li>el precio de la entrada del evento</li>
      <li>la tarifa de servicio de Pulse</li>
    </ul>
    <p>El desglose del precio se muestra antes de la compra.</p>
    <p>Los pagos se procesan en el momento de la reserva, salvo que se indique lo contrario.</p>
    <p>Los pagos pueden ser procesados por proveedores de pago externos y están sujetos a sus respectivos términos y políticas.</p>
    <p>En algunos casos, el precio de la entrada incluido en la experiencia combinada puede diferir del valor nominal original de la entrada.</p>

    <h2>5. Confirmación de Reserva y Entrega de Entradas</h2>
    <p><em>(Booking Confirmation and Ticket Delivery)</em></p>
    <p>Después de completar tu compra, recibirás:</p>
    <ul>
      <li>una confirmación de reserva</li>
      <li>tu entrada o vale para el evento</li>
      <li>acceso al chat grupal de Pulse si se crea un grupo</li>
    </ul>
    <p>Las entradas para eventos pueden ser emitidas directamente por el proveedor del evento, una plataforma de venta de entradas o por Pulse, dependiendo del evento.</p>
    <p>Eres responsable de revisar la confirmación de tu reserva y asegurarte de que los detalles sean correctos.</p>

    <h2>6. Formación de Grupos</h2>
    <p><em>(Group Formation)</em></p>
    <p>Pulse puede intentar emparejar asistentes en pequeños grupos para un evento en particular.</p>
    <p>Si suficientes participantes reservan el mismo evento, Pulse puede crear un chat grupal donde los participantes puedan coordinar un encuentro.</p>
    <p>Si no hay suficientes participantes para formar un grupo, se aplicará lo siguiente:</p>
    <ul>
      <li>la tarifa de servicio de Pulse será reembolsada</li>
      <li>tu entrada para el evento seguirá siendo válida</li>
    </ul>
    <p>Los reembolsos de la tarifa de servicio de Pulse normalmente se procesan dentro de los 7 días hábiles.</p>

    <h2>7. Reembolsos y Validez de Entradas</h2>
    <p><em>(Refunds and Ticket Validity)</em></p>
    <p>Todas las reservas son definitivas.</p>
    <p>Pulse no proporciona reembolsos, cambios ni modificaciones de reserva después de la compra, excepto en las siguientes situaciones.</p>
    <p><strong>Grupo No Formado</strong></p>
    <p>Si Pulse no puede formar un grupo, se reembolsará la tarifa de servicio de Pulse.</p>
    <p><strong>Evento Cancelado por el Proveedor</strong></p>
    <p>Si el proveedor del evento cancela el evento, los reembolsos se regirán por las políticas del proveedor.</p>
    <p>Pulse puede ayudar a comunicar la información sobre reembolsos, pero no es responsable de las decisiones del proveedor.</p>
    <p><strong>Validez de Entradas</strong></p>
    <p>Pulse obtiene entradas de proveedores y mercados de venta de entradas de terceros. Aunque Pulse realiza esfuerzos razonables para asegurar la validez de las entradas, el acceso a un evento es determinado en última instancia por el proveedor del evento y el recinto.</p>
    <p>Si una entrada comprada a través de Pulse se determina como inválida en el recinto debido a un error del proveedor de entradas, Pulse puede ayudar a facilitar un reembolso o reemplazo de acuerdo con las leyes de venta de entradas aplicables y las políticas del proveedor.</p>
    <p><strong>Requisitos Legales</strong></p>
    <p>Los reembolsos pueden proporcionarse cuando lo exija la ley aplicable.</p>

    <h2>8. Cambios en los Eventos</h2>
    <p><em>(Event Changes)</em></p>
    <p>Los proveedores de eventos pueden cambiar detalles del evento incluyendo:</p>
    <ul>
      <li>la hora del evento</li>
      <li>la ubicación del evento</li>
      <li>los artistas o programa</li>
      <li>el formato del evento</li>
    </ul>
    <p>Los proveedores también pueden cancelar o reprogramar eventos.</p>
    <p>Si Pulse recibe aviso de cambios, intentaremos notificarte utilizando los datos de contacto que proporcionaste.</p>
    <p>Pulse no es responsable de las decisiones del proveedor ni de los cambios en los eventos.</p>

    <h2>9. Asistencia a Eventos</h2>
    <p><em>(Attending Events)</em></p>
    <p>Eres responsable de:</p>
    <ul>
      <li>llegar a tiempo</li>
      <li>cumplir con las normas del recinto y los requisitos del evento</li>
      <li>cumplir con cualquier requisito de edad o participación</li>
    </ul>
    <p>No asistir a un evento no da derecho a reembolso.</p>

    <h2>10. Comportamiento y Normas de la Comunidad</h2>
    <p><em>(Behavior and Community Guidelines)</em></p>
    <p>Pulse está diseñado para crear experiencias sociales positivas.</p>
    <p>Al participar en grupos de Pulse aceptas:</p>
    <ul>
      <li>tratar a otros participantes con respeto</li>
      <li>evitar el acoso, la discriminación o el comportamiento abusivo</li>
      <li>cumplir con las leyes aplicables</li>
    </ul>
    <p>Pulse puede eliminar usuarios de chats grupales, espacios de coordinación, eventos o de la plataforma en su totalidad si se violan estas normas.</p>
    <p>La eliminación de un grupo o de la plataforma no da derecho a reembolso.</p>
    <p>Al compartir contenido a través de las funciones de Pulse, otorgas a Pulse una licencia limitada para alojar, mostrar y procesar dicho contenido según sea necesario para operar la plataforma.</p>
    <p>Pulse se reserva el derecho, pero no la obligación, de monitorear, revisar, eliminar o restringir contenido generado por usuarios que viole estas Condiciones o las leyes aplicables.</p>

    <h2>11. Interacciones con Otros Asistentes</h2>
    <p><em>(Interactions with Other Attendees)</em></p>
    <p>Pulse no supervisa ni controla las interacciones entre usuarios.</p>
    <p>Eres el único responsable de tus interacciones con otros asistentes.</p>
    <p>Pulse no realiza verificaciones de antecedentes de los usuarios y no hace representaciones sobre la seguridad, identidad o conducta de ningún participante.</p>
    <p>Pulse no es responsable de las acciones o el comportamiento de otros usuarios.</p>

    <h2>12. Riesgos y Asunción de Responsabilidad</h2>
    <p><em>(Risks and Assumption of Responsibility)</em></p>
    <p>Al asistir a eventos o reunirte con otros usuarios a través de Pulse, reconoces que interactuar con personas que no conoces previamente implica riesgos inherentes.</p>
    <p>Asumes voluntariamente todos los riesgos asociados con asistir a eventos, reunirte con otros asistentes y participar en actividades grupales, incluidos riesgos de lesiones personales, enfermedad, enfermedades contagiosas u otros daños.</p>

    <h2>13. Limitación de Responsabilidad</h2>
    <p><em>(Limitation of Liability)</em></p>
    <p>En la máxima medida permitida por la ley:</p>
    <p>Pulse proporciona su plataforma y servicios "tal cual" y "según disponibilidad".</p>
    <p>Pulse no ofrece garantías respecto a la calidad, seguridad, legalidad o idoneidad de los eventos.</p>
    <p>Pulse no es responsable de la organización, operación, seguridad o calidad de los eventos.</p>
    <p>Pulse no es responsable de las acciones de proveedores de eventos, recintos u otros asistentes.</p>
    <p>Pulse no será responsable de daños indirectos, incidentales, consecuentes o especiales, incluidos costos de viaje, pérdida de beneficios o pérdidas personales.</p>
    <p>La responsabilidad total de Pulse relacionada con cualquier reserva no excederá el mayor de:</p>
    <ul>
      <li>(a) la tarifa de servicio de Pulse pagada por esa reserva</li>
      <li>(b) $100</li>
    </ul>

    <h2>14. Renuncia de Reclamaciones</h2>
    <p><em>(Release of Claims)</em></p>
    <p>En la máxima medida permitida por la ley, liberas y mantienes indemne a Pulse de cualquier reclamación, daño o pérdida derivada de:</p>
    <ul>
      <li>el evento en sí</li>
      <li>acciones u omisiones de proveedores de eventos</li>
      <li>acciones o comportamiento de otros asistentes</li>
    </ul>
    <p>Cualquier reclamación relacionada con el evento debe dirigirse al proveedor del evento.</p>

    <h2>15. Indemnización</h2>
    <p><em>(Indemnification)</em></p>
    <p>Aceptas indemnizar, defender y mantener indemne a Pulse y a sus afiliados, empleados, socios y proveedores de servicios frente a cualquier reclamación, daño, responsabilidad, pérdida o gasto derivado de:</p>
    <ul>
      <li>tu participación en eventos</li>
      <li>tus interacciones con otros usuarios</li>
      <li>tu violación de estas Condiciones o de la ley aplicable</li>
    </ul>

    <h2>16. Uso de la Plataforma y Prevención de Fraude</h2>
    <p><em>(Platform Use and Fraud Prevention)</em></p>
    <p>Aceptas no:</p>
    <ul>
      <li>hacer un uso indebido de la plataforma Pulse</li>
      <li>crear reservas fraudulentas</li>
      <li>intentar manipular los sistemas de emparejamiento de grupos</li>
    </ul>
    <p>Pulse se reserva el derecho de cancelar reservas, suspender cuentas o rechazar el servicio cuando se sospeche fraude, abuso o violación de estas Condiciones.</p>
    <p>Pulse también puede recuperar costos, tarifas o pérdidas derivadas de pagos fraudulentos, devoluciones de cargos o uso indebido de la plataforma.</p>
    <p>Eres responsable de mantener la confidencialidad de tu cuenta y de todas las actividades que ocurran bajo tu cuenta.</p>
    <p>Pulse no es responsable de pérdidas resultantes del uso no autorizado de tu cuenta.</p>

    <h2>17. Propiedad Intelectual</h2>
    <p><em>(Intellectual Property)</em></p>
    <p>Todo el contenido, marca, software y tecnología utilizados en la plataforma Pulse son propiedad de Pulse o de sus licenciantes y están protegidos por leyes de propiedad intelectual.</p>
    <p>No puedes reproducir, copiar, distribuir ni explotar ninguna parte de la plataforma sin permiso.</p>

    <h2>18. Fuerza Mayor</h2>
    <p><em>(Force Majeure)</em></p>
    <p>Pulse no es responsable de retrasos, cancelaciones o fallos del servicio causados por circunstancias fuera de nuestro control razonable, incluyendo desastres naturales, acciones gubernamentales, huelgas, pandemias o fallos de red.</p>

    <h2>19. Resolución de Disputas y Arbitraje</h2>
    <p><em>(Dispute Resolution and Arbitration)</em></p>
    <p>Estas Condiciones se rigen por las leyes del Estado de ${GOVERNING_STATE}, Estados Unidos.</p>
    <p>Cualquier disputa que surja de estas Condiciones o del uso de la plataforma Pulse se resolverá mediante arbitraje vinculante administrado por la American Arbitration Association (AAA) bajo sus reglas de arbitraje para consumidores.</p>
    <p>El arbitraje tendrá lugar en el Estado de ${GOVERNING_STATE}, salvo que la ley aplicable requiera lo contrario.</p>
    <p>Puedes optar por excluirte de este acuerdo de arbitraje notificando por escrito a Pulse dentro de los 30 días posteriores a aceptar estas Condiciones.</p>
    <p>Los usuarios renuncian al derecho de participar en acciones colectivas o procedimientos colectivos.</p>

    <h2>20. Divisibilidad</h2>
    <p><em>(Severability)</em></p>
    <p>Si alguna disposición de estas Condiciones se considera inválida o inaplicable, las disposiciones restantes permanecerán en pleno vigor y efecto.</p>

    <h2>21. Acuerdo Completo</h2>
    <p><em>(Entire Agreement)</em></p>
    <p>Estas Condiciones constituyen el acuerdo completo entre tú y Pulse respecto a las reservas de eventos y el uso de la plataforma.</p>

    <h2>22. Cambios en Estas Condiciones</h2>
    <p><em>(Changes to These Terms)</em></p>
    <p>Pulse puede actualizar estas Condiciones ocasionalmente.</p>
    <p>Las Condiciones actualizadas se aplicarán a futuras reservas y se publicarán en la plataforma Pulse.</p>

    <h2>23. Contacto</h2>
    <p><em>(Contact)</em></p>
    <p>Si tienes preguntas sobre estas Condiciones o tu reserva, puedes contactar con:</p>
    <p><a href="mailto:support@pulsenow.app">support@pulsenow.app</a></p>
  `,
} as const;

const EventBookingTerms: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const isEs = currentLanguage === "es";

  const seoProps = {
    title: {
      en: "Event Booking Terms | Pulse",
      es: "Términos de Reserva de Eventos | Pulse",
    },
    description: {
      en: "Read the Pulse terms and conditions for event ticket purchases and the Pulse social booking experience.",
      es: "Lee los términos y condiciones de Pulse para la compra de entradas y la experiencia social de reserva.",
    },
    pathname: "/event-booking-terms",
    type: "website",
    section: "Legal",
  };

  const html = useMemo(() => (isEs ? BOOKING_TERMS_HTML.es : BOOKING_TERMS_HTML.en), [isEs]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Seo {...seoProps} />
      <Navbar />

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
              {t("legal.event_booking_terms.title", "Event Booking Terms")}
            </h1>
          </div>
        </div>
      </section>

      <section className="pb-20 relative">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-gray-700 p-6 md:p-10 leading-relaxed text-gray-200">
            <div
              className="prose prose-invert max-w-none text-gray-200 prose-headings:text-white prose-a:text-[#38D1BF] prose-a:no-underline prose-a:hover:underline prose-strong:text-white prose-li:marker:text-gray-400 prose-hr:border-gray-700"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventBookingTerms;
