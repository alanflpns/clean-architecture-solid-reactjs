import Spinner from "../spinner/spinner";
import styles from "./form-status-styles.module.scss";
import Context from "../../contexts/form/form-contex";
import { useContext } from "react";

function FormStatus() {
  const { state, errorState } = useContext(Context);

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {state.isLoading && <Spinner className={styles.spinner} />}
      {errorState.main && (
        <span className={styles.error}>{errorState.main}</span>
      )}
    </div>
  );
}

export default FormStatus;
