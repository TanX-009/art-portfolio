"use client";

import CardService from "@/services/cards";
import { useState } from "react";

export default function useFetchCards(setter: Function) {
  const [isLoading, setIsLoading] = useState(false);

  const fetchCards = async () => {
    try {
      setIsLoading(true);
      const response = await CardService.get();
      setter(response.cards);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchCards };
}
