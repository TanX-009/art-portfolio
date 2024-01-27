"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card.component";
import useFetchCards from "@/hooks/fetchCards";
import Loading from "../Loader";

export default function Gallery() {
  const [cards, setCards] = useState([]);
  const { isLoading, fetchCards } = useFetchCards(setCards);

  useEffect(() => {
    fetchCards();
  }, []);

  if (isLoading) {
    return "Loading...";
  }
  return (
    <div className="flex flex-col gap-8">
      {cards.length > 0 ? (
        cards.map(
          (card: { name: string; image: string; date: string }, key) => {
            return (
              <Card
                key={key}
                name={card.name}
                image={card.image}
                variant={key % 2 === 0 ? "left" : "right"}
                date={new Date(card.date)}
              ></Card>
            );
          },
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}
