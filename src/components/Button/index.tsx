import clxs from "classnames";

interface ButtonProps {
  label: string;
  className: string;
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
        "border-primary-card-color",
        "text-primary-card-text-color",
        "dark:bg-secondary-card-color",
        "dark:text-secondary-card-text-color"
      ) + className}
      onClick={handler}
    >
      {label}
    </button>
  );
};

export default Button;
