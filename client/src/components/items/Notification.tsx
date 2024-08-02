import { cn } from "@/data/utils";
import Author from "../ui/Author";
import moment from "moment";
import { FaUser } from "react-icons/fa";

export default function Notification(props) {
    let { type, author, post_id, username, title, content, read, created_at } = props;

    if (type === "like") {
        return <article className={cn("box-item flex-row justify-between gap-2", { "bg-scale-1000": read })}>
            <FaUser className="shrink-0 sm:w-10 sm:h-10 w-7 h-7 p-1 inline bg-scale-500 text-scale-0 rounded-full object-contain"/>
            <div className="grow">
                <span className="text-scale-200 font-semibold inline">
                    <a href={`/user/${author}`} className="link-item">{username}</a>
                    <p className="sm:inline"> liked your post </p>
                    <a className="link-item sm:inline" href={`/review/${post_id}`}>&quot;{title}&quot;</a>
                </span>
            </div>
            <p className="text-scale-300">{moment(created_at).format("MM/DD/YY")}</p>
        </article>
    }
    else if (type == "comment") {
        return <article className={cn("box-item flex-row justify-between gap-2", { "bg-scale-1000": read })}>
            <FaUser className="shrink-0 sm:w-10 sm:h-10 w-7 h-7 p-1 inline bg-scale-500 text-scale-0 rounded-full object-contain"/>
            <div className="grow">
                <span className="text-scale-200 font-semibold inline">
                    <a href={`/user/${author}`} className="link-item">{username}</a>
                    <p className="sm:inline"> commented on your post </p>
                    <a className="link-item sm:inline" href={`/review/${post_id}`}>&quot;{title}&quot;</a>
                </span>
                <p className="line-clamp-3 text-ellipsis">{content}</p>
            </div>
            <p className="text-scale-300">{moment(created_at).format("MM/DD/YY")}</p>
        </article>
    }
    else if (type === "follow") {
        return <article className={cn("box-item flex-row justify-between gap-2", { "bg-scale-1000": read })}>
            <FaUser className="shrink-0 sm:w-10 sm:h-10 w-7 h-7 p-1 inline bg-scale-500 text-scale-0 rounded-full object-contain"/>
            <div className="grow">
                <span className="text-scale-200 font-semibold inline">
                    <a href={`/user/${author}`} className="link-item">{username}</a>
                    <p className="sm:inline"> followed you</p>
                </span>
                <p className="line-clamp-3 text-ellipsis">{content}</p>
            </div>
            <p className="text-scale-300">{moment(created_at).format("MM/DD/YY")}</p>
        </article>
    }

    return <article className="box-item">
        <p>{JSON.stringify(props)}</p>
    </article>
}