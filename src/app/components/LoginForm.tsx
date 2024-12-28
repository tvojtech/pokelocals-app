import Image from "next/image";

import { signIn } from "@/app/auth";

export function LoginForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("discord", { redirectTo: "/tournaments" });
      }}
    >
      <button
        type="submit"
        className="bg-[#5865F2] text-white py-2 px-4 rounded flex items-center justify-center space-x-2 shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        <Image
          src="/images/discord-mark-white.svg"
          alt="discord"
          width={24}
          height={18}
        />

        <span>Sign in with Discord</span>
      </button>
    </form>
  );
}
