import React from "react";
interface checkboxProp {
  _id?: string;
  content?: string;
  className?: string;
  contentColor?: string;
}
const Checkbox = ({ _id, content, className, contentColor }: checkboxProp) => {
  return (
    <div className={`flex gap-2 mt-2 font-medium`}>
      {/* <input type="checkbox" _id={_id} /> */}
      <label htmlFor={_id} className={`text-sm ${className}`}>
        <span className={`text-[#151515] ${contentColor}`}> {content}</span>
      </label>
    </div>
  );
};

export default Checkbox;
