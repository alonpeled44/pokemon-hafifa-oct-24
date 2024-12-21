import { useRouter } from "next/navigation";
import { useUser } from "../context/userContext";

export default function LogOut() {
  const Router = useRouter();
  const { user, setUser } = useUser();
  const handleLogOut = () => {
    setUser("");
    Router.push("./login");
  };
  return (
    <button type="button" onClick={handleLogOut}>
      Log out
    </button>
  );
}
