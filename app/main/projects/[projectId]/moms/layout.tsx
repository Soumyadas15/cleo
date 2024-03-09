export default async function MomsLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (  
        <div className="w-full h-full">
            {children}
        </div>
    );
}