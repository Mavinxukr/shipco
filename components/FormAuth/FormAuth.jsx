import React, { useState, useContext } from "react";
import classes from "./FormAuth.scss";
import { Field, Form } from "react-final-form";
import Button from "../Button/Button";
import { renderInput } from "../../utils/renderInputs";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

import {
  composeValidators,
  emailValidation,
  required,
} from "../../utils/validation";
import { FormRegistration } from "../FormRegistration/FormRegistration";
import { PopupContext } from "../../context/PopupContext";

export const FormAuth = ({ redirect = "/overview" }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { setContent, setIsOpen } = useContext(PopupContext);

  const submitHandle = async (values) => {
    const result = await signIn("user", {
      redirect: false,
      ...values,
    });
    if (!result.error) {
      router.push(redirect);
    } else {
      setErrorMessage(result.error);
    }
    setIsOpen(false);
  };

  return (
    <div>
      <h5 className={classes.title}>Sign In</h5>
      <Form
        onSubmit={(values) => submitHandle(values)}
        render={({ handleSubmit, submitting, invalid }) => (
          <form className={classes.widthForm} onSubmit={handleSubmit}>
            <Field
              name="email"
              validate={composeValidators(required, emailValidation)}
              type="email"
            >
              {renderInput({
                label: "",
                placeholder: "Email Address",
              })}
            </Field>
            <Field
              name="password"
              validate={composeValidators(required)}
              type="password"
            >
              {renderInput({
                label: "",
                placeholder: "Password",
              })}
            </Field>
            {errorMessage && (
              <p className={classes.error}>The given data was invalid.</p>
            )}
            <Button
              customBtn={classes.btnSubmit}
              type="submit"
              disabled={invalid || submitting}
            >
              Sign in
            </Button>
          </form>
        )}
      />
      <p className={classes.text}>
        Not on Shipco yet?{" "}
        <Button
          customBtn={classes.btnRegister}
          onClick={() => {
            setContent(<FormRegistration />);
          }}
        >
          Register
        </Button>
      </p>
    </div>
  );
};
