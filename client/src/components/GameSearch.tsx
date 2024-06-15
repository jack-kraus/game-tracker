import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"

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
    const [canRun, setCanRun] = useState(false);
    const [focused, setFocused] = useState(false);

    // prevent search from running until after done typing
    useEffect(() => {
        const timeout = setTimeout(() => setCanRun(true), 750);
        return () => clearTimeout(timeout);
    }, [field]);

    const { isPending, error, data } = useQuery({
        queryKey: [field],
        queryFn: () =>
          fetch(`${window.location.origin}/api/game/search?query=${field}&limit=10`).then((res) =>
            res.json(),
          ),
        enabled: (!!field && canRun)
    });

    if (value) return <h1 className="text-scale-0" onClick={() => setValue(null)}>Review for: {value.name}</h1>;
    else {
        return <div className="w-full">
            <p className="text-white">Can Run: {canRun ? "true" : "false"}</p>
            <input
                onFocus={()=>setFocused(true)}
                onBlur={()=>setTimeout(() => setFocused(false), 150)}
                value={field}
                onChange={(e) => { setCanRun(false); setField(e.target.value); }}
                className={"z-10 w-full input-box" + (isPending ? " pl-9" : "")}
                style={{
                    backgroundImage: (isPending ? `url("https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif")` : ""),
                    backgroundSize: "1.5rem",
                    backgroundPosition: "0.5rem center",
                    backgroundRepeat: "no-repeat"
                }}
            />
            {!isPending && !error && data && data.success && focused ? <ul className="absolute z-10 w-full">
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