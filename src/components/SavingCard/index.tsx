import clxs from "classnames";

interface ISavingCardProps {
  title: string;
  percent: number;
  desc: string;
}

const SavingCard = ({ title, percent, desc }: ISavingCardProps) => {
  return (
    <div
      className={clxs(
        "w-full",
        "p-4",
        "rounded-xl",
        "text-center",
        "border-2",
        "shadow-md",
        "bg-primary-card-color",
        "border-primary-card-color",
        "text-primary-card-text-color",
        "dark:bg-secondary-card-color",
        "dark:text-secondary-card-text-color"
      )}
    >
      <p className="font-semibold">{title}</p>
      <p className="text-4xl my-3 font-bold">{percent}%</p>
      <p className="font-semibold">{desc}</p>
    </div>
  );
};

export default SavingCard;
