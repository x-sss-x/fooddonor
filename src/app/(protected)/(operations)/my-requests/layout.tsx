"use client";
import { fetchMyDonations } from "@/store/donations.slice";
import { useAppDispatch } from "@/utils/hooks";
import { useSession } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const session = useSession();
  const data = session.data;

  data?.user?.id &&
    dispatch(fetchMyDonations({ id: data?.user.id, type: "RESOURCE" }));

  return <>{children}</>;
}
