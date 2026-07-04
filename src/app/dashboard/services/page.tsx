import { getServicesAction } from "../actions";
import { ServicesClient } from "./services-client";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await getServicesAction();
  
  // Cast decimal types or ensure serialize-friendly format if needed
  // (Drizzle selects return clean objects, but let's double check dates if any)
  const serializedServices = services.map(s => ({
    ...s,
    createdAt: s.createdAt instanceof Date ? s.createdAt : new Date(s.createdAt),
    updatedAt: s.updatedAt instanceof Date ? s.updatedAt : new Date(s.updatedAt),
  }));

  return <ServicesClient initialServices={serializedServices} />;
}
