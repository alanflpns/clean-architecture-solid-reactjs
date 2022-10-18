import React, { useContext } from "react";
import Context from "../../contexts/form/form-contex";

interface Props {
  text: string;
}

function SubmitButton({ text }: Props) {
  const { state } = useContext(Context);

  return (
    <button data-testid="submit" disabled={state.isFormInvalid} type="submit">
      {text}
    </button>
  );
}

export default SubmitButton;
