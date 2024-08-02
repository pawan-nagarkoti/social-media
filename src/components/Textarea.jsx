import React, { useId, forwardRef } from "react";

export default forwardRef(function Textarea({ label = "", rows = "5", ...props }, ref) {
  const id = useId();
  return (
    <>
      <div className="mb-3">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <textarea className="form-control" rows={rows} id={id} ref={ref} {...props}></textarea>
        {/* <div className="form-text">We'll never share your email with anyone else.</div> */}
      </div>
    </>
  );
});
