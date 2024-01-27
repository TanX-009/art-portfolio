"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import CustomInput from "../Form";
import AuthService from "@/services/auth";
import { Context } from "@/app/(wrap)/layout";
import { useRouter } from "next/navigation";
import Loading from "../Loader";

async function handleLogin(password: string, setContext: Function) {
  const response = await AuthService.login({ password: password });

  if (response.status === "SUCESS") {
    setContext({ isLoggedIn: true });
  }
}

export default function Auth() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const { context, setContext } = useContext(Context)!;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (context.isLoggedIn) {
      router.push("/admin");
    }
  }, [context.isLoggedIn, router]);

  if (context.isLoggedIn) {
    return <Loading />;
  }

  return (
    <div className="w-80 h-fit p-2 bg-background-100 rounded">
      <h1 className="w-full mb-3 text-xl">Admin Login</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(password, setContext);
        }}
      >
        <CustomInput
          name={"Password"}
          label={"Password"}
          onChange={handleOnChange}
          required={true}
        />
        <button className="p-1 bg-secondary-500 rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
