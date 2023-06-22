"use client";
import { Button } from "flowbite-react";
import { Aclonica } from "next/font/google";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion, Transition, Variants } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const transition: Transition = {
  duration: 1.5,
  ease: "linear",
};

const thought = Aclonica({ weight: "400", subsets: ["latin"] });

const MotionButton = motion(Button);

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
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="absolute w-screen flex flex-col gap-3 items-center justify-center h-screen z-10 bg-[rgba(255,255,255,0.82)]"
        >
          <motion.h1
            transition={transition}
            variants={item}
            className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-t from-teal-600 to-blue-400"
          >
            Donate Excess Food
          </motion.h1>
          <motion.p
            transition={transition}
            variants={item}
            className="p-3 text-2xl text-slate-600"
            style={thought.style}
          >{`" Don't waste food. someone is sleeping on an empty stomach "`}</motion.p>
          {data?.user?.role == "ORG" ? (
            <Link href={data?.user?.id ? "/my-requests" : "/sign-in"}>
              <MotionButton transition={transition} variants={item} size={"lg"}>
                Raise Request Now
              </MotionButton>
            </Link>
          ) : (
            <Link href={data?.user?.id ? "/my-posts" : "/sign-in"}>
              <MotionButton transition={transition} variants={item} size={"lg"}>
                Donate Now
              </MotionButton>
            </Link>
          )}
        </motion.div>
      </div>
    </main>
  );
}
