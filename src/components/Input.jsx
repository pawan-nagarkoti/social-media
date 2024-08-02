import React, { useId, forwardRef } from "react";

export default forwardRef(function Input({ label = "", type = "text", ...props }, ref) {
  const id = useId();
  return (
    <>
      <div className="mb-3">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <input type={type} className="form-control" id={id} ref={ref} {...props} />
        {/* <div className="form-text">We'll never share your email with anyone else.</div> */}
      </div>
    </>
  );
});
