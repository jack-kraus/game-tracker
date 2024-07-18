import { BsStarFill } from "react-icons/bs";
import PurpleGradient from "@/components/other/PurpleGradient";

export default function Stars({rating, size} : {rating:number, size?:number}) {
    size ??= 20;

    function starClass(i : number) {
        if ((i+1)*2 <= rating) return <BsStarFill key={i} size={size} className="text-primary"/>;
        else if (rating-1 === i*2) return <BsStarFill key={i} size={size} style={{ fill: "url(#blue-gradient)" }}/>;
        else return <BsStarFill key={i} size={size} className="text-scale-100"/>;
    }
    
    return <div className="flex flex-row p-0 m-0 gap-0.5 self-start">
        {[...Array(5)].map((_, ind) => starClass(ind))}
        <PurpleGradient/>
    </div>
}