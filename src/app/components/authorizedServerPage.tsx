/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/app/auth";
import { AppPermission } from "@/app/permissions";

export const authorizedServerPage =
  (Component: React.ComponentType, ...allowedPermission: AppPermission[]) =>
  async (props: any) => {
    const session = await auth();
    if (!session) {
      return redirect("/login");
    }
    return <Component {...props} />;
  };
