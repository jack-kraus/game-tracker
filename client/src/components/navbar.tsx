import { BsPlusLg, BsSearch } from "react-icons/bs";

export default function Navbar() {
    return (
        <nav className="w-screen h-16 m-0 flex bg-scale-1000 text-scale-0 items-center p-12 justify-between fixed top-0 z-10 drop-shadow-md">
            <a href="/"><img className="purple" src="/images/logo.svg"/></a>
            <input type="text" className="w-100 p-2.5 rounded-l-xl grow ml-4 text-scale-1000 text-base focus:border-black"/>
            <button className="w-150 bg-primary p-2.5 rounded-r-xl ml-0 mr-4 px-6 font-bold text-base">Search</button>
            <ul className="flex flex-row gap-5">
                <li className="sidebar-icon"><BsPlusLg/></li>
            </ul>
            <span className="w-10 h-10 ml-10 bg-scale-500 rounded-full"/>
        </nav>
    );
}