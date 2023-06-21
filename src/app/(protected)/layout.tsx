"use client";
import {
  Navbar,
  Button,
  Avatar,
  Dropdown,
  Spinner,
  Badge,
} from "flowbite-react";
import { Aclonica } from "next/font/google";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { BiDonateHeart } from "react-icons/bi";

const logoFont = Aclonica({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
  modals,
}: {
  children: React.ReactNode;
  modals: React.ReactNode;
}) {
  const { data, status } = useSession();
  const pathname = usePathname();

  console.log(data);

  return (
    <>
      {modals}
      <Navbar
        border={pathname !== "/"}
        className={
          " z-50 w-screen top-0 fixed " +
          (pathname !== "/" ? "bg-white" : "bg-[transparent_!important]")
        }
        fluid
      >
        <Navbar.Brand as={Link} href="/" className="space-x-2">
          <BiDonateHeart className="text-4xl text-teal-600" />
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
            {data?.user?.role == "DONOR" ? (
              <>
                <Navbar.Link as={Link} href="/requests" active={pathname.startsWith("/requests")} className="text-lg">
                  {"Requests By Ashram's"}
                </Navbar.Link>
                <Navbar.Link
                  as={Link}
                  active={pathname.startsWith("/my-posts")}
                  href="/my-posts"
                  className="text-lg"
                >
                  My Donations
                </Navbar.Link>
              </>
            ) : data?.user?.role == "ORG" ? (
              <>
                <Navbar.Link
                  as={Link}
                  active={pathname.startsWith("/donations")}
                  href="/donations"
                  className="text-lg"
                >
                  {"Donations By Donor's"}
                </Navbar.Link>
                <Navbar.Link active={pathname.startsWith("/my-requests")} as={Link} href="/my-requests" className="text-lg">
                  My requests
                </Navbar.Link>
              </>
            ) : null}
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
                  <Badge className="w-fit self-center block">
                    {data.user.role == "DONOR" ? "Donor" : "Organization"}
                  </Badge>
                </Dropdown.Header>
                <Dropdown.Item onClick={() => signOut()}>
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
      <div className="h-full w-full overflow-y-scroll overflow-x-hidden">
        {children}
      </div>
    </>
  );
}
