'use client'

interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
    fontSize?: string;
}

const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle,
    center,
    fontSize = 'text-2xl'
}) => {
    return ( 
        <div className={center ? 'text-center' : 'text-start'}>
            <div className={`${fontSize} text-black dark:text-white font-bold`}>
                {title}
            </div>
            <div className='font-light text-black dark:text-white mt-2'>
                {subtitle}
            </div>
        </div>
     );
}
 
export default Heading;