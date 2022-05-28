import styles from "./input-styles.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

function Input({ ...rest }: Props) {
  return (
    <div className={styles.inputWrap}>
      <input {...rest} />
      <span className={styles.status}>🔴</span>
    </div>
  );
}

export default Input;
