import { isErrorExist } from "@/utils/form";
import { useFormContext } from "react-hook-form";

interface IFormInput {
  label?: string;
  type: string;
  name: string;
}

const FormInput = ({ type, name, label }: IFormInput) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const isError = isErrorExist(name, errors);

  return (
    <div className="w-full flex flex-col text-left">
      <span className="block text-sm font-medium leading-6 dark:text-secondary-card-text-color text-primary-card-text-color">
        {label}
      </span>
      <input
        min="0"
        className={`
          rounded-md
          border-2
          outline-none
          px-3 py-1.5
          mt-2
          dark:bg-secondary-card-color
          dark:text-secondary-card-text-color
          bg-light
          text-primary-card-text-color
          focus:ring-1
          focus:ring-offset-2
          text-right
      ${
        isError
          ? "border-red-500 focus:ring-offset-light dark:focus:ring-offset-main focus:ring-red-500"
          : `border-secondary-card-color 
            focus:border-secondary-card-color-active 
            focus:ring-secondary-card-color-active 
            focus:ring-offset-light
            dark:border-primary-card-color 
            dark:focus:border-primary-card-color-active
            dark:focus:ring-primary-card-color-active
            dark:focus:ring-offset-main
          `
      }
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
