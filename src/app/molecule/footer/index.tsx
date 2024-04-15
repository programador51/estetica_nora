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
