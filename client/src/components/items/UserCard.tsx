import { TbUser } from "react-icons/tb";

interface UserCardProps {
    id: string,
    username: string,
    followers : number,
    following : number
}

export default function UserCard({id, username, followers, following} : UserCardProps) {
    return <article className="box-item w-full flex-col">
        <a href={`user/${id}`} className="link-item">{username}</a>
        <div className="flex flex-row justify-between gap-2">
            <TbUser className="border-opacity-25 bg-scale-500 p-2 rounded-full flex justify-center items-center" size={50} color="white"/>
            <div className="grid grid-cols-2 gap-3 justify-center items-center">
                <b>Followers</b>
                <b>Following</b>
                <p className="text-center">{followers}</p>
                <p className="text-center">{following}</p>
            </div>
        </div>
    </article>;
}