import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface DisplaytextProps {
    title: string;
    text: string;
    limit: number;
}
const DisplayText = ({ 
    title,
    text,
    limit
}: DisplaytextProps) => {
  const [showFulltext, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFulltext);
  };

  return (
    <>
      {text.length > limit ? (
        <div>
          {showFulltext ? (
            <div>{text}</div>
          ) : (
            <div>
              {text.slice(0, limit)}...
              <Popover>
                <PopoverTrigger asChild>
                    <span className="text-blue-400 font-semibold hover:cursor-pointer">more</span>
                </PopoverTrigger>
                <PopoverContent className="w-80 h-auto bg-white dark:bg-black dark:border-none rounded-[5px]">
                    <div className="flex flex-col" style={{ maxWidth: '100%' }}>
                        <div className="font-bold text-black dark:text-white mb-2">{title}</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400" style={{ wordWrap: 'break-word' }}>
                            <p>{text}</p>
                        </div>
                    </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      ) : (
        <div>{text}</div>
      )}
    </>
  );
};

export default DisplayText;
