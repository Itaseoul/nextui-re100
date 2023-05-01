"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const Logo = ({ className }: { className?: string }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <Image
        className={className + " hidden dark:block"}
        width={296}
        height={90}
        src="/re100run-logo-green-1.svg"
        alt="re100run-logo"
      />
      <Image
        className={className + " dark:hidden"}
        width={296}
        height={90}
        src="/re100run-logo-green-1.svg"
        alt="re100run-logo"
      />
    </>
  );
};

export default Logo;
