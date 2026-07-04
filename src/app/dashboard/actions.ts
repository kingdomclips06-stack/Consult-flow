"use server";

import { createClient } from "~/lib/supabase/server";
import { getUserOrganizationId, getServices, createService, updateService, deleteService, getEmployees, createEmployee, updateEmployee, deleteEmployee, getFAQs, createFAQ, updateFAQ, deleteFAQ } from "~/lib/db/queries";
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
