import React from "react";
import { Signup } from "../../../presentation/pages";
import { makeRemoteAddAccount } from "../../usecases/add-account/remote-add-account-factory";
import { makeLocalSaveAccessToken } from "../../usecases/save-access-token/local-save-access-token-factory";
import { makeSignUpValidation } from "./signup-validation-factory";

export const makeSignUp: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
};
