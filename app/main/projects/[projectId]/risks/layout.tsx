export default async function RisksLayout({
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