"use client"

import { range } from '@/data/helpers';
import {
    useQuery,
} from '@tanstack/react-query';
import { useState } from 'react';

export default function Search({searchParams} : any) {
    const [page, setPage] = useState(0);
    const { query } = searchParams;

    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
          fetch(`http://localhost:3000/api/game/search?query=${query}`).then((res) =>
            res.json(),
          ),
    })

    let content;
    if (isPending) content = <p>Pending...</p>;
    else if (error) content = <p>Error: {error.message}</p>;
    else if (!data.success) content = <p>{data.error}</p>;
    else content = <>
        {data.results.slice(page*10,page*10+10).map((item:any) => <article className="overflow-hidden w-full rounded-xl bg-scale-800 text-scale-0 p-3 flex flex-row gap-3 drop-shadow-md">
            <img src={item.cover ? item.cover : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"} alt="Cover" className="object-contain w-32 h-auto rounded-md hover:brightness-150"/>
            <div>
                <h1>{item.name}</h1>
                <p>{item.summary}</p>
            </div>
            <cite>{item.id}</cite>
        </article>)}
        <select value={page} onChange={(e : any) => {
            setPage(e.target.value);
            window.scrollTo(0,0);
        }}>
            {range(0,Math.floor(data.results.length/10)-1).map(i => <option value={i}>{i+1}</option>)}
        </select>
    </>;

    return (
        <main className="flex flex-col w-1/2 items-center mt-4 gap-3 pt-24 pb-4 mx-auto">
            <h1 className="text-scale-0 underline">Search for "{query}"</h1>
            {content}
        </main>
    );
}