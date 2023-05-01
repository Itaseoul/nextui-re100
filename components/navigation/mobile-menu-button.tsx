"use client";
import { currentChatAtom } from "@/v2.3.0_re100run_bak_redux_legacy/atoms_ref/chat";
import { mobileMenuAtom } from "@/store/atoms/navigation";
import { useAtomValue, useSetAtom } from "jotai";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

const MobileMenuButton = () => {
  const showMobileMenu = useSetAtom(mobileMenuAtom);
  const currentChat = useAtomValue(currentChatAtom);
  return (
    <div className="sticky top-0 left-0 right-0 flex items-center px-4 py-1 bg-transparent sm:px-8 md:hidden">
      <Button
        title="Mobile Menu"
        className="-ml-4"
        onClick={() => {
          showMobileMenu((prev) => !prev);
        }}
        variant="ghost"
      >
        <Menu />
      </Button>
      {/* Current Chat Name */}
      <div className="w-full mr-10 text-center bg-transparent">
        <div className="text-sm font-medium dark:text-neutral-600">
          {currentChat?.title}
        </div>
      </div>
    </div>
  );
};

export default MobileMenuButton;
