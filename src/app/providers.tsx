"use client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { SessionProvider } from "next-auth/react";
import UserProvider from "./UserProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider {...{ store }}>
        <SessionProvider refetchInterval={5 * 60}>
          <UserProvider>{children}</UserProvider>
        </SessionProvider>
    </Provider>
  );
}
