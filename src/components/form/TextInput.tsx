type InputType =
  | "text"
  | "password"
  | "number"
  | "email"
  | "date"
  | "checkbox"
  | "radio"
  | "file"
  | "submit"
  | "button"
  | "color"
  | "range"
  | "hidden"
  | "image"
  | "tel"
  | "url"
  | "datetime-local";

const TextInput: React.FC<{
  label: string;
  name: string;
  register: unknown;
  errors: unknown;
  isRequired?: boolean;
  type?: InputType;
  className?: string;
  defaultValue?: string;
}> = ({
  label,
  name,
  register,
  errors,
  isRequired = true,
  type = "text",
  className = "sm:col-span-2",
  defaultValue = "",
}) => {
  return (
    <div className={className}>
      {" "}
      <label
        htmlFor={name}
       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          {
                // @ts-expect-error: Ignoring TypeScript error for unknown error type
            ...register(`${name}`, { required: isRequired })}
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
          autoComplete={name}
          className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"          placeholder={`Type the ${label.toLowerCase()}`}
        />
        {
            // @ts-expect-error: Ignoring TypeScript error for unknown error type
        errors[`${name}`] && (
          <span className="text-sm text-red-600 ">{label} is required</span>
        )}
      </div>
    </div>
  );
};
export default TextInput;