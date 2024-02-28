/**
 * A component for rendering a box with a given height.
 * @param children - The content to render inside the box.
 * @param height - The height of the box, specified as a CSS length value.
 */

interface BoxrProps {
    children: React.ReactNode;
    height: string;
}

export const Box = ({
    children,
    height
}: BoxrProps) => {

    return (
        <div className={`w-[15rem] ${height} bg-white rounded-lg flex flex-col items-center justify-between p-5 shadow-lg`}
        >
            {children}
        </div>
    )
}