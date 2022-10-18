import React, { useContext, useRef } from "react";
import styles from "./input-styles.module.scss";
import Context from "../../contexts/form/form-contex";
import { props } from "cypress/types/bluebird";

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
    <div className={styles.inputWrap}>
      <input
        {...rest}
        ref={inputRef}
        placeholder=" "
        data-testid={rest.name}
        readOnly
        onFocus={(event) => (event.target.readOnly = false)}
        onChange={(event) =>
          setState({ ...state, [event.target.name]: event.target.value })
        }
      />
      <label onClick={() => inputRef.current?.focus()}>
        {rest.placeholder}
      </label>
      <span
        data-testid={`${rest.name}-status`}
        title={error || "Tudo certo"}
        className={styles.status}
      >
        {error ? "🔴" : "🟢"}
      </span>
    </div>
  );
}

export default Input;
