import { IconType } from "react-icons";

type StatProps = { Icon: IconType; value: number | string };

function Stat({ Icon, value }: StatProps) {
  return (
    <div className="flex items-center gap-1">
      <Icon />
      <span>{value}</span>
    </div>
  );
}

export default Stat;
