import { useFormContext } from "react-hook-form";

interface InputProps {
    label : string,
    id : string,
    type : string,
    placeholder : string,
    hookOptions : {[prop:string] : any}
}

export default function Input({ label, id, type, placeholder, hookOptions } : InputProps) {
    const { register, formState: { errors } } = useFormContext();
    const thisError = errors[id] ? errors[id].message : "";

    return <>
        <label htmlFor={id}>{label}</label>
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            autoComplete="off"
            className={"input-box border-2 focus:outline-none " + (thisError ? "border-red-500 border-2 focus:border-red-700 focus:bg-red-100" : "focus:border-primary focus:bg-scale-100")}
            {...register(id, hookOptions)}
        />
        <p className="text-red-500">{thisError as string}</p>
    </>;
}