import { BsPlusLg, BsSearch } from "react-icons/bs";

export default function Navbar() {
    return (
        <nav className="w-screen h-16 m-0 flex bg-scale-1000 text-scale-0 items-center p-12 justify-between fixed top-0 z-10 drop-shadow-md">
            <a href="/"><img className="purple" src="/images/logo.svg"/></a>
            <form className="w-100 grow" action="/search">
                <input id="query" name="query" type="text" className="w-100 grow p-2.5 rounded-l-xl ml-4 text-scale-1000 text-base focus:border-black"/>
                <select name="type" className="bg-scale-800 text-scale-0 p-2.5">
                    <option value="game">Game</option>
                    <option value="post">Post</option>
                </select>
                <button type="submit" className="w-150 bg-primary p-2.5 rounded-r-xl ml-0 mr-4 px-6 font-bold text-base">Search</button>
            </form>
            <ul className="flex flex-row gap-5">
                <li className="sidebar-icon"><a href="/post"><BsPlusLg/></a></li>
            </ul>
            <a href="/profile" className="w-10 h-10 ml-10 bg-scale-500 rounded-full"/>
        </nav>
    );
}