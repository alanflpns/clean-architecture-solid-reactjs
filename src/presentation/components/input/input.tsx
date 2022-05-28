import React from "react";
import styles from "./input-styles.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

function Input({ ...rest }: Props) {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.readOnly = false;
  };

  return (
    <div className={styles.inputWrap}>
      <input {...rest} readOnly onFocus={enableInput} />
      <span className={styles.status}>🔴</span>
    </div>
  );
}

export default Input;
