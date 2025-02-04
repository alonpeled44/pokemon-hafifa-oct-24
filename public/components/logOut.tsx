import { useRouter } from "next/navigation";

export default function LogOut({ user }: { user: string }) {
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
