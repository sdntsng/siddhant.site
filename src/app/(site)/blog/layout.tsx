import { NewsletterPopup } from "@/components/newsletter-popup";
import { MermaidScript } from "@/components/mermaid-script";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <NewsletterPopup />
            <MermaidScript />
        </>
    );
}
