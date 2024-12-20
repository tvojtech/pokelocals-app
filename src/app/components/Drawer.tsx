import classNames from "classnames";
import React from "react";

type DrawerProps = {
  isOpen: boolean;
  position?: "left" | "right";
};

export const Drawer: React.FC<React.PropsWithChildren<DrawerProps>> = ({
  children,
  isOpen,
  position = "right",
}) => {
  const positionClasses: Record<Required<DrawerProps>["position"], string> = {
    left: "left-0 top-16 h-full w-96",
    right: "right-0 top-16 h-full w-96",
  };

  const transformClasses: Record<
    Required<DrawerProps>["position"],
    { open: string; closed: string }
  > = {
    left: {
      open: "translate-x-0",
      closed: "-translate-x-full",
    },
    right: {
      open: "translate-x-0",
      closed: "translate-x-full",
    },
  };

  return (
    <div className="relative">
      <div
        className={classNames(
          "fixed text-white transform transition-transform duration-300 border-blue-400 border-4 bg-blue-400",
          positionClasses[position],
          {
            [transformClasses[position].open]: isOpen,
            [transformClasses[position].closed]: !isOpen,
          }
        )}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
