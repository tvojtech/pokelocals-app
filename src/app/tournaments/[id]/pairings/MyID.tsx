"use client";

import { useToggle } from "@uidotdev/usehooks";
import React from "react";

export const MyID: React.FC<{
  myId?: string;
  onChangeId: (id: string | undefined) => void;
}> = ({ myId, onChangeId: setMyId }) => {
  const [showInput, toggleShowInput] = useToggle(!myId);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSetMyId = () => {
    const newId = inputRef.current?.value;
    setMyId(newId);
    toggleShowInput(!newId);
  };

  if (!showInput) {
    return <button onClick={() => toggleShowInput()}>Change pokemon ID</button>;
  }

  return (
    <div className="space-x-6">
      <label>My pokemon ID:</label>
      <input
        type="text"
        ref={inputRef}
        defaultValue={myId}
        className="outline-2 border border-gray-300 p-1 px-2"
      />
      <button onClick={handleSetMyId}>Save</button>
    </div>
  );
};
