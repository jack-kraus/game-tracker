import { TbUser } from "react-icons/tb";

interface UserCardProps {
    id: string,
    username: string,
    followers : number,
    following : number
}

export default function UserCard({id, username, followers, following} : UserCardProps) {
    return <article className="box-item w-auto">
        <div className="flex flex-col gap-2">
            <a href={`user/${id}`} className="link-item">{username}</a>
            <TbUser className="border-opacity-25 bg-scale-500 p-2 rounded-full flex justify-center items-center" size={50} color="white"/>
        </div>
        <table className="table-fixed border-spacing-2 text-scale-0 w-1/3 ml-auto text-center">
            <thead>
                <tr>
                    <th>Followers</th>
                    <th>Following</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{followers}</td>
                    <td>{following}</td>
                </tr>
            </tbody>
        </table>
    </article>;
}