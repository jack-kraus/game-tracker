import { BsStarFill } from "react-icons/bs";

interface postProps {
    title: string,
    review: string,
    rating: number,
    author: string,
    timestamp: string,
    game: string
}

export default function Post({ title,game, review, rating, author, timestamp } : postProps) {
    return (
        <article className="w-1/2 rounded-xl bg-scale-800 text-scale-0 p-3 flex flex-row gap-3 drop-shadow-md">
            <div>
                <img className="w-32 rounded-md hover:brightness-150" src="/images/messenger.jpg"/>
                <a href="/"><i className="text-center text-xs hover:text-primary">{game}</i></a>
            </div>
            <div className="h-full w-full">
                <a href="/" className="hover:text-primary active:text-white"><h1>{title}</h1></a>
                <p className="h-full">{review}</p>
                <span className="inline-flex">
                    {[...Array(5)].map((_, ind) => ind < rating ? <BsStarFill key={ind} className="text-primary size-6"/> :  <BsStarFill key={ind} className="size-6"/>)}
                </span>
            </div>
            <cite className="flex flex-col justify-between items-end text-right">
                <p className="bg-scale-200 w-12 h-12 rounded-full"/>
                {author}
                <br/>
                {timestamp}
            </cite>
        </article>
    );
}