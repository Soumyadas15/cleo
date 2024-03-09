export default async function FeedbacksLayout({
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