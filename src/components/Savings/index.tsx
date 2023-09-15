import SavingCard from "../SavingCard";

const Savings = () => {
  return (
    <div className="flex flex-col items-center space-y-3 md:max-w-xs lg:max-w-md w-full pt-8">
      <SavingCard
        title="Flex Savings Plans"
        percent={15}
        desc="Net Savings Fee"
      />
      <SavingCard
        title="Flex Savings Plans"
        percent={15}
        desc="Net Savings Fee"
      />
    </div>
  );
};

export default Savings;
