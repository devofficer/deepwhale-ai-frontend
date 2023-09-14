import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import FormInput from "../components/FormInput";
import Select from "../components/Select";

interface IForm {
  usage: string;
  quantity: number;
}

const Form = () => {
  const methods = useForm<IForm>();

  // const handleSubmit = methods.handleSubmit((data) => {
  //   console.log(data);
  // });

  return (
    <FormProvider {...methods}>
      <form
        className="w-full flex flex-col space-y-2 items-end"
        noValidate
        onSubmit={(e) => e.preventDefault()}
      >
        <FormInput type="text" name="usage" />
        <FormInput type="number" name="quantity" />
        <Select />
      </form>
    </FormProvider>
  );
};

export default Form;