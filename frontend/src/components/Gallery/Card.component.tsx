import { formatDate } from "@/utils/dateUtils";
import parseLink from "@/utils/parseLink";
import Image from "next/image";
import React from "react";
import GradientTXT from "../Heading/GradientTXT.component";

type TProps = {
  variant: string;
  date: Date;
  name: string;
  image: string;
};

export default function Card({ variant, date, name, image }: TProps) {
  return (
    <div
      className={`w-full flex sm:flex-row ${variant === "right" ? "flex-col-reverse" : "flex-col"
        } p-2`}
    >
      {/* left date */}
      {variant === "right" ? (
        <div className="w-full sm:w-1/2 flex items-center justify-start sm:justify-center text-xl sm:text-3xl">
          {formatDate(date)}
        </div>
      ) : (
        ""
      )}

      {/* card */}
      <div className={`w-full sm:w-1/2 aspect-[7/5]`}>
        <div className="h-4/5 mt-1 w-full nxt-img relative overflow-hidden">
          <Image
            src={parseLink(image)}
            alt={name}
            fill
            sizes="(max-width: 1920px) 17.1354vw, 17.1354vw"
          />
        </div>
        <div className="h-1/5 w-full text-3xl">
          <GradientTXT gradient="from-accent-500 to-secondary-500">
            {name}
          </GradientTXT>
        </div>
      </div>

      {/* right date */}
      {variant === "left" ? (
        <div className="w-full sm:w-1/2 flex items-center justify-start sm:justify-center text-xl sm:text-3xl">
          {formatDate(date)}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
