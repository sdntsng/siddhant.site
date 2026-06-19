import { NewsletterPopup } from "@/components/newsletter-popup";
import { MermaidRenderer } from "@/components/mermaid-renderer";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <NewsletterPopup />
            <MermaidRenderer />
        </>
    );
}
