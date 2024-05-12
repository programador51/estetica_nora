import model from "@/app/models/services";

export async function GET(req: Request) {
  try {
    const page = +req.url.split("/").reverse()[0];

    const services = await model.paginated(page);
  } catch (error) {}
}
