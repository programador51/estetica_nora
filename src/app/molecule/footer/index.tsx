import ui from "./styles.module.scss";

export default function Footer() {
  return (
    <footer className={ui.footer}>
      <section className={ui.footerInfo}>
        <h2>Información</h2>
        <ul>
          <li className={ui.bulletInfo}>
            <span>Dirección</span>
            <span>
              Calle Francisco Zarco, Libertad #703 A, Independencia, 64720
              Monterrey, N.L.
            </span>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224.77040817236514!2d-100.32670137081452!3d25.660468349554336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662bf233f99cf1b%3A0xdeb37b1eeb54e844!2sPeluqueria%20Nora!5e0!3m2!1ses-419!2smx!4v1713497413216!5m2!1ses-419!2smx"
              
              height="300"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </li>
          <li className={ui.bulletInfo}>
            <span>Teléfono</span>
            <span>+52 81 2125 2746</span>
          </li>
        </ul>
      </section>

      <section className={ui.footerInfo}>
        <h2>Horario</h2>
        <ol>
          <li className={ui.bulletInfo}>
            <span>Lunes</span>
            <span>10:00am - 07:00pm</span>
          </li>
          <li className={ui.bulletInfo}>
            <span>Martes</span>
            <span>10:00am - 07:00pm</span>
          </li>
          <li className={ui.bulletInfo}>
            <span>Miércoles</span>
            <span>10:00am - 07:00pm</span>
          </li>
          <li className={ui.bulletInfo}>
            <span>Jueves</span>
            <span>10:00am - 07:00pm</span>
          </li>
          <li className={ui.bulletInfo}>
            <span>Viernes</span>
            <span>10:00am - 07:00pm</span>
          </li>
          <li className={ui.bulletInfo}>
            <span>Sábado</span>
            <span>10:00am - 07:00pm</span>
          </li>
          <li className={ui.bulletInfo}>
            <span>Domingo</span>
            <span>10:00am - 07:00pm</span>
          </li>
        </ol>
      </section>

      <p>© 2024 Estética Nora, Todos los Derechos Reservados.</p>
    </footer>
  );
}
