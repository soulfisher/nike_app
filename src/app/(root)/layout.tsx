export default function RootGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      {/* Header/Navigation can be added here for main app pages */}
      <main>{children}</main>
    </div>
  );
}
