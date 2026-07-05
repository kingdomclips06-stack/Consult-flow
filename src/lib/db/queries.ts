import { db } from "./index";
import { services, employees, faqs, users, consultations } from "./schema";
import { eq, and, asc, sql } from "drizzle-orm";

export async function getUserOrganizationId(userId: string): Promise<string | null> {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  return result[0]?.organizationId || null;
}

// Services CRUD
export async function getServices(organizationId: string) {
  return db
    .select()
    .from(services)
    .where(eq(services.organizationId, organizationId))
    .orderBy(asc(services.sortOrder));
}

export async function createService(data: typeof services.$inferInsert) {
  const [newService] = await db.insert(services).values(data).returning();
  return newService;
}

export async function updateService(id: string, organizationId: string, data: Partial<typeof services.$inferInsert>) {
  const [updatedService] = await db
    .update(services)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(services.id, id), eq(services.organizationId, organizationId)))
    .returning();
  return updatedService;
}

export async function deleteService(id: string, organizationId: string) {
  const [deletedService] = await db
    .delete(services)
    .where(and(eq(services.id, id), eq(services.organizationId, organizationId)))
    .returning();
  return deletedService;
}

// Employees CRUD
export async function getEmployees(organizationId: string) {
  return db
    .select()
    .from(employees)
    .where(eq(employees.organizationId, organizationId))
    .orderBy(asc(employees.name));
}

export async function createEmployee(data: typeof employees.$inferInsert) {
  const [newEmployee] = await db.insert(employees).values(data).returning();
  return newEmployee;
}

export async function updateEmployee(id: string, organizationId: string, data: Partial<typeof employees.$inferInsert>) {
  const [updatedEmployee] = await db
    .update(employees)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(employees.id, id), eq(employees.organizationId, organizationId)))
    .returning();
  return updatedEmployee;
}

export async function deleteEmployee(id: string, organizationId: string) {
  const [deletedEmployee] = await db
    .delete(employees)
    .where(and(eq(employees.id, id), eq(employees.organizationId, organizationId)))
    .returning();
  return deletedEmployee;
}

// FAQs CRUD
export async function getFAQs(organizationId: string) {
  return db
    .select()
    .from(faqs)
    .where(eq(faqs.organizationId, organizationId))
    .orderBy(asc(faqs.sortOrder));
}

export async function createFAQ(data: typeof faqs.$inferInsert) {
  const [newFAQ] = await db.insert(faqs).values(data).returning();
  return newFAQ;
}

export async function updateFAQ(id: string, organizationId: string, data: Partial<typeof faqs.$inferInsert>) {
  const [updatedFAQ] = await db
    .update(faqs)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(faqs.id, id), eq(faqs.organizationId, organizationId)))
    .returning();
  return updatedFAQ;
}

export async function deleteFAQ(id: string, organizationId: string) {
  const [deletedFAQ] = await db
    .delete(faqs)
    .where(and(eq(faqs.id, id), eq(faqs.organizationId, organizationId)))
    .returning();
  return deletedFAQ;
}

// Consultations
export async function getConsultations(organizationId: string) {
  return db
    .select()
    .from(consultations)
    .where(eq(consultations.organizationId, organizationId))
    .orderBy(asc(consultations.createdAt))
    .limit(10);
}

export async function getConsultationsCount(organizationId: string) {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(consultations)
    .where(eq(consultations.organizationId, organizationId));
  return Number(result[0]?.count || 0);
}

export async function getConsultationsTodayCount(organizationId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(consultations)
    .where(
      and(
        eq(consultations.organizationId, organizationId),
        sql`${consultations.createdAt} >= ${today.toISOString()}`
      )
    );
  return Number(result[0]?.count || 0);
}

export async function getBookedConsultationsCount(organizationId: string) {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(consultations)
    .where(
      and(
        eq(consultations.organizationId, organizationId),
        eq(consultations.bookedAppointment, true)
      )
    );
  return Number(result[0]?.count || 0);
}
