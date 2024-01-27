import React, { ReactNode } from "react";

type TProps = {
  children: ReactNode;
  gradient?: string;
};

export default function GradientTXT({
  children,
  gradient = "from-primary-500 to-accent-500",
}: TProps) {
  return (
    <span
      className={
        `w-fit font-black ` +
        `bg-gradient-to-r ${gradient} bg-clip-text text-transparent`
      }
    >
      {children}
    </span>
  );
}
