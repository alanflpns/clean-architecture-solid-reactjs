import React, { useContext } from "react";
import styles from "./input-styles.module.scss";
import Context from "../../contexts/form/form-contex";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

function Input({ ...rest }: Props) {
  const { state, setState } = useContext(Context);
  const error = state[`${rest.name}Error`];

  const enableInput = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.readOnly = false;
  };

  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const getStatus = () => {
    return "🔴";
  };

  const getTitle = () => {
    return error;
  };

  return (
    <div className={styles.inputWrap}>
      <input
        {...rest}
        data-testid={rest.name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
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
