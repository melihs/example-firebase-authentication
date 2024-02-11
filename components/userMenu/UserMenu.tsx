"use client";
import {
  User,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { redirect } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/lib/firebaseConfig";

const UserMenu = () => {
  const [user] = useAuthState(auth);

  const handleSignOut = () => {
    typeof window !== "undefined" && sessionStorage.removeItem("user");
    signOut(auth);
    redirect("/login");
  };

  return (
    <Dropdown
      placement="bottom-end"
      className="inline-flex items-center gap-x-1 outline-0 focus:outline-0"
    >
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            src: (user?.photoURL as string) || "",
          }}
          className="flex-row-reverse transition-transform"
          name={user?.displayName}
        />
      </DropdownTrigger>
      <DropdownMenu
        className="rounded"
        aria-label="Profile Actions"
        variant="flat"
      >
        <DropdownItem onClick={() => handleSignOut()} color="default">
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserMenu;
