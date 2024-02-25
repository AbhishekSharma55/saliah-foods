import Image from "next/image";

interface inputProps {
  _id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  labelClass?: string;
  className?: string;
  topClass?: string;
  rest?: any;
  defaultValue?: any;
  onChange?: any;
}
const InputField = ({
  _id,
  name,
  type,
  placeholder,
  label,
  labelClass,
  className,
  defaultValue, onChange,
  topClass, ...rest
}: inputProps) => {
  return (
    <>
      <div className={`w-full ${topClass}`}>
        {label && (
          <label htmlFor={_id} className={`text-black-800  whitespace-nowrap ${labelClass}`}>
            {label}
          </label>
        )}
        <br />
        <div className="relative w-full">
          <input
            type={type}
            placeholder={placeholder}
            id={_id}
            name={name}
            defaultValue={defaultValue}
            className={`outline-none mt-2 border border-black-400 p-2 w-full text-light-500 rounded-md ${className}`}
            onChange={onChange}
            {...rest}
          />
          {type === "password" && (
            <Image
              src="/svg/eyeClosed.svg"
              alt="eye"
              width={18}
              height={18}
              className="absolute right-2 top-5 cursor-pointer"
            />
          )}
        </div>
      </div>
    </>
  );
};
export default InputField;
