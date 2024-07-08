"use server";

import PageScroller from '@/components/ui/PageScroller';
import { object, string } from 'yup';

const searchSchema = object({
    query : string().trim().required(),
    type: string().trim().default("game").oneOf(["game", "user"])
});

export async function generateMetadata({ searchParams } : any) {
    const { query } = searchParams;
    if (!query) return { title: "Error | Leveler"};
    return { title: `Search for "${query}" | Leveler`};
}

export default async function Search({searchParams} : any) {
    try {
        searchParams = await searchSchema.validate(searchParams);
    } catch (error) {
        return <h1 className='text-red-500'>{error.toString()}</h1>
    }
    const { query, type } = searchParams;

    if (type==="game") {
        return <PageScroller
            title={`Search for "${query}"`}
            route="/api/game"
            type="game"
            options={{query:query}}
        />;
    } else if (type==="user") {
        return <PageScroller
            title={`Search for "${query}"`}
            route="/api/user"
            type="user"
            options={{query:query}}
        />;
    }
}