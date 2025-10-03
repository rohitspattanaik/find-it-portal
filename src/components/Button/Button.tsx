import styles from "./Button.module.css";

interface ButtonProps {
    text: string;
    onClick: (e: React.FormEvent) => void;
    type?: "button" | "submit" | "reset";
    className?: string;
}

const Button = ({ text, onClick, type, className }: ButtonProps) => {
    return (
        <button onClick={onClick} type={type} className={ className ? styles.button + " " + className : styles.button}>{text}</button>
    );
}

export default Button;
