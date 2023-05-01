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
import { authPanelState } from '@/store/atoms'
import { useAtom } from "jotai";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { signInWithEmail, signInWithGoogle, user } = useAuth();

  const [_, setAuthPanel] = useAtom(authPanelState);
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const error = await signInWithEmail(email, password);
      if (error) {
        setError(error);
      }
    } catch (error) {
      console.log("Something went wrong!");
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
          <div className="text-4xl font-bold">로그인</div>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            반갑습니다!{" "}
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              Re100Run
            </span>{" "}
            <span className="">
              에 오신 것을 환영합니다.{" "}
            </span>{" "}
            구글 계정으로 로그인 해주세요.
          </p>
        </div>


        {/* Github Button */}
        <Button
          onClick={signInWithGoogle}
          className="flex items-center w-full gap-2 mt-6"
        >
          구글 로그인 <FaGoogle className="w-8 h-8" />
        </Button>

        {/* Seperator */}
        <div className="flex items-center my-8">
          <Separator /> <span className="mx-6">또는</span> <Separator />
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          {/* Inputs Container */}
          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label>이메일</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>비밀번호</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {/* Error */}
          {error && <div className="mt-4 text-red-500">{error}</div>}
          <Button
            variant="subtle"
            type="submit"
            className="flex items-center w-full gap-2 mt-6"
          >
            이메일로 로그인
            <Mail size="16" />
          </Button>
        </form>
        <p className="py-4" onClick={() => setAuthPanel("signup")}>회원 가입하기</p>
        <p className="py-4" onClick={() => setAuthPanel("reset")}>비밀번호 찾기</p>

      </div>
    </div>
  );
};

export default LoginForm;
