import { ServiceOption } from "@/app/molecule/servicesSelect/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const dbRecords: ServiceOption[] = [
        {
          name: "Corte de caballero",
          id: 1,
          picture: "https://www.primor.eu/blog/wp-content/uploads/2023/11/CORTE-PELO-HOMBRE-1.jpg",
          costPrice: 20,
          sellPrice: 70,
          durationOnMinutes: 15,
          toleranceOnMinutes: 5,
          susceptibleToChange: true
        },
        {
          name: "Corte Bob",
          id: 2,
          picture: "https://estiloybelleza.com/blog/wp-content/uploads/2021/08/longbob1.jpg",
          costPrice: 50,
          sellPrice: 200,
          durationOnMinutes: 30,
          toleranceOnMinutes: 5,
          susceptibleToChange: true
        },
        {
          name: "Decolorado de cabello rubio",
          id: 3,
          picture: "https://resizer.sevilla.abc.es/resizer/resizer.php?imagen=https://sevilla.abc.es/estilo/bulevarsur/wp-content/uploads/sites/14/2022/01/productos-cuidar-rubio-platino-casa.jpg&nuevoancho=652",
          costPrice: 15,
          sellPrice: 25,
          durationOnMinutes: 90,
          toleranceOnMinutes: 10,
          susceptibleToChange: true
        },
        {
          name: "Retoque corte de caballero",
          id: 4,
          picture: "https://www.primor.eu/blog/wp-content/uploads/2023/11/CORTE-PELO-HOMBRE-1.jpg",
          costPrice: 20,
          sellPrice: 70,
          durationOnMinutes: 10,
          toleranceOnMinutes: 5,
          susceptibleToChange: true
        }
      ];
      

  try {
    return NextResponse.json(dbRecords,{
      status:200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json([]);
  }
}
