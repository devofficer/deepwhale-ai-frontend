import Button from "../Button";
import Form from "../Form";

const Description = () => {
  return (
    <div className="flex-1 text-left sm:text-right">
      <div className="text-5xl text-primary-title-text-color">
        <h1 className="leading-normal">Easy Pricing.</h1>
        <h2 className="leading-normal">Guarenteed ROI.</h2>
      </div>
      <div className="text-lg my-10 text-primary-desc-text-color">
        <p>
          Our platform is free to use for 30days. Once our flex discounts start
          improving your AWS bill, we take 15% of net savings.
        </p>
        <strong>
          Exprience AWS cost optimization that pays for itself immediately.
        </strong>
      </div>
      <div className="flex flex-col space-y-2 items-start md:items-end">
        <Form />
      </div>
    </div>
  );
};

export default Description;
