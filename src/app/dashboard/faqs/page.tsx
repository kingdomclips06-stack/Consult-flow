import { FAQsClient } from "./faqs-client";
import { getFAQsAction } from "../actions";
export const dynamic = "force-dynamic";
export default async function FAQsPage() {
  let faqs: any[] = [];
  try { faqs = await getFAQsAction(); } catch (e) {}
  return <FAQsClient initialFAQs={faqs} />;
}
