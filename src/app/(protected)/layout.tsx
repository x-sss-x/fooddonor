"use client";
import { Navbar, Button, Avatar, Dropdown, Spinner, Badge } from "flowbite-react";
import { Imbue } from "next/font/google";
import Link from "next/link";
import { useUser } from "../UserProvider";
import { signOut, useSession } from "next-auth/react";

const logoFont = Imbue({ weight: "700", subsets: ["vietnamese"] });

export default function RootLayout({
  children,
  modals,
}: {
  children: React.ReactNode;
  modals: React.ReactNode;
}) {
  const { data, status } = useSession();

  console.log(data);

  return (
    <>
      {modals}
      <Navbar
        className="fixed z-50 bg-[transparent_!important] w-screen top-0"
        fluid
        rounded
      >
        <Navbar.Brand as={Link} href="/">
          <span
            style={logoFont.style}
            className="self-center text-teal-600 whitespace-nowrap text-3xl font-semibold dark:text-white"
          >
            D.E.F
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <div className="flex gap-10 items-center">
          <Navbar.Collapse>
            <Navbar.Link active href="#" className="text-lg">
              Donate
            </Navbar.Link>
            <Navbar.Link href="#" className="text-lg">
              About
            </Navbar.Link>
          </Navbar.Collapse>
          <div className="flex md:order-2 pr-5">
            {status == "loading" ? (
              <Spinner />
            ) : data?.user?.id ? (
              <Dropdown
                inline
                label={
                  <Avatar
                    className="border-2 border-teal-500 rounded-full"
                    alt="User settings"
                    img={data.user.image!}
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{data.user.name}</span>
                  <span className="block truncate text-sm font-medium">
                    {data.user.email}
                  </span>
                  <Badge className="w-fit self-center block">{data.user.role=="DONOR"?"Donor":"Organization"}</Badge>
                </Dropdown.Header>
                <Dropdown.Item onClick={() => signOut({ redirect: false })}>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            ) : (
              <Link href="/sign-in">
                <Button size={"sm"}>Signin</Button>
              </Link>
            )}
          </div>
        </div>
      </Navbar>
      {children}
    </>
  );
}
