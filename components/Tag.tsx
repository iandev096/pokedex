import React from "react";

type Props = { label: string };

function Tag({ label }: Props) {
  return (
    <span className="text-sm  text-[#f2dbc6] bg-[#20201f4d] px-[0.8rem] py-[0.4rem] rounded-full">
      {label}
    </span>
  );
}

export default Tag;
