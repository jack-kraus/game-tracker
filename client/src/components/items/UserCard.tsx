import { TbUser } from "react-icons/tb";
import FollowButton from "../ui/FollowButton";
import { abbreviateNumber } from "js-abbreviation-number";
import { useState } from "react";

interface UserCardProps {
    id: string,
    username: string,
    followers : number,
    following : number,
    is_following : boolean
}

export default function UserCard({id, username, followers, following, is_following} : UserCardProps) {
    const followState = useState(is_following);
    const [isFollowing] = followState;
    
    return <article className="box-item w-full flex-row gap-3">
        <TbUser className="border-opacity-25 bg-scale-500 p-2 rounded-full flex justify-center items-center" size={50} color="white"/>
        <div className="flex flex-col justify-between gap-2 grow">
            <a href={`user/${id}`} className="link-item">{username}</a>
            <p>{abbreviateNumber((followers ?? 0) + (isFollowing ? 1 : 0) - (is_following ? 1 : 0), 1)} followers, {abbreviateNumber(following, 1)} following</p>
        </div>
        <FollowButton {...{id, username, is_following}} followState={followState}/>
    </article>;
}