"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../../public/components/loginForm";

export interface User {
  id: number;
  username: string;
  password: string;
}

export default function Index() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("user") !== null)
      router.push("/");

    const fetchData = async () => {
      try {
        const response = await fetch("/api/db");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
      } catch (err: any) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

  return <LoginForm users={users} />;
}
