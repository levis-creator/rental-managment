export default function SelectInput({
    label,
    name,
    register,
    className = "sm:col-span-2",
    options = [],
    multiple = false,
    display="title",
    value="id"
  }: {
    label: string;
    name: string;
    register: any;
    className?: string;
    options: any[];
    display:string;
    multiple?: boolean;
    value?:string;
  }) {
    return (
      <div className={className}>
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-slate-800 dark:text-slate-50"
        >
          {label}
        </label>
        <div className="mt-2 w-full">
          <select
            {...register(`${name}`)}
            id={name}
            name={name}
            multiple={multiple}
            className="block w-full dark:bg-slate-800 dark:text-slate-50 rounded-md border-0 py-2 text-slate-800 shadow-sm ring-1 ring-inset ring-slate-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            {/* <option value="null">N/A</option> */}
            {options.map((option, i) => {
              return (
                <option key={i} value={option[value]}>
                  {option[`${display}`]}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }