import { BsPlusCircleFill } from "react-icons/bs";
import Link from "next/link";

interface gameProps {
    name : string, summary : string, cover : string, id : number, first_release_date : string, platforms: string[]
}

export default function GameResult({ name, summary, cover, id, first_release_date, platforms } : gameProps) { 
    return (
        <article className="overflow-hidden w-full rounded-xl bg-scale-800 text-scale-0 p-3 flex flex-row gap-3 drop-shadow-md">
            <img src={cover ? cover : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"}
                alt="Cover" className="object-contain w-32 h-auto rounded-md hover:brightness-150"/>
            <div className="grow">
                <Link href={`/game/${id}`} className="link-item">
                    <h1>{name} <i className="italic">&#40;{first_release_date}&#41;</i></h1>
                </Link>
                <p className="text-ellipsis">{summary ? summary.substring(0,200) : ""}{summary && summary.length > 200 ? "..." : ""}</p>
                <p><b>Platforms:</b> {platforms.join(", ")}</p>
            </div>
            <cite>{id}</cite>
            <Link href={{
                    pathname: '/post',
                    query: { id: id },
                }}
                className="text-white hover:text-primary hover:bg-white bg-primary h-7 grow-0 px-2 rounded-md flex justify-center items-center transition-colors"
            >
                <BsPlusCircleFill/>
            </Link>
        </article>
    );
}