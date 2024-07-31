import { TbUser } from "react-icons/tb";
import FollowButton from "../ui/FollowButton";

interface UserCardProps {
    id: string,
    username: string,
    followers : number,
    following : number
}

export default function UserCard({id, username, followers, following} : UserCardProps) {
    return <article className="box-item w-full flex-row gap-3">
        <TbUser className="border-opacity-25 bg-scale-500 p-2 rounded-full flex justify-center items-center" size={50} color="white"/>
        <div className="flex flex-col justify-between gap-2">
            <a href={`user/${id}`} className="link-item">{username}</a>
            <p>{followers} followers, {following} following</p>
        </div>
    </article>;
}