import { BsPlusCircleFill } from "react-icons/bs";
import Link from "next/link";
import SeeMore from "../ui/SeeMore";

interface gameProps {
    name : string, summary : string, cover : string, id : number, first_release_date : string, platforms: string[]
}

export default function GameResult({ name, summary, cover, id, first_release_date, platforms } : gameProps) { 
    return (
        <article className="overflow-hidden box-item gap-3">
            <div className="w-1/4 max-w-48 shrink-0">
                <Link href={`/game/${id}`}>
                    <img className="object-contain w-full rounded-md hover:brightness-150" src={cover ? cover : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"}/>
                </Link>
            </div>
            <div className="flex flex-col gap-3">
                <Link href={`/game/${id}`} className="link-item">
                    <h1>{name} {first_release_date && <i className="italic">&#40;{first_release_date}&#41;</i>}</h1>
                </Link>
                <SeeMore>{summary}</SeeMore>
                <p><b>Platforms:</b> {platforms ? platforms.join(", ") : "N/A"}</p>
            </div>
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