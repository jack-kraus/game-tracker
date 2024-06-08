import { BsStarFill } from "react-icons/bs";

interface postProps {
    title: string,
    content: string,
    rating: number,
    author: string,
    created_at: string,
    game_title: string,
    game_cover: string
}

export default function Post({ title, game_title, game_cover, content, rating, author, created_at } : postProps) {
    return (
        <article className="w-full rounded-xl bg-scale-800 text-scale-0 p-3 flex flex-row gap-3 drop-shadow-md">
            <div>
                <img className="w-32 rounded-md hover:brightness-150" src={game_cover}/>
                <a href="/"><i className="text-center text-xs hover:text-primary">{game_title}</i></a>
            </div>
            <div className="h-full w-full">
                <a href="/" className="hover:text-primary active:text-white"><h1>{title}</h1></a>
                <p className="h-full">{content}</p>
                <span className="inline-flex">
                    {[...Array(5)].map((_, ind) => ind < rating ? <BsStarFill key={ind} className="text-primary size-6"/> :  <BsStarFill key={ind} className="size-6"/>)}
                </span>
            </div>
            <cite className="flex flex-col justify-between items-end text-right">
                <p className="bg-scale-200 w-12 h-12 rounded-full"/>
                {author}
                <br/>
                {created_at}
            </cite>
        </article>
    );
}