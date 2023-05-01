import Image from "next/image";
import Link from "next/link";
import AuthPanel from "./authPanel";

const LoginPage = () => {
  return (
    <div className="grid w-full h-[100vh] grid-cols-1 md:grid-cols-3">

      <AuthPanel />

      {/* Gradient */}
      <div className="relative hidden w-full overflow-hidden md:col-span-2 rounded-l-2xl md:block">
        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-white/10 backdrop-blur-lg" />
        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
          <div>
            <Image
              className="max-w-[200px]"
              width={296}
              height={77}
              src="/re100run-logo-white.svg"
              alt="re100run-logo"
            />
            <div className="mt-4">
              <div className="text-2xl font-medium text-neutral-200">
                RE100run for sustainable energy.
              </div>
              <div className="max-w-xl text-sm text-neutral-200 py-2">
                자가발전 에너지 러닝{" "}
                <span className="font-medium text-neutral-200">
                  이타서울.
                </span>{" "}
                (주)헤럴드 경제 H.ECO AWARDS {" "}
                {/* <Link
                  className="underline underline-offset-4"
                  href="https://platform.openai.com"
                  target="_blank"
                >
                  수상
                </Link> */}
                .
              </div>
            </div>
          </div>
        </div>
        <Image
          priority
          sizes="50vw"
          className="z-0"
          alt="gradient"
          fill
          src="/login-gradient-green.jpg"
        />
      </div>
    </div>
  );
};



export default LoginPage;
