"use client";
import DonationCard from "@/components/subcomponents/DonationCard";
import { DonationsSelector } from "@/store/donations.slice";
import { useAppSelector } from "@/utils/hooks";
import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";

export default function MyPosts() {
  const Donations = useAppSelector(DonationsSelector.selectAll);

  return (
    <div className="py-10 w-full">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-semibold text-slate-700">Your Requests Posts</h1>
        <Link href={"/add-request"}>
          <Button>Raise Request</Button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Donations.map((feed) => (
          <DonationCard deletePost requestPost key={feed.id} feed={feed} />
        ))}
      </div>
    </div>
  );
}
