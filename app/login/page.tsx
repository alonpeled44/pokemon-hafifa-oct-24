"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import LoginForm from "../../public/components/loginForm";

export default function Index() {
  const router: AppRouterInstance = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("user") !== null)
      router.push("/");
  }, []);
  return <LoginForm />;
}
