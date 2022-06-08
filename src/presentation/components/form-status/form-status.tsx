import Spinner from "../spinner/spinner";
import styles from "./form-status-styles.module.scss";
import Context from "../../contexts/form/form-contex";
import { useContext } from "react";

function FormStatus() {
  const { state } = useContext(Context);
  const { isLoading, mainError } = state;

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {isLoading && <Spinner className={styles.spinner} />}
      {mainError && (
        <span data-testid="main-error" className={styles.error}>
          {mainError}
        </span>
      )}
    </div>
  );
}

export default FormStatus;
