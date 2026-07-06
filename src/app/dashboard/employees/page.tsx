import { EmployeesClient } from "./employees-client";
import { getEmployeesAction } from "../actions";
export const dynamic = "force-dynamic";
export default async function EmployeesPage() {
  let employees: any[] = [];
  try { employees = await getEmployeesAction(); } catch (e) {}
  return <EmployeesClient initialEmployees={employees} />;
}
