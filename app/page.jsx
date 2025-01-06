"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Pokedex from "../public/components/pokedex";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("user") === null)
      router.replace("/login");
  }, []);
  return <Pokedex />;
}
