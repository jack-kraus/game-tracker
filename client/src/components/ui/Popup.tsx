export default function Popup({text}) {
    return <div className="relative">
        <div className="absolute bg-scale-300 text-scale-1000">{text}</div>
    </div>;
}