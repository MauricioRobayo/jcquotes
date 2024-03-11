import { Link } from "@/src/components/Link";
import { Quote } from "@/src/components/Quote";
import { quoteService } from "@/src/services/quotes";
import { notFound } from "next/navigation";
import { IoSync } from "react-icons/io5";

export async function generateStaticParams() {
  return [];
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const quote = await quoteService.getById(id);
  if (!quote) {
    notFound();
  }
  return (
    <Quote
      quote={quote}
      actions={[
        <Link href="/" aria-label="New random quote">
          <IoSync />
        </Link>,
      ]}
    />
  );
}
