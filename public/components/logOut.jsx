import { useRouter } from "next/navigation";

export default function LogOut() {
  const router = useRouter();
  const handleClick = () => {
    localStorage.removeItem("user");
    router.replace("/login");
    router.refresh();
  };

  return (
    <button type="button" onClick={handleClick}>
      {localStorage.getItem("user") !== "Guest" ? "Log out" : "Log In"}
    </button>
  );
}
