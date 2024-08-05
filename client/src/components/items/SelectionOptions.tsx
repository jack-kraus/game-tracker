import { cn } from "@/data/utils";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

interface SelectionOptionsParams {
    optionSelectors? : { [key: string]: string[]; },
    reverseSelector? : boolean,
    selectionState : any,
}

type Target = string | boolean;
type Options = {[option:string] : Target};

function capitalize(input : string) {
    return input.split("_").map((word : string) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}

export default function SelectionOptions({ optionSelectors, reverseSelector, selectionState } : SelectionOptionsParams) {
    const [values, setValues] : [Options, (opt:Options) => void] = selectionState;
    const [open, setOpen] = useState(false);

    const changeValue = (key : string, value : Target) => {
        const newValues = {...values};
        newValues[key] = value;
        setValues(newValues);
    }

    if (!open) return <button className={cn("hover-button bg-scale-800 text-white py-2 px-4")} onClick={() => setOpen(true)}>Filter...</button>
    return <div className={cn('box-item p-3 text-scale-0 w-auto flex-col')}>
        <button onClick={()=>setOpen(false)} className={cn("self-end text-2xl text-scale-200 hover:text-scale-0")}>&times;</button>
        <div className="flex flex-row flex-wrap gap-5 items-center justify-center">
            {optionSelectors && Object.entries(optionSelectors).map( ([key, value], i : number) =>
            <div className='flex flex-col' key={i}>
                <p>{capitalize(key)}</p>
                <select onChange={(e) => changeValue(key, e.target.value)} className='input-box' defaultValue={values[key].toString()}>
                    {value && value.map((name : string, j: number) => <option className="hover:bg-scale-700 " key={`${i}, ${j}`} value={name}>{capitalize(name)}</option>)}
                </select>
            </div>)}
            {reverseSelector && <div className='flex flex-col'>
                <p>Reverse</p>
                <button className={cn("text-scale-1000 flex justify-center items-center rounded-lg w-10 h-10 bg-white border-primary", { "border-2 bg-scale-100" : values?.reverse })} onClick={() => changeValue("reverse", !values.reverse)}>
                    {values.reverse && <FaCheck size={20}/>}
                </button>
            </div>}
        </div>
    </div>;
}


// grow p-2 rounded-lg text-scale-1000 text-base focus:outline-none focus:border-primary focus:bg-scale-100 border-2