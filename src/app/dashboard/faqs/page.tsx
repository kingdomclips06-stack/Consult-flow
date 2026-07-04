import { getFAQsAction } from "../actions";
import { FAQsClient } from "./faqs-client";

export const dynamic = "force-dynamic";

export default async function FAQsPage() {
  const faqs = await getFAQsAction();
  
  // Serialize Dates
  const serializedFAQs = faqs.map(f => ({
    ...f,
    createdAt: f.createdAt instanceof Date ? f.createdAt : new Date(f.createdAt),
    updatedAt: f.updatedAt instanceof Date ? f.updatedAt : new Date(f.updatedAt),
  }));

  return <FAQsClient initialFAQs={serializedFAQs} />;
}
