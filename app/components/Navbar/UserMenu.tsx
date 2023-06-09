"use client";

import { FC, useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";

import useRegisterModal from "@/app/Hooks/useRegisterModal";
import useLoginModal from "@/app/Hooks/useLoginModal";
import useRentModal from "@/app/Hooks/useRentModal";
import { useRouter } from "next/navigation";
interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onRentClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRentClick}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnext Your Home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full hover:shadow-md transition cursor-pointer"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My Trips"
                />
                <MenuItem onClick={() => router.push('/favorites')} label="My Favorites" />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My Reservations"
                />
                <MenuItem onClick={() => router.push('/properties')} label="My Properties" />
                <MenuItem onClick={rentModal.onOpen} label="AirbNext My Home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
