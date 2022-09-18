import React from "react";
import { IconType } from "react-icons";

type Props = { Icon: IconType; label: string; value: number | string };

function Stat({ Icon, label, value }: Props) {
  let bgColor = "bg-[#6EFFA5]";
  if (value < 40) {
    bgColor = "bg-[#FF6E6E]";
  } else if (value >= 40 && value <= 65) {
    bgColor = "bg-[#FCD56C]";
  }

  return (
    <div
      className={`circle flex-col ${bgColor} group-hover:shadow-lg group-hover:saturate-150 transition-all delay-150 duration-500`}
    >
      <Icon size={16} opacity={0.7} />
      <h3 className="text-xs font-bold">{label}</h3>
      <p className="text-xs">{value}</p>
    </div>
  );
}

export default Stat;
