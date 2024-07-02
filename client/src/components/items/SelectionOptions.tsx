interface SelectionOptionsParams {
    optionSelectors? : { [key: string]: string[]; }
    selectionState : any
}

type Options = {[option:string] : string};

export default function SelectionOptions({ optionSelectors, selectionState } : SelectionOptionsParams) {
    const [values, setValues] : [Options, (opt:Options) => void] = selectionState;

    const changeValue = (key : string, value : string) => {
        const newValues = {...values};
        newValues[key] = value;
        setValues(newValues);
    }

    return <div className='box-item text-scale-0 w-auto flex flex-row gap-5'>
        {optionSelectors && Object.entries(optionSelectors).map( ([key, value], i : number) =>
        <div className='flex flex-col'>
        <p>{key}</p>
        <select onChange={(e) => changeValue(key, e.target.value)} className='input-box'>
            {value && value.map((name : string, j: number) => <option key={`${i},${j}`}>{name}</option>)}
        </select>
        </div>)}
    </div>;
}