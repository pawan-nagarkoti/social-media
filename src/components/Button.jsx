import React, { forwardRef } from "react";

export default forwardRef(function Button({ type = "button", className = "", children, style = {}, onClick = () => {}, ...props }, ref) {
  return (
    <>
      <button type={type} className={`btn ${className}`} style={style} onClick={onClick} ref={ref} {...props}>
        {children}
      </button>
    </>
  );
});
