import { redirect } from "next/navigation";

import { auth } from "@/app/auth";

export async function RestrictedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return children;
}
