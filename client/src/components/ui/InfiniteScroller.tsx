"use client";
import Post from '@/components/items/Post';
import LoadingHandler from '@/components/ui/LoadingHandler';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import {BottomScrollListener} from 'react-bottom-scroll-listener';
import GameResult from '../items/GameResult';
import UserCard from '../items/UserCard';
import SelectionOptions from '../items/SelectionOptions';

type renderType = "game" | "user" | "post" | "post_game" | "post_user";

interface InfiniteScrollerParams {
  route? : string,
  options? : {[opt:string] : string},
  title : string,
  type? : renderType,
  optionSelectors? : { [key: string]: string[]; }
}

function render(type : renderType, item : any, index : number) {
  switch (type) {
    case "post": return <Post key={index} {...item}/>;
    case "game": return <GameResult key={index} {...item}/>;
    case "user": return <UserCard key={index} {...item}/>;
    case "post_game": return <Post key={index} {...item} type="game"/>;
    case "post_user": return <Post key={index} {...item} type="user"/>;
  }
}

export default function InfiniteScroller({title, route, options, type, optionSelectors} : InfiniteScrollerParams) {
  const selectorInitial = {};
  if (optionSelectors) {
    for (const [key, value] of Object.entries(optionSelectors)) {
      selectorInitial[key] = value[0];
  }}
  const [values, setValues] = useState(selectorInitial);
  
  options = options ? options : {};
  route = route ? route : '/api/review';
  type = type ? type : "post";
  
  const fetchReviews = async ({ pageParam }) => {
    const res = await fetch(route + '?' + new URLSearchParams({...options, ...values, page : pageParam}).toString());
    return res.json();
  }
  let query = useInfiniteQuery({
    queryKey: [route, options, values],
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

  return  <>
    <h1 className="text-scale-0 underline">{title}</h1>
    {optionSelectors && <SelectionOptions selectionState={[values, setValues]} optionSelectors={optionSelectors}/>}
    <LoadingHandler isPending={status==="pending"} error={error} data={data?.pages ? data.pages[0] : undefined}>
      {items && items.length ? items.map((item : any, index:number) => render(type, item, index)) : <></>}
      <p className='text-scale-0'>
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
      </p>
      <BottomScrollListener onBottom={() => { if (hasNextPage) { fetchNextPage() } }} triggerOnNoScroll={true}/>
    </LoadingHandler>
  </>;
}