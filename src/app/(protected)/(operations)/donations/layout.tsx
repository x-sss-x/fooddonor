"use client";
import {
  fetchIntialDonations,
} from "@/store/donations.slice";
import { useAppDispatch } from "@/utils/hooks";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const session = useSession();
  const data = session.data;

  const fetchMyMemoDonations = useCallback(() => {
    data?.user?.id && dispatch(fetchIntialDonations({ type: "FOOD" }));
  }, [data?.user?.id]);

  fetchMyMemoDonations();

  return <>{children}</>;
}
