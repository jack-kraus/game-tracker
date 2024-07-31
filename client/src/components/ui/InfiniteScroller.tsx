"use client";
import LoadingHandler from '@/components/ui/LoadingHandler';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {BottomScrollListener} from 'react-bottom-scroll-listener';
import SelectionOptions from '../items/SelectionOptions';
import { ScrollerParams, render } from './ScrollerExports';


export default function InfiniteScroller({title, route, options, type, optionSelectors, reverseSelector, keyStart} : ScrollerParams) {
  const selectorInitial = {};
  if (optionSelectors) {
    for (const [key, value] of Object.entries(optionSelectors)) {
      selectorInitial[key] = value[0];
  }}
  const [values, setValues] = useState(selectorInitial);
  
  // set initial options
  options = options ? options : {};
  route = route ? route : '/api/review';
  type = type ? type : "post";
  
  const fetchReviews = async ({ pageParam }) => {
    const res = await fetch(route + '?' + new URLSearchParams({...options, ...values, page : pageParam}).toString());
    return res.json();
  }
  let queryKey = keyStart ? [keyStart, route, options, values] : [route, options, values];
  let query = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: fetchReviews,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.data || lastPage.data.length === 0) { return undefined; }
      return lastPageParam + 1;
    },
  });
  let { data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status } = query;

  let items = data && data.pages ? data.pages.map((item) => item.data).filter((item) => item).flat() : undefined;

  const nextPage = () => {
    if (!isFetchingNextPage && hasNextPage) { fetchNextPage() }
  }

  return  <>
    <h1 className="text-scale-0 underline">{title}</h1>
    {optionSelectors && <SelectionOptions selectionState={[values, setValues]} optionSelectors={optionSelectors} reverseSelector={reverseSelector}/>}
    <LoadingHandler isPending={status==="pending"} error={error} data={data?.pages ? data.pages[0] : undefined}>
      {items && items.length ? items.map((item : any, index:number) => render(type, item, index, items.length)) : <></>}
      <p className='text-scale-100'>
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? <button onClick={nextPage}>Load More</button>
            : 'Nothing more to load'}
      </p>
      <BottomScrollListener offset={100} onBottom={nextPage} triggerOnNoScroll={true}/>
    </LoadingHandler>
  </>;
}