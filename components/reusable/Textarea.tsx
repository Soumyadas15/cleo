import { FieldErrors, UseFormRegister, FieldValues } from "react-hook-form";

interface TextareaProps {
    id: string;
    label: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    minLength?: number;
    height?: string;
}

const Textarea: React.FC<TextareaProps> = ({
    id,
    label,
    disabled,
    register,
    required,
    errors,
    minLength = 20, 
    height = 'h-[6rem]'
}) => {
    return (
        <div className="w-full relative">
            <textarea
                id={id}
                disabled={disabled}
                {...register(id, { required, minLength })}
                placeholder=" "
                className={`
                    peer
                    w-full
                    p-4
                    pt-6
                    scrollbar-hide
                    font-light
                    text-neutral-800
                    dark:text-neutral-300
                    bg-white
                    dark:bg-neutral-900
                    border-[1px]
                    rounded-[5px]
                    ${height}
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
            {errors[id] && (
                <p className="text-xs text-[#ff297f] absolute bottom-2 left-4">
                    {`Minimum ${minLength} characters required`}
                </p>
            )}
        </div>
    );
}

export default Textarea;
