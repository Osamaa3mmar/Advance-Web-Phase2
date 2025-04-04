import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormGroup from "../FormGourp/FormGroup";
import SelectBox from "../selectBox/SelectBox";
import { toast } from "react-hot-toast";

export default function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [staySignedIn, setStaySignedIn] = useState(false);
  const colors = {
    charcoal: "#383434",
    neonGreen: "#22c55e",
    darkBg: "#1e1e1e",
    cardDark: "#0f0f0f",
    forBTN: "#50ac4c",
  };

  const login = function () {
    const users = JSON.parse(localStorage.getItem("users"));
    JSON.stringify(localStorage.setItem("stay", staySignedIn));
    if (!users) {
      toast.error("User Not Found !");
    } else {
      const currentUser = users.find((user) => {
        return user.username === username;
      });

      if (currentUser) {
        if (currentUser.password == password) {
          localStorage.setItem("currentUser", JSON.stringify(currentUser));

          toast.success("Signed in successfully !");
          navigate("/main/home");
        } else {
          toast.error("Wrong Password !");
        }
      } else {
        toast.error("User Not Found !");
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: colors.charcoal }}
    >
      <div
        className="rounded-2xl shadow-[0px_0px_10px_black] w-full max-w-md text-white border-4"
        style={{
          backgroundColor: colors.darkBg,
          borderColor: colors.charcoal,
          padding: "30px",
        }}
      >
        <form autoComplete="off" className="space-y-2">
          <h1 className="text-4xl font-semibold">Sign In</h1>

          <FormGroup
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            name="username"
            id="username"
          />
          <FormGroup
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            id="password"
          />

          <SelectBox
            checked={staySignedIn}
            onChange={() => {
              setStaySignedIn(!staySignedIn);
            }}
          />

          <input
            onClick={() => {
              login();
            }}
            value="Sign In"
            className="text-center w-full text-lg font-medium cursor-pointer mt-2 outline-none 
              border border-gray-700 rounded-md px-4 py-2 border-2 border-transparent 
              transition duration-400 hover:border-gray-300"
            style={{ backgroundColor: colors.forBTN }}
          />
          <p
            className="text-center text-sm text-gray-400"
            onClick={() => {
              navigate("/signup", { state: { from: "/" } });
            }}
          >
            Dont have an account ?
            <span className="text-blue-500 cursor-pointer hover:underline">
              signUp
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
