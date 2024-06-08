interface gameProps {
    name : string, summary : string, cover : string, id : number
}

export default function GameResult({ name, summary, cover, id } : gameProps) {
    return (
        <article className="overflow-hidden w-full rounded-xl bg-scale-800 text-scale-0 p-3 flex flex-row gap-3 drop-shadow-md">
            <img src={cover ? cover : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"} alt="Cover" className="object-contain w-32 h-auto rounded-md hover:brightness-150"/>
            <div>
                <h1>{name}</h1>
                <p>{summary}</p>
            </div>
            <cite>{id}</cite>
        </article>
    );
}