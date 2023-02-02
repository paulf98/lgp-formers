// import Image from "next/image";
import Link from "next/link";
import { Landmark, LayoutDashboard, User } from "lucide-react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const router = useRouter();
  const session = useSession();

  const navItems: NavItemProps[] = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard />,
      href: "/",
    },
    {
      name: "Schools",
      icon: <Landmark />,
      href: "/schools",
    },
    {
      name: "Users",
      icon: <User />,
      href: "/users",
    },
  ];

  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="mt-2 ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
          {/* <a
            href="https://flowbite.com/"
            className="mb-5 flex items-center pl-2.5"
          >
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-7"
              alt="Flowbite Logo"
              width={24}
              height={24}
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Flowbite
            </span>
          </a> */}
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.name}
                {...item}
                active={router.pathname === item.href}
              />
            ))}
          </div>
          <button
            className="fixed bottom-2 left-0 w-full p-4 text-center underline"
            onClick={session.data ? () => void signOut() : () => void signIn()}
          >
            {session.data ? "Sign out" : "Sign in"}
          </button>
        </div>
      </aside>
    </>
  );
}

type NavItemProps = {
  name: string;
  href: string;
  active?: boolean;
  icon?: React.ReactNode;
};

const NavItem = ({ name, href, active = false, icon }: NavItemProps) => {
  const activeClass = active && "bg-gray-200 text-gray-900 dark:bg-gray-700";
  return (
    <Link
      href={href}
      className={[
        "flex items-center rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
        activeClass,
      ].join(" ")}
    >
      <span className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white">
        {icon}
      </span>
      <span className="ml-3">{name}</span>
    </Link>
  );
};
