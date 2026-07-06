"use server";

import { createClient } from "~/lib/supabase/server";
import { getUserOrganizationId, getServices, createService, updateService, deleteService, getEmployees, createEmployee, updateEmployee, deleteEmployee, getFAQs, createFAQ, updateFAQ, deleteFAQ, getConsultations, getConsultationsCount, getConsultationsTodayCount, getBookedConsultationsCount, getOrganization, updateOrganization, getBranding, upsertBranding, updateBranding } from "~/lib/db/queries";
import { revalidatePath } from "next/cache";

async function getAuthOrg() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized: No session found");
  }
  const orgId = await getUserOrganizationId(user.id);
  if (!orgId) {
    throw new Error("Unauthorized: User has no organization");
  }
  return orgId;
}

// Services Actions
export async function getServicesAction() {
  const orgId = await getAuthOrg();
  return getServices(orgId);
}

export async function addServiceAction(data: {
  name: string;
  description?: string;
  price: string;
  durationMinutes: number;
  category?: string;
  isActive?: boolean;
}) {
  const orgId = await getAuthOrg();
  const result = await createService({
    organizationId: orgId,
    name: data.name,
    description: data.description || null,
    price: data.price,
    durationMinutes: data.durationMinutes,
    category: data.category || null,
    isActive: data.isActive !== undefined ? data.isActive : true,
    sortOrder: 0,
  });
  revalidatePath("/dashboard/services");
  return result;
}

export async function updateServiceAction(
  id: string,
  data: {
    name: string;
    description?: string;
    price: string;
    durationMinutes: number;
    category?: string;
    isActive?: boolean;
  }
) {
  const orgId = await getAuthOrg();
  const result = await updateService(id, orgId, {
    name: data.name,
    description: data.description || null,
    price: data.price,
    durationMinutes: data.durationMinutes,
    category: data.category || null,
    isActive: data.isActive !== undefined ? data.isActive : true,
  });
  revalidatePath("/dashboard/services");
  return result;
}

export async function deleteServiceAction(id: string) {
  const orgId = await getAuthOrg();
  const result = await deleteService(id, orgId);
  revalidatePath("/dashboard/services");
  return result;
}

// Employees Actions
export async function getEmployeesAction() {
  const orgId = await getAuthOrg();
  return getEmployees(orgId);
}

export async function addEmployeeAction(data: {
  name: string;
  title?: string;
  bio?: string;
  photoUrl?: string;
  isActive?: boolean;
}) {
  const orgId = await getAuthOrg();
  const result = await createEmployee({
    organizationId: orgId,
    name: data.name,
    title: data.title || null,
    bio: data.bio || null,
    photoUrl: data.photoUrl || null,
    isActive: data.isActive !== undefined ? data.isActive : true,
  });
  revalidatePath("/dashboard/employees");
  return result;
}

export async function updateEmployeeAction(
  id: string,
  data: {
    name: string;
    title?: string;
    bio?: string;
    photoUrl?: string;
    isActive?: boolean;
  }
) {
  const orgId = await getAuthOrg();
  const result = await updateEmployee(id, orgId, {
    name: data.name,
    title: data.title || null,
    bio: data.bio || null,
    photoUrl: data.photoUrl || null,
    isActive: data.isActive !== undefined ? data.isActive : true,
  });
  revalidatePath("/dashboard/employees");
  return result;
}

export async function deleteEmployeeAction(id: string) {
  const orgId = await getAuthOrg();
  const result = await deleteEmployee(id, orgId);
  revalidatePath("/dashboard/employees");
  return result;
}

// FAQs Actions
export async function getFAQsAction() {
  const orgId = await getAuthOrg();
  return getFAQs(orgId);
}

export async function addFAQAction(data: {
  question: string;
  answer: string;
  category?: string;
  sortOrder?: number;
}) {
  const orgId = await getAuthOrg();
  const result = await createFAQ({
    organizationId: orgId,
    question: data.question,
    answer: data.answer,
    category: data.category || null,
    sortOrder: data.sortOrder !== undefined ? data.sortOrder : 0,
  });
  revalidatePath("/dashboard/faqs");
  return result;
}

export async function updateFAQAction(
  id: string,
  data: {
    question: string;
    answer: string;
    category?: string;
    sortOrder?: number;
  }
) {
  const orgId = await getAuthOrg();
  const result = await updateFAQ(id, orgId, {
    question: data.question,
    answer: data.answer,
    category: data.category || null,
    sortOrder: data.sortOrder !== undefined ? data.sortOrder : 0,
  });
  revalidatePath("/dashboard/faqs");
  return result;
}

export async function deleteFAQAction(id: string) {
  const orgId = await getAuthOrg();
  const result = await deleteFAQ(id, orgId);
  revalidatePath("/dashboard/faqs");
  return result;
}

// Consultations Actions
export async function getConsultationsAction() {
  const orgId = await getAuthOrg();
  return getConsultations(orgId);
}

export async function getDashboardStatsAction() {
  const orgId = await getAuthOrg();
  const [consultationsCount, todayCount, bookedCount, servicesList, employeesList] = await Promise.all([
    getConsultationsCount(orgId),
    getConsultationsTodayCount(orgId),
    getBookedConsultationsCount(orgId),
    getServices(orgId),
    getEmployees(orgId),
  ]);
  return {
    consultationsCount,
    todayCount,
    bookedCount,
    servicesCount: servicesList.length,
    services: servicesList,
    employeesCount: employeesList.length,
  };
}

// Branding Actions
export async function getBrandingAction() {
  const orgId = await getAuthOrg();
  return getBranding(orgId);
}

export async function saveBrandingAction(data: {
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  widgetPosition: "bottom-right" | "bottom-left" | "custom";
  widgetTitle: string;
  widgetSubtitle: string;
  aiName: string;
  aiPersonality?: string;
  aiInstructions?: string;
}) {
  const orgId = await getAuthOrg();
  const result = await upsertBranding(orgId, {
    logoUrl: data.logoUrl || null,
    primaryColor: data.primaryColor,
    secondaryColor: data.secondaryColor,
    fontFamily: data.fontFamily,
    widgetPosition: data.widgetPosition,
    widgetTitle: data.widgetTitle,
    widgetSubtitle: data.widgetSubtitle,
    aiName: data.aiName,
    aiPersonality: data.aiPersonality || null,
    aiInstructions: data.aiInstructions || null,
  });
  revalidatePath("/dashboard/branding");
  revalidatePath("/dashboard/settings");
  return result;
}

// Profile Actions
export async function getProfileAction() {
  const orgId = await getAuthOrg();
  return getOrganization(orgId);
}

export async function updateProfileAction(data: {
  name: string;
}) {
  const orgId = await getAuthOrg();
  const result = await updateOrganization(orgId, {
    name: data.name,
  });
  revalidatePath("/dashboard/settings");
  return result;
}

// Booking Link Actions
export async function getBookingLinkAction() {
  const orgId = await getAuthOrg();
  const org = await getOrganization(orgId);
  return org?.bookingLink || null;
}

export async function updateBookingLinkAction(bookingLink: string) {
  const orgId = await getAuthOrg();
  const result = await updateOrganization(orgId, {
    bookingLink: bookingLink || null,
  });
  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard/integrations");
  return result;
}
