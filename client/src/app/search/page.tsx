"use client"

import GameResult from '@/components/GameResult';
import { range } from '@/data/helpers';
import {
    useQuery,
} from '@tanstack/react-query';
import { useState } from 'react';

export default function Search({searchParams} : any) {
    const [page, setPage] = useState(0);
    const { query, type } = searchParams;

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
    else { content = <>
        {data.results.slice(page*10,page*10+10).map((item:any, index:number) => <GameResult key={index} {...item}/> )}
        <select value={page} onChange={(e : any) => {
            setPage(e.target.value);
            window.scrollTo(0,0);
        }}>
            {range(0,Math.floor(data.results.length/10)-1).map(i => <option key={i} value={i}>{i+1}</option>)}
        </select>
    </>;
    console.log(data);
    }

    return (
        <>
            <h1 className="text-scale-0 underline">Search for &quot;{query}&quot;</h1>
            {content}
        </>
    );
}