"use client";
import Post from '@/components/items/Post';
import LoadingHandler from '@/components/ui/LoadingHandler';
import { useQuery } from '@tanstack/react-query';

export default function Posts() {
    let query = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
          fetch(`/api/review`).then((res) =>
            res.json(),
          ),
    });
    let { data } = query;

    return  <>
      <h1 className="text-scale-0 underline">Feed</h1>
      <LoadingHandler {...query}>
        {data ? data.data.map((item : any, index:number) => <Post key={index} {...item}/>) : <></>}
      </LoadingHandler>
    </>;
}