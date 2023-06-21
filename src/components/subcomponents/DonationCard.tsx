"use client";

import { DonationsProps, removeOnePost } from "@/store/donations.slice";
import { useAppDispatch } from "@/utils/hooks";
import { SupaClient } from "@/utils/supabase";
import { Avatar, Button, Card } from "flowbite-react";
import moment from "moment";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";

export default function DonationCard({
  feed,
  requestPost,
  viewUser,
  deletePost,
}: {
  feed: DonationsProps;
  requestPost?: boolean;
  viewUser?: boolean;
  deletePost?: boolean;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useAppDispatch();

  const onDelete = async () => {
    setIsProcessing(true);
    const responseList = await SupaClient.from("List")
      .delete()
      .eq("postsId", feed.id);
    const responsePost = await SupaClient.from("Posts")
      .delete()
      .eq("id", feed.id);

    if (!responseList.error && !responsePost.error)
      dispatch(removeOnePost(feed.id));
    setIsProcessing(false);
  };

  return (
    <Card className="flex flex-col justify-between">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-lg font-bold leading-none text-slate-600 dark:text-white">
          {requestPost ? "Request Posted" : "Donation Posted"}
        </h5>

        <p className="text-sm text-slate-600">
          {moment(feed.createdAt).fromNow()}
        </p>
      </div>
      <div className="flex flex-col h-full justify-between">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {feed.List.map((list) => (
            <li key={list.id} className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="shrink-0">
                  <AiOutlineCheck className="rounded-full text-xl" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-md font-medium text-gray-900 dark:text-white">
                    {list.name}
                  </p>
                </div>
                <div className="inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                  {list.quantity}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {viewUser && (
          <div className="flex gap-2 py-3">
            <Avatar
              className="border-2 border-teal-500 h-fit rounded-full"
              alt="User settings"
              img={feed.User.image ?? undefined}
              rounded
            />
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-medium">{feed.User.name}</h2>
              <h2 className="text-sm">
                {feed.User.phone ?? "Contact No. Unavailable"}
              </h2>
              <h2 className="text-sm">{feed.User.email}</h2>
            </div>
          </div>
        )}
        {deletePost && (
          <div className="flex gap-2 py-3 w-full">
            <Button
              fullSized
              color={"red"}
              isProcessing={isProcessing}
              onClick={onDelete}
            >
              <AiOutlineDelete className="text-xl mr-3" />
              Remove
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
