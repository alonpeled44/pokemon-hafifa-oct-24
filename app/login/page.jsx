"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../../public/components/loginForm";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("user") !== null)
      router.replace("/");
  }, []);
  return <LoginForm />;
}
