import { getEmployeesAction } from "../actions";
import { EmployeesClient } from "./employees-client";

export const dynamic = "force-dynamic";

export default async function EmployeesPage() {
  const employees = await getEmployeesAction();
  
  // Serialize Dates
  const serializedEmployees = employees.map(e => ({
    ...e,
    createdAt: e.createdAt instanceof Date ? e.createdAt : new Date(e.createdAt),
    updatedAt: e.updatedAt instanceof Date ? e.updatedAt : new Date(e.updatedAt),
  }));

  return <EmployeesClient initialEmployees={serializedEmployees} />;
}
