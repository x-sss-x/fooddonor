"use client";
import { Button } from "flowbite-react";
import { Aclonica } from "next/font/google";
import Link from "next/link";
import { useSession } from "next-auth/react";

const thought = Aclonica({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const session = useSession();
  const data = session.data;

  return (
    <main className="flex min-h-screen flex-col min-w-screen">
      <div className="relative  h-screen w-screen bg-[rgba(255,255,255,0.82)] z-10">
        <video
          className="absolute  h-full w-full top-0 left-0 object-cover"
          autoPlay
          muted
          loop
        >
          <source
            src="/bgvedio.mp4"
            type="video/mp4"
            className="h-full w-full"
          />
        </video>
        <div className="absolute w-screen flex flex-col gap-3 items-center justify-center h-screen z-10 bg-[rgba(255,255,255,0.82)]">
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-t from-teal-600 to-blue-400">
            Donate Excess Food
          </h1>
          <p
            className="p-3 text-2xl text-slate-600"
            style={thought.style}
          >{`" Don't waste food. someone is sleeping on an empty stomach "`}</p>
          {data?.user?.role == "ORG" ? (
            <Link href={data?.user?.id ? "/my-requests" : "/sign-in"}>
              <Button size={"lg"}>Raise Request Now</Button>
            </Link>
          ) : (
            <Link href={data?.user?.id ? "/my-posts" : "/sign-in"}>
              <Button size={"lg"}>Donate Now</Button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
