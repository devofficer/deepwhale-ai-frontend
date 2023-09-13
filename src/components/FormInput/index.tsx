import { isErrorExist } from "@/utils/form";
import { useFormContext } from "react-hook-form";

interface IFormInput {
  type: string;
  name: string;
}

const FormInput = ({ type, name }: IFormInput) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const isError = isErrorExist(name, errors);

  return (
    <div className="w-full flex flex-col text-left">
      <input
        className={`
        border
        outline-none
        px-4 py-2
      bg-secondary-card-color
      text-secondary-card-text-color
      ${isError ? "border-red-500" : "border-primary-card-color"}
    `}
        type={type}
        {...register(name, { required: true })}
      />
      <span
        className={`text-red-500 text-xs ${isError ? "visible" : "invisible"}`}
      >
        This field is required
      </span>
    </div>
  );
};

export default FormInput;
