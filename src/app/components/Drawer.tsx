import classNames from "classnames";
import React from "react";

export const Drawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <div className="relative">
      <div
        className={classNames(
          "fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform transition-transform duration-300",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
          }
        )}
      >
        <button
          onClick={onClose}
          className="p-2 bg-red-500 text-white rounded m-4"
        >
          Close
        </button>
        <div className="p-4">
          <h2 className="text-xl font-bold">Drawer Content</h2>
          <p>This is the content of the drawer.</p>
        </div>
      </div>
    </div>
  );
};
