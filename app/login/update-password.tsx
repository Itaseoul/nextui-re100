"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/supabase/supabase-auth-provider";
import { Github, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/seperator";
import { FaGoogle } from "react-icons/fa";

const UpdatePassword = () => {

  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { updatePassword, user } = useAuth();
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const error = await updatePassword(password);
      if (error) {
        setError(error);
      }
    } catch (error) {
      console.log("문제가 발생했습니다.");
    }
  };

  // Check if there is a user
  useEffect(() => {
    if (user) {
      console.log('user:', user);

      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="flex items-center w-full h-full px-8">
      {/* Main Container */}
      <div className="w-full ">

        {/* Text */}
        <div>
          <div className="text-4xl font-bold">비밀번호 변경</div>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            반갑습니다!{" "}
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              Re100Run
            </span>{" "}
            <span className="">
              에 오신 것을 환영합니다.{" "}
            </span>{" "}
            비밀번호를 다시 설정할 수 있습니다.
          </p>
        </div>


        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          {/* Inputs Container */}

          {/* Error */}
          {error && <div className="mt-4 text-red-500">{error}</div>}
          <Button
            variant="subtle"
            type="submit"
            className="flex items-center w-full gap-2 mt-6"
          >
            비밀번호 변경
            <Mail size="16" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
