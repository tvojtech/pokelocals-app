export async function RestrictedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();
  // if (!session) {
  //   redirect("/sign-in");
  // }

  return children;
}
