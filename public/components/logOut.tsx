import { useRouter } from "next/navigation";

interface Props {
  user: string;
}

export default function LogOut({ user }: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        localStorage.clear();
        router.push("/login");
      }}
    >
      {user !== "Guest" ? "Log out" : "Log In"}
    </button>
  );
}
