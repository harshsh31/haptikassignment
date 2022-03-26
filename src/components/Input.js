import { get } from "lodash";
import React from "react";

const Input = (props) => {
  return (
    <div className="inputWrapper">
      <input
        className={`input ${get(props, "error", "") != "" ? "error" : ""}`}
        {...props}
      />
      {get(props, "error", "") != "" && (
        <p className="errorMessage">{get(props, "error", "")}</p>
      )}
    </div>
  );
};

export default Input;
