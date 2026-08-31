import { getSettings } from "@/lib/api";
import { ContactContent } from "@/components/contact-content";

export default async function ContactPage() {
  const settings = await getSettings();
  return <ContactContent settings={settings} />;
}
