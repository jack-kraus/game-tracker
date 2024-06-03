interface buttonProp {
    text: string,
    onClick: () => void
}

export function MyButton({text, onClick} : buttonProp) {
    return (
      <button onClick={onClick}>{text}</button>
    );
}