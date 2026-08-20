import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Prototypes | Siddhant Singh",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrototypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full min-h-screen bg-background">{children}</div>;
}
