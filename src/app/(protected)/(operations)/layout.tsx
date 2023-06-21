import { NextAuthOptions } from "@/utils/NextAuth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(NextAuthOptions);

  if (!session?.user) redirect("/");
  
  return (
    <div
      className={
        "flex min-h-screen bg-gradient-to-t from-teal-600/25 to-transparent flex-col items-center pt-[64px] px-32 py-12 w-full h-fit"
      }
    >
      {children}
    </div>
  );
}
