import { useFormContext } from "react-hook-form";

interface InputProps {
    label : string,
    id : string,
    type : string,
    placeholder : string,
    hookOptions : {[prop:string] : any},
    [other:string]: any;
}

export default function Input({ label, id, type, placeholder, hookOptions, ...props } : InputProps) {
    const { register, formState: { errors } } = useFormContext();
    const thisError = errors[id] ? errors[id].message : "";
    
    const values = {
        id,
        type,
        placeholder,
        autoComplete:"off",
        className: "input-box border-2 focus:outline-none " + (thisError ? "border-red-500 border-2 focus:border-red-700 focus:bg-red-100" : ""),
        ...register(id, hookOptions),
        ...props
    }

    return <>
        <label htmlFor={id}>{label}</label>
        {type === "textarea" ? <textarea {...values} /> : <input {...values} />}
        {thisError ? <p className="text-red-500">{thisError as string}</p> : <></>}
    </>;
}

// 