interface UserCardProps {
    id: string,
    username: string
}

export default function UserCard({id, username} : UserCardProps) {
    return <article className="box-item">
        <a href={`user/${id}`}>{username}</a>
    </article>;
}