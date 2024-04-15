import Button from "@/app/atom/button";
import ui from "./styles.module.scss";
import LandingItems from "@/app/structure/landingItem";

export default function Home() {
  return (
    <>
      <section className={ui.landingPage}>
        <div className={ui.cardLandingPage}>
          <h2>Corte de caballero</h2>
          <p>
            Transforma tu estilo con cortes de cabello para hombres que reflejan
            tu personalidad única
          </p>
          <Button theme="primary">Reservar cita</Button>
        </div>
      </section>

      <section className={ui.prosContainer}>
        <ul className={ui.pros}>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                clipRule="evenodd"
              />
            </svg>
            Experiencia en estilos unisex para que te sientas satisfecho.
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z"
                clipRule="evenodd"
              />
            </svg>
            Productos y servicios de alta calidad para resultados excepcionales.
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
            Atención personalizada para necesidades únicas
          </li>
        </ul>
      </section>

      <section>
        <LandingItems
          item={[
            {
              description:
                "Un corte de longitud media que generalmente alcanza la mandíbula o el mentón. Puede ser recto o con capas.",
              title: "Corte Bob",
              price: 150,
              image:
                "https://imagenes.20minutos.es/files/image_640_auto/uploads/imagenes/2023/05/24/bob-invertido.jpeg",
            },
            {
              description:
                "El secreto mejor guardado para una depilación impecable  ofrece resultados duraderos y una piel suave.",
              title: "Cera española",
              price: 250,
              image:
                "https://lapanzaesprimero.com.mx/wp-content/uploads/2024/02/Cera-Frutos-Rojos-110-g.jpg",
            },
          ]}
        />
      </section>
    </>
  );
}
