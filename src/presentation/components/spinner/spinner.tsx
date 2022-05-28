import styles from "./spinner-styles.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

function Spinner({ ...rest }: Props) {
  return (
    <div {...rest} className={`${styles.spinner} ${rest.className}`}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export default Spinner;
