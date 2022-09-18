import React from "react";

type Props = {};

function Pagination({}: Props) {
  return (
    <div className="flex text-slate-50 space-x-4 font-emotion">
      <span>1</span>
      <span>2</span>
      <span>...</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
      <span>...</span>
      <span>9</span>
      <span>10</span>
    </div>
  );
}

export default Pagination;
