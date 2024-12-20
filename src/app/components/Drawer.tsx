import classNames from "classnames";
import { X } from "lucide-react";
import React from "react";

export const Drawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <div className="relative">
      <div
        className={classNames(
          "fixed top-19 right-0 h-full bg-gray-800 text-white w-96 transform transition-transform duration-300",
          {
            "translate-x-0": isOpen,
            "translate-x-full": !isOpen,
          }
        )}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="p-2 bg-transparent text-white rounded m-4"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold">Drawer Content</h2>
          <p>This is the content of the drawer.</p>
        </div>
      </div>
    </div>
  );
};
