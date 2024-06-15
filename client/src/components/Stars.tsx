import { BsStarFill } from "react-icons/bs";
import PurpleGradient from "./PurpleGradient";

export default function Stars({rating} : {rating:number}) {
    return <>
        <PurpleGradient/>
        <span className="inline-flex">
            {[...Array(5)].map((_, ind) => ind < rating ? <BsStarFill key={ind} className="text-primary size-6"/> :  <BsStarFill key={ind} className="size-6"/>)}
        </span>
    </>
}