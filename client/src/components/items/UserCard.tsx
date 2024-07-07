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
        <div className="flex flex-row gap-2">
            <TbUser className="border-opacity-25 bg-scale-500 p-2 rounded-full flex justify-center items-center" size={50} color="white"/>
            <table className="table-fixed border-spacing-10 text-scale-0 ml-auto text-center">
                <tr>
                    <th>Followers</th>
                    <th>Following</th>
                </tr>
                
                <tr>
                    <td>{followers}</td>
                    <td>{following}</td>
                </tr>
            </table>
        </div>
    </article>;
}