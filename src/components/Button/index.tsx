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
        "dark:bg-secondary-card-color",
        "dark:text-secondary-card-text-color",
        "dark:hover:bg-secondary-card-color-hover",
        "dark:active:bg-secondary-card-color-active"
      ) + className}
      onClick={handler}
    >
      {label}
    </button>
  );
};

export default Button;
