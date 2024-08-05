import { FaUser } from "react-icons/fa";

interface authorProps {
    username : string,
    author:  string,
    include_by? : boolean
}
export default function Author({ username, author } : authorProps) {
    return <a href={`/user/${author}`} className="group w-auto inline-flex gap-1 items-center self-start flex-wrap">
        <FaUser size={15} className="p-0.5 inline  bg-scale-500 text-scale-0 rounded-full group-hover:rounded-3xl object-contain group-hover:bg-scale-0 group-hover:text-scale-500"/>
        <p className="group-link-item break-words">{username}</p>
    </a>;
}