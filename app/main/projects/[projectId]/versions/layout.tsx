export default async function VersionsLayout({
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