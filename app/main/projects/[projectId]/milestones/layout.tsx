export default async function MilestonesLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (  
        <div>
            {children}
        </div>
    );
}