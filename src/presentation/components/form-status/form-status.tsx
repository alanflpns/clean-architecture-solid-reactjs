import Spinner from "../spinner/spinner";
import styles from "./form-status-styles.module.scss";
import Context from "../../contexts/form/form-contex";
import { useContext } from "react";

function FormStatus() {
  const { isLoading, errorMessage } = useContext(Context);

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {isLoading && <Spinner className={styles.spinner} />}
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
}

export default FormStatus;
