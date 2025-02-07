"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../layout";
import LoginForm from "../../public/components/loginForm";

export default function Index() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("user_id"))
      router.push("/");

    fetchData();
  }, []);

  return <LoginForm users={users} />;
}
