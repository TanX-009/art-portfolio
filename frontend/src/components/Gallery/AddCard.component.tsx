import React, { ChangeEvent, FormEvent, useState } from "react";
import CustomFileInput from "../Form/CustomFileInput.commponent";
import Image from "next/image";
import { IoImage } from "react-icons/io5";
import CustomInput from "../Form";
import { FaCheck } from "react-icons/fa";
import CardService from "@/services/cards";
import parseLink from "@/utils/parseLink";

type TProps = {
  updateTick: Function;
  setIsAdding: Function;
  id?: string;
  defaultImage?: string;
  defaultName?: string;
  defaultDate?: string;
  update?: boolean;
};

export default function AddCard({
  updateTick,
  setIsAdding,
  id,
  defaultImage = "",
  defaultName = "",
  defaultDate = "",
  update = false,
}: TProps) {
  const [selectedImage, setSelectedImage] = useState(
    defaultImage === "" ? "" : parseLink(defaultImage),
  );
  const [selectedFile, setSelectedFile] = useState<File>();

  const [form, setForm] = useState({
    id: id,
    name: defaultName,
    image: defaultImage,
    date: defaultDate,
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(e.target.files[0]);
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value || !e.target.name) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    formData.append("data", JSON.stringify(form));

    if (update) {
      await CardService.update(formData);
    } else {
      await CardService.add(formData);
    }
    setIsAdding(false);
    updateTick((val: boolean) => !val);
  };

  return (
    <div className="p-5 flex flex-col sm:flex-row justify-between gap-2 bg-background-100">
      <div className="w-full sm:w-1/2 aspect-[7/5] nxt-img flex flex-col justify-center items-center relative rounded overflow-hidden">
        {selectedImage !== "" ? (
          <Image
            src={selectedImage}
            alt="SelectedImage"
            fill
            sizes="(max-width: 1920px) 17.1354vw, 17.1354vw"
          />
        ) : (
          <IoImage className="text-9xl" />
        )}
      </div>
      <form
        className="w-full sm:w-1/2 flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <CustomFileInput
          accept=".jpg, .png, .jpeg, svg"
          placeholder="Select art image"
          name="artImage"
          onChange={handleFileChange}
          required={!update}
        />
        <CustomInput
          name="name"
          defaultValue={defaultName}
          label=""
          placeholder="Enter name of art"
          onChange={handleFormChange}
          required={!update}
        />
        <CustomInput
          name="date"
          defaultValue={defaultDate}
          label=""
          type="date"
          placeholder="Enter date of art"
          onChange={handleFormChange}
          required={!update}
        />
        <button
          className="px-2 py-1 flex gap-2 items-center justify-center bg-secondary-500 rounded hover:bg-secondary-400"
          type="submit"
        >
          <FaCheck />
          {update ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}
