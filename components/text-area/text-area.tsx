interface inputProps {
  _id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  labelClass?: string;
  className?: string;
  rows?: number;
}
const InputTextarea = ({
  _id,
  name,
  type,
  placeholder,
  label,
  labelClass,
  className,
  rows,
}: inputProps) => {
  return (
    <>
      <label htmlFor={_id} className={`text-black-800 ${labelClass}`}>
        {label}
      </label>{" "}
      <br />
      <textarea
        rows={rows ? rows : 5}
        placeholder={placeholder}
        id={_id}
        name={name}
        className={`outline-none mt-2 border border-black-400 p-2 w-full text-light-500 rounded-md ${className}`}
      />
    </>
  );
};
export default InputTextarea;
