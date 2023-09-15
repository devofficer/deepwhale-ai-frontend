import clxs from "classnames";

interface ButtonProps {
  label: string;
  className?: string;
  handler: () => void;
}

const Button = ({ label, className, handler }: ButtonProps) => {
  return (
    <button
      className={clxs(
        "border",
        "outline-none",
        "px-3 py-2",
        "bg-primary-card-color",
        "hover:bg-primary-card-color-hover",
        "active:bg-primary-card-color-active",
        "border-primary-card-color",
        "hover:border-primary-card-color-hover",
        "active:border-primary-card-color-active",
        "text-primary-card-text-color",
        "font-bold",
        "rounded-md",
        className
      )}
      onClick={handler}
    >
      {label}
    </button>
  );
};

export default Button;
