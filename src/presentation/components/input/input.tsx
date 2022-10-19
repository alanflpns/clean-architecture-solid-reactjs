import React, { useContext, useRef } from "react";
import styles from "./input-styles.module.scss";
import Context from "../../contexts/form/form-contex";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

function Input({ ...rest }: Props) {
  const { state, setState } = useContext(Context);

  const inputRef = useRef<HTMLInputElement>(null);
  const error = state[`${rest.name}Error`];

  return (
    <div
      className={styles.inputWrap}
      data-status={error ? "invalid" : "valid"}
      data-testid={`${rest.name}-wrap`}
    >
      <input
        {...rest}
        ref={inputRef}
        placeholder=" "
        title={error || undefined}
        data-testid={rest.name}
        readOnly
        onFocus={(event) => (event.target.readOnly = false)}
        onChange={(event) =>
          setState({ ...state, [event.target.name]: event.target.value })
        }
      />
      <label
        onClick={() => inputRef.current?.focus()}
        title={error || undefined}
        data-testid={`${rest.name}-label`}
      >
        {rest.placeholder}
      </label>
    </div>
  );
}

export default Input;
