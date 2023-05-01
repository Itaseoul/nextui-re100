"use client";
import { mobileMenuAtom } from "@/store/atoms/navigation";
import { useAtom } from "jotai";
import { Plus } from "lucide-react";
import Logo from "../brand/logo";
import { Button } from "../ui/button";
import ProfileMenu from "./profile-menu";

const Sidebar = () => {
  const [isMobileMenuOpen, showMobileMenu] = useAtom(mobileMenuAtom);

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 w-64 px-4 py-8 transition-transform -translate-x-full shadow-md md:translate-x-0 dark:border-neutral-800 border-neutral-200 bg-white dark:bg-neutral-950 dark:text-neutral-50 ${isMobileMenuOpen ? " !translate-x-0" : " "
        }`}
    >
      <div className="flex flex-col flex-1 h-full max-w-full">
        {/* Header */}
        <div>
          <Logo className="max-w-[90px]" />
          {/* New Chat Button */}
          <Button
            onClick={() => {
              showMobileMenu(false);
            }}
            variant="subtle"
            className="flex-shrink-0 w-full mt-8 sm:mt-16"
          >
            에너지<Plus size="16" />
          </Button>
        </div>
        <div className="flex flex-col h-full mt-4 overflow-hidden">
          발전량
        </div>
        {/* Footer */}
        <div className="flex-1 mt-10">
          <ProfileMenu />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
