import PrototypeShell from "@/components/prototypes/prototype-shell";

export default function PrototypeRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PrototypeShell>{children}</PrototypeShell>;
}
