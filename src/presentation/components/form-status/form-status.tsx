import Spinner from "../spinner/spinner";
import styles from "./form-status-styles.module.scss";

function FormStatus() {
  return (
    <div className={styles.errorWrap}>
      <Spinner className={styles.spinner} />
      <span className={styles.error}>Erro</span>
    </div>
  );
}

export default FormStatus;
