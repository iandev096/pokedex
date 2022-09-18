import React from "react";

type Props = { left: React.ReactNode; title: string; middle?: React.ReactNode };

function Header({ left, title, middle }: Props) {
  return (
    <div className="h-20 flex justify-between items-center">
      {left}
      {middle}
      <h1 className="text-slate-50 font-emotion">{title}</h1>
    </div>
  );
}

export default Header;
