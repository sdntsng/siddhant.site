import { NewsletterPopup } from "@/components/newsletter-popup";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <NewsletterPopup />
        </>
    );
}
