import React, { useRef } from "react";
import useScrollTop from "../hooks/useScrollTop";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

function Stage({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollTop(ref);

  return (
    <div
      ref={ref}
      className="flex-1 bg-white/[.15] cust-scrollbar overflow-y-scroll rounded-md  shadow-inner shadow-black scroll-smooth"
    >
      {children}
    </div>
  );
}

export default Stage;
