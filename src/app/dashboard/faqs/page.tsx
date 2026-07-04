import { FAQsClient } from "./faqs-client";

export const dynamic = "force-dynamic";

export default function FAQsPage() {
  return <FAQsClient initialFAQs={[]} />;
}
