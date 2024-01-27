import React, { ChangeEvent, ChangeEventHandler, useState } from "react";

type TProps = {
  accept: string;
  placeholder: string;
  name: string;
  required: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function CustomFileInput({
  accept,
  placeholder,
  name,
  required,
  onChange,
}: TProps) {
  const [selectedFile, setSelectedFile] = useState("No file selected");

  return (
    <div className="relative w-full h-fit p-2 rounded bg-primary-300">
      <div className="h-fit flex items-center gap-2">
        <div className="p-2 text-nowrap bg-secondary-500 rounded">
          Choose file
        </div>
        <div className="overflow-hidden">{selectedFile}</div>
      </div>
      <input
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        type="file"
        accept={accept}
        id={placeholder}
        name={name}
        required={required}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange(e);

          if (!e.target.files) return;
          setSelectedFile(e.target.files[0].name);
        }}
      />
    </div>
  );
}
