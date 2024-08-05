"use client";
import LoadingHandler from '@/components/ui/LoadingHandler';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import SelectionOptions from '../items/SelectionOptions';
import { ScrollerParams, render } from './ScrollerExports';


export default function PageScroller({title, route, options, type, optionSelectors, keyStart} : ScrollerParams) {
    options = options ? options : {};
    route = route ? route : '/api/review';
    type = type ? type : "post";
    
    const selectorInitial = {};
    if (optionSelectors) {
        for (const [key, value] of Object.entries(optionSelectors)) {
        selectorInitial[key] = value[0];
    }}

    const [values, setValues] = useState(selectorInitial);
    const [page, setPage] = useState(0);
    
    const fetchReviews = async ({ pageParam }) => {
      const res = await fetch(route + '?' + new URLSearchParams({...options, ...values, page : pageParam}).toString());
      return res.json();
    }

    const alterPage = (offset : number, length : number, lastPage? : number) => {
        console.log(lastPage);
        const new_page = Math.max(0, page + offset);
        if ( (!length || (lastPage !== undefined ? new_page > lastPage : false)) && offset > 0) { return; }
        else { setPage(new_page); }
    }

    let { isFetching, error, data } = useQuery({
        queryKey: [keyStart, page, values],
        queryFn: () => fetchReviews({pageParam:page})
    });

    let items = data && data.data ? data.data : undefined;
    let lastPage = data && data.lastPage !== undefined ? data.lastPage : undefined;

    return  <>
        <h1 className="text-scale-0 underline">{title}</h1>
        {optionSelectors && <SelectionOptions selectionState={[values, setValues]} optionSelectors={optionSelectors}/>}
        <LoadingHandler isPending={isFetching} error={error} data={data}>
            {items && items.length ? items.map((item : any, index:number) => render(type, item, index, items.length)) : <p className='text-scale-0'>Nothing more to load</p>}
            {lastPage !== 0 && <div className='flex w-auto gap-3 items-center text-white'>
                {page > 1 && <button
                    onClick={() => setPage(0)}
                    className='bg-scale-800 rounded-full px-2 py-1 hover:bg-scale-200'
                >
                    &lt;&lt;
                </button>}
                <button
                    onClick={() => alterPage(-1, items.length, lastPage)}
                    disabled={page===0}
                    className='bg-scale-800 rounded-full px-2 py-1 hover:bg-scale-200'
                >
                    &lt;
                </button>
                <p>{page}</p>
                <button
                    onClick={() => alterPage(1, items.length, lastPage)}
                    disabled={!items?.length || items.length < 10 || (lastPage !== undefined && page == lastPage)}
                    className='bg-scale-800 rounded-full px-2 py-1 hover:bg-scale-200'
                >
                    &gt;
                </button>
                {lastPage !== undefined && <button
                    onClick={() => setPage(lastPage)}
                    className='bg-scale-800 rounded-full px-2 py-1 hover:bg-scale-200'
                >
                    &gt;&gt;
                </button>}
            </div>}
        </LoadingHandler>
    </>;
}