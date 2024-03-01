import { FieldErrors, UseFormRegister, FieldValues } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface TextareaProps {
    id: string,
    label: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}

const Textarea: React.FC<TextareaProps> = ({
    id,
    label,
    disabled,
    register,
    required,
    errors
}) => {
    return (
        <div className="w-full relative">
            <textarea
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=" "
                className={`
                    peer
                    w-full
                    p-4
                    pt-6
                    font-light
                    text-neutral-800
                    dark:text-neutral-300
                    bg-white
                    dark:bg-black
                    border-[1px]
                    rounded-[5px]
                    outline-none
                    transition
                    disabled:opacity-70
                    without-ring
                    disabled:cursor-not-allowed
                    pl-4
                    ${errors[id] ? 'border-[#ff297f]' : 'border-neutral-300 dark:border-neutral-800'}
                    ${errors[id] ? 'focus:border-[#ff297f]' : 'focus:border-neutral-400'}
                `}
            />
            <label
                htmlFor={id}
                className={`
                    absolute
                    text-md
                    duration-150
                    transform
                    -translate-y-3
                    top-5
                    left-4
                    origin-[0]
                    peer-placeholder-shown:scale-90
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:-translate-y-4
                    ${errors[id] ? 'text-[#ff297f]' : 'text-zinc-400'}
                `}
            >
                {label}
            </label>
        </div>
    );
}

export default Textarea;
