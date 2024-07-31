"use client";

import { useState } from "react";
import FollowerTable from "./FollowerTable";
import FollowButton from "./FollowButton";

interface FollowParams {
    id: string,
    username: string,
    followers? : number,
    following? : number,
    is_following: boolean
}

export default function FollowFull({id, username, followers, following, is_following} : FollowParams) {
    const followState = useState(is_following);
    const [isFollowing] = followState;

    return <>
        <FollowerTable {...{id, username, is_following, following}} followers={(followers ?? 0) + (isFollowing ? 1 : 0) - (is_following ? 1 : 0)}/>
        <FollowButton {...{id, username, is_following}} followState={followState}/>
    </>;
}