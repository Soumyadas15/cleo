export default async function SprintsLayout({
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