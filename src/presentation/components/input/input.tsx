import React, { useContext } from "react";
import styles from "./input-styles.module.scss";
import Context from "../../contexts/form/form-contex";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

function Input({ ...rest }: Props) {
  const { errorState } = useContext(Context);
  const error = errorState[rest.name!];

  const enableInput = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.readOnly = false;
  };

  const getStatus = () => {
    return "🔴";
  };

  const getTitle = () => {
    return error;
  };

  return (
    <div className={styles.inputWrap}>
      <input {...rest} readOnly onFocus={enableInput} />
      <span
        data-testid={`${rest.name}-status`}
        title={getTitle()}
        className={styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
}

export default Input;
