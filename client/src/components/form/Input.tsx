import { cn } from "@/data/utils";
import { useFormContext } from "react-hook-form";

interface InputProps {
    label? : string,
    id : string,
    type : string,
    placeholder? : string,
    hookOptions : {[prop:string] : any},
    inputClass? : string,
    labelClass? : string,
    [other:string]: any
}

export default function Input({ label, id, type, placeholder, hookOptions, inputClass, labelClass, ...props } : InputProps) {
    const { register, formState: { errors } } = useFormContext();
    const thisError = errors[id] ? errors[id].message : "";
    
    const values = {
        id,
        type,
        placeholder : placeholder ? placeholder : label,
        autoComplete:"off",
        className: cn("input-box border-2 focus:outline-none", {
            "border-red-500 border-2 focus:border-red-700 focus:bg-red-100": thisError,
            "p-0": type === "range",
        }, inputClass),
        ...register(id, hookOptions),
        ...props
    }

    return <>
        {label && <label htmlFor={id}>{label}</label>}
        {type === "textarea" ? <textarea {...values} /> : <input {...values} />}
        {thisError ? <p className={cn("text-red-500", { labelClass : labelClass })}>{thisError as string}</p> : <></>}
    </>;
}

// 