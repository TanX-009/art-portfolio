"use client";

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../layout";
import { useRouter } from "next/navigation";
import useFetchCards from "@/hooks/fetchCards";
import AdminCard from "@/components/Gallery/AdminCard.component";
import GradientTXT from "@/components/Heading/GradientTXT.component";
import { FaEdit, FaPlus } from "react-icons/fa";
import CardService from "@/services/cards";
import AddCard from "@/components/Gallery/AddCard.component";
import Loading from "@/components/Loader";

export default function Admin() {
  const { context } = useContext(Context)!;
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const [cards, setCards] = useState([]);

  const [tick, updateTick] = useState(false);

  const handleAdd = () => {
    setIsAdding((val: boolean) => !val);
  };

  useEffect(() => {
    CardService.get().then((data) => {
      setCards(data.cards);
    });
  }, [tick]);

  useEffect(() => {
    if (!context.isLoggedIn) {
      router.push("/");
    }
  }, [context.isLoggedIn, router, tick]);

  if (!context.isLoggedIn) {
    return <Loading />;
  }
  return (
    <div className="max-w-screen-lg px-5 mx-auto mb-16 mt-4 w-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl my-3 hidden sm:block">
          <GradientTXT>Manage Art</GradientTXT>
        </h1>

        <span className="text-secondary-500 text-3xl sm:hidden">
          <FaEdit />
        </span>

        <button
          className="py-1 px-2 rounded flex items-center gap-2 bg-primary-300 hover:bg-primary-200"
          type="button"
          onClick={handleAdd}
        >
          <FaPlus />
          Add
        </button>
      </div>

      <div className="w-full sm:w-[640px] mx-auto mt-7 flex flex-col gap-2">
        {isAdding ? (
          <AddCard updateTick={updateTick} setIsAdding={setIsAdding} />
        ) : (
          ""
        )}

        {cards.length > 0 ? (
          cards.map(
            (
              card: { name: string; image: string; id: string; date: string },
              key,
            ) => {
              return (
                <AdminCard
                  key={key}
                  updateTick={updateTick}
                  id={card.id}
                  name={card.name}
                  image={card.image}
                  date={card.date}
                />
              );
            },
          )
        ) : (
          <h2 className="text-2xl text-center">
            <GradientTXT gradient="from-accent-500 to-secondary-500">
              No art added!
            </GradientTXT>
          </h2>
        )}
      </div>
    </div>
  );
}
