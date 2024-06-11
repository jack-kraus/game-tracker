import { useQuery } from "@tanstack/react-query";
import { useState } from "react"

interface GameDict {
    name : string,
    id : string,
    cover? : string
}

type Game = GameDict | null;

type Val = [Game, (a:Game)=>void];

export default function GameSearch({ val } : {val : Val}) {
    const [field, setField] = useState("");
    const [value, setValue] = val;

    const { isPending, error, data } = useQuery({
        queryKey: [field],
        queryFn: () =>
          fetch(`${window.location.origin}/api/game/search?query=${field}&limit=10`).then((res) =>
            res.json(),
          ),
        enabled: !!field
    });

    if (value) return <h1 className="text-scale-0" onClick={() => setValue(null)}>Review for: {value.name}</h1>;
    else {
        return <div className="w-full">
            <input value={field} onChange={(e) => setField(e.target.value)} className="z-10 w-full input-box"/>
            {!isPending && !error && data && data.success ? <ul className="absolute z-10 w-full">
                {data.results.map((item : GameDict, ind : number) => <li key={ind}>
                    <button 
                        onClick={() => setValue(item)}
                        className="bg-scale-0 w-1/2 hover:bg-scale-300 flex flex-row p-2 items-center gap-3"
                    >
                        <img src={item.cover} className="w-8"></img>
                        <p className="truncate">{item.name}</p>
                    </button>
                </li>)}
            </ul> : <></>}
        </div>;
    }
}