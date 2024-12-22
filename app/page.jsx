"use client"

import { redirect } from "next/navigation";
import Pokedex from "../public/components/pokedex";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => { if (typeof window !== 'undefined' && localStorage.getItem("user") === null) redirect("/login"); }, [])
  return <Pokedex />;
}
