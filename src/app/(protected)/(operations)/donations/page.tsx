"use client";
import DonationCard from "@/components/subcomponents/DonationCard";
import { DonationsSelector } from "@/store/donations.slice";
import { useAppSelector } from "@/utils/hooks";
import Link from "next/link";
import React from "react";
import { AnimatePresence } from "framer-motion";

export default function MyPosts() {
  const Donations = useAppSelector(DonationsSelector.selectAll);

  return (
    <div className="py-10 w-full">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-semibold text-slate-700">
          Latest Raised Donations
        </h1>
        <Link href={"/add-donation"}>{/* <Button>Donate Food</Button> */}</Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout" key={"donations"}>
          {Donations.map((feed) => (
            <DonationCard viewUser key={"donations-"+feed.id} feed={feed} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
