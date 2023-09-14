import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import FormInput from "../FormInput";
import Button from "../Button";
import Select from "../Select";

interface IForm {
  usage: string;
  quantity: number;
}

const Form = () => {
  const methods = useForm<IForm>();

  const handleSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FormProvider {...methods}>
      <form
        className="w-full flex flex-col space-y-2 items-end"
        noValidate
        onSubmit={(e) => e.preventDefault()}
      >
        <p>blablablalbl</p>
        <div>
          <FormInput type="text" name="usage" />
          <FormInput type="number" name="quantity" />
          {/* <Select /> */}
          <Button label="Calculate" handler={handleSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default Form;
