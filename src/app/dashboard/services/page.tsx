import { ServicesClient } from "./services-client";
import { getServicesAction } from "../actions";
export const dynamic = "force-dynamic";
export default async function ServicesPage() {
  let services: any[] = [];
  try { services = await getServicesAction(); } catch (e) {}
  return <ServicesClient initialServices={services} />;
}
