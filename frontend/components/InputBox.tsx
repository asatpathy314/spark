import React from "react";
import { getTsBuildInfoEmitOutputFilePath } from "typescript";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  labelClassName: string;
  inputClassName: string;
  inputPlaceholder:string;
  labelText?: string;
}

const InputBox = ({ labelText, ...props }: Props) => {
  return (
    <div>
      <label
        className={props.labelClassName}>
        {labelText}
      </label>
      <input
        className={props.inputClassName}
        placeholder={props.inputPlaceholder}
        {...props}
      ></input>
    </div>
  );
};

export default InputBox;