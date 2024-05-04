import { useEffect, useState } from "react";
import { ReturnUseConfigureItem, StateUseAuthentication } from "./types";


const INITIAL_STATE: StateUseAuthentication = {
  page: 1,
  isLoading: true,
  
  authentication: [
    {
      urlPicture: "https://www.mnp.ca/-/media/foundation/integrations/personnel/2020/12/16/13/57/personnel-image-4483.jpg?h=800&w=600&hash=9D5E5FCBEE00EB562DCD8AC8FDA8433D",
      authentication: "Usuario", // Ejemplo de rol de usuario
      name: "José Luis",
    },
    {
      urlPicture: "https://waveplasticsurgery.com/wp-content/uploads/2022/03/HydroInMobile.jpg",
      authentication: "Administrador(a)", // Ejemplo de rol de administrador
      name: "Marisol Pérez ",
    },
    {
      urlPicture: "https://akm-img-a-in.tosshub.com/lingo/atbn/images/photo_gallery/202110/thumbnail_gettyimages-1190953384-170667a.jpg",
      authentication: "Usuario", // Ejemplo de rol de usuario
      name: "Miguel Ángel",
    },
  ],
};

export default function useAuthentication(): ReturnUseConfigureItem {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    setState((current) => ({
      ...current,
      isLoading: false,
    }));
  }, []);

  return {
    
    ...state,
    
  };
  
}
