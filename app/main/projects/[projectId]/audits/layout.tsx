export default async function AuditsLayout({
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