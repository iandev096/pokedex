import React from "react";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function Button({ children, disabled, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`text-slate-50 hover:bg-gray-700 transition-all font-emotion tracking-wider px-4 py-1 sm:px-5 sm:py-2 bg-gray-800 rounded-md ${
        disabled ? "opacity-20" : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
