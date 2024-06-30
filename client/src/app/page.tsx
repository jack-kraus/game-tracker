"use client";
import Post from '@/components/items/Post';
import LoadingHandler from '@/components/ui/LoadingHandler';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import {BottomScrollListener} from 'react-bottom-scroll-listener';

export default function Posts() {
    const fetchReviews = async ({ pageParam }) => {
      const res = await fetch('/api/review?page=' + pageParam)
      return res.json();
    }
    let query = useInfiniteQuery({
      queryKey: ['reviews'],
      queryFn: fetchReviews,
      initialPageParam: 0,
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage.data.length === 0) { return undefined; }
        return lastPageParam + 1;
      },
    });
    let { data,
      error,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
      status } = query;

    let posts = data && data.pages ? data.pages.map((item) => item.data).flat() : undefined;

    return  <LoadingHandler bypass={true} isPending={status==="pending"} error={error}>
      <h1 className="text-scale-0 underline">Feed</h1>
      {posts && posts.map((item : any, index:number) => <Post key={index} {...item}/>)}
      <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
        <BottomScrollListener onBottom={() => { if (hasNextPage) {fetchNextPage();} }} triggerOnNoScroll={true}/>
    </LoadingHandler>;
}

/* */