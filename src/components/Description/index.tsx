import Button from "../Button";
import { useRouter } from "next/router";

const Description = () => {
  const router = useRouter()
  const gotoCalculation = () => {
    router.push('/calculation')
  }
  return (
    <div className="flex-1 text-left sm:text-right">
      <div className="text-5xl text-primary-card-text-color dark:text-primary-title-text-color">
        <h1 className="leading-normal">Easy Pricing.</h1>
        <h2 className="leading-normal">Guarenteed ROI.</h2>
      </div>
      <div className="text-lg my-10 text-primary-card-text-color dark:text-primary-desc-text-color">
        <p>
          Our platform is free to use for 30days. Once our flex discounts start
          improving your AWS bill, we take 15% of net savings.
        </p>
        <strong>
          Experience AWS cost optimization that pays for itself immediately.
        </strong>
      </div>
      <div className="flex flex-col space-y-2 items-start md:items-end">
        <Button className="transition-all duration-300 ease-in-out hover:scale-110" label="Go to Calculation" handler={gotoCalculation} />
      </div>
    </div>
  );
};

export default Description;
