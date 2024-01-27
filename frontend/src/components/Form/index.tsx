import React, { ChangeEventHandler } from "react";

type TProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  onChange: ChangeEventHandler;
  required: boolean;
  defaultValue?: string | number;
};

export default function CustomInput({
  name,
  label,
  type = "text",
  placeholder = "",
  onChange,
  required,
  defaultValue = "",
}: TProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        defaultValue={defaultValue}
        className="p-1 outline-none border-none bg-primary-300 rounded"
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        id={name}
        required={required}
      />
    </div>
  );
}
