export default async function EscalationLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (  
        <div className="h-full w-full">
            {children}
        </div>
    );
}