import { ServiceOption } from "@/app/molecule/servicesSelect/types";
import { UserOption } from "@/app/molecule/usersSelect/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const dbRecords: ServiceOption[] = [
        {
          name: "Haircut",
          id: 1,
          picture: "https://example.com/haircut.jpg",
          costPrice: 20,
          sellPrice: 30,
          durationOnMinutes: 30,
          toleranceOnMinutes: 5,
          susceptibleToChange: true
        },
        {
          name: "Massage",
          id: 2,
          picture: "https://example.com/massage.jpg",
          costPrice: 40,
          sellPrice: 60,
          durationOnMinutes: 60,
          toleranceOnMinutes: 10,
          susceptibleToChange: true
        },
        {
          name: "Manicure",
          id: 3,
          picture: "https://example.com/manicure.jpg",
          costPrice: 15,
          sellPrice: 25,
          durationOnMinutes: 45,
          toleranceOnMinutes: 5,
          susceptibleToChange: true
        },
        {
          name: "Pedicure",
          id: 4,
          picture: "https://example.com/pedicure.jpg",
          costPrice: 20,
          sellPrice: 35,
          durationOnMinutes: 60,
          toleranceOnMinutes: 5,
          susceptibleToChange: true
        },
        {
          name: "Facial",
          id: 5,
          picture: "https://example.com/facial.jpg",
          costPrice: 50,
          sellPrice: 80,
          durationOnMinutes: 60,
          toleranceOnMinutes: 10,
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
