import CardService from "@/services/cards";
import { formatDate } from "@/utils/dateUtils";
import parseLink from "@/utils/parseLink";
import Image from "next/image";
import React, { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import AddCard from "./AddCard.component";
import GradientTXT from "../Heading/GradientTXT.component";

type TProps = {
  id: string;
  image: string;
  name: string;
  date: string;
  updateTick: Function;
};

export default function AdminCard({
  id,
  image,
  name,
  date,
  updateTick,
}: TProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    await CardService.delete(id).then((data) => {
      if (data.status === "SUCESS") {
        updateTick((val: boolean) => !val);
      }
    });
  };

  if (isEditing) {
    return (
      <AddCard
        updateTick={updateTick}
        setIsAdding={setIsEditing}
        id={id}
        defaultDate={date}
        defaultName={name}
        defaultImage={image}
        update
      />
    );
  }

  return (
    <div className="w-full p-5 rounded bg-background-100 flex flex-col sm:flex-row justify-between gap-2">
      {/* image */}
      <div className="w-48 mr-3 rounded overflow-hidden aspect-[7/5] nxt-img relative">
        <Image
          src={parseLink(image)}
          alt={name}
          fill
          sizes="(max-width: 1920px) 17.1354vw, 17.1354vw"
        />
      </div>

      {/* name and date */}
      <div className="w-full flex flex-col items-start justify-start">
        <p className="text-2xl">
          <GradientTXT gradient="from-accent-500 to-secondary-500">
            {name}
          </GradientTXT>
        </p>
        <p>{formatDate(new Date(date))}</p>
      </div>

      {/* control buttons */}
      <div className="flex flex-row sm:flex-col items-start gap-5">
        <button
          className="w-full px-2 py-1 rounded flex items-center gap-2 bg-primary-300 hover:bg-primary-200"
          type="button"
          onClick={handleEdit}
        >
          <MdOutlineEdit />
          Edit
        </button>
        <button
          className="w-full sm:w-fit px-2 py-1 rounded flex items-center gap-2 bg-accent-300 hover:bg-accent-200"
          type="button"
          onClick={handleDelete}
        >
          <BiTrash />
          Delete
        </button>
      </div>
    </div>
  );
}
