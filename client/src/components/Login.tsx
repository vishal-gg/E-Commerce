import React, { useState } from "react";
import { signIn } from "../features/authSlice";
import { useAppDispatch, useAppSelector } from "../types/storeType";
import { toast } from "react-hot-toast";
import RegisterScreen from "./Register";
import { motion } from "framer-motion";

interface propsType {
  setActiveSignInModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginScreen = ({ setActiveSignInModel }: propsType) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isLogIn, setIsLogIn] = useState(true);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.Authentication);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }
    const res = await dispatch(signIn({ email, password }));
    if (res.type.split("/").pop() === "fulfilled") {
      localStorage.removeItem("selectedItems");
      setActiveSignInModel(false);
      toast.success("logged In successfully");
    }
  };

  const handleDemoLogin = async () => {

    const demoEmail = 'test@gmail.com'
    const demoPassword = 'test@00'
    
    setEmail(demoEmail)
    setPassword(demoPassword)
    
    const res = await dispatch(signIn({ email: demoEmail, password: demoPassword }));
    if (res.type.split("/").pop() === "fulfilled") {
      localStorage.removeItem("selectedItems");
      setActiveSignInModel(false);
      toast.success("logged In successfully");
    }
  };

  return (
    <motion.div
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
      initial="hidden"
      animate="show"
      className="flex items-center justify-center bg-black/50 backdrop-blur-sm fixed inset-0"
    >
      {isLogIn ? (
        <motion.div
          initial={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          className="bg-white p-8 rounded-lg shadow-md relative dark:bg-gray-700"
        >
          <span
            className="absolute -top-3 py-1 -right-3 bg-white rounded-full cursor-pointer hover:bg-red-500 text-red-500 hover:text-white transition-colors px-1 shadow-md"
            onClick={() => setActiveSignInModel(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 relative">
              <label
                htmlFor="email"
                className="block font-medium text-sm text-gray-700 ml-1 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full pl-4 pr-8 py-2 border rounded-md focus:outline-none focus:border-blue-400 dark:text-black"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="gray"
                className="w-5 h-5 absolute right-2 top-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <div className="mb-3 relative">
              <label
                htmlFor="password"
                className="block font-medium text-sm text-gray-700 ml-1 dark:text-white"
              >
                Password
              </label>
              <input
                type={hidePassword ? "password" : "text"}
                id="password"
                className="w-full pl-4 pr-8 py-2 border rounded-md focus:outline-none focus:border-blue-400 dark:text-black"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-8"
                onClick={() => setHidePassword((prev) => !prev)}
              >
                {!hidePassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="gray"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="gray"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>
            <button
              disabled={loading}
              type="submit"
              className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2 ${
                loading && "opacity-50"
              }`}
            >
              Login
            </button>
          </form>
          <div className="text-center text-sm mt-3">
            <span>
              Don't have an account?{" "}
              <span
                onClick={() => setIsLogIn(false)}
                className="hover:text-blue-600 text-blue-500 dark:text-yellow-400 cursor-pointer"
              >
                register
              </span>
            </span>
            <p>or</p>
            <button
              className="bg-red-500 hover:bg-red-600 text-sm text-white font-medium p-1 px-2 mt-1 rounded-sm"
              onClick={handleDemoLogin}
            >
              use demo account
            </button>
          </div>
        </motion.div>
      ) : (
        <RegisterScreen
          setActiveSignInModel={setActiveSignInModel}
          setIsLogIn={setIsLogIn}
        />
      )}
    </motion.div>
  );
};

export default LoginScreen;
