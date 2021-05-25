import React, { useState, useContext } from "react";
import classes from "./FormRegistration.scss";
import { Field, Form } from "react-final-form";
import Button from "../Button/Button";
import { renderInput } from "../../utils/renderInputs";
import { registration } from "../../services/user";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

import {
  composeValidators,
  emailValidation,
  required,
  passwordValidation,
  snpValidation,
  validateForm,
} from "../../utils/validation";
import { PopupContext } from "../../context/PopupContext";
import { FormAuth } from "../FormAuth/FormAuth";

export const FormRegistration = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { setContent, setIsOpen } = useContext(PopupContext);

  const onSubmit = async (values, funcAuth) => {
    const response = await funcAuth({}, values);
    if (response.status) {
      const result = await signIn("user", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (!result.error) {
        router.replace("/overview");
        setIsOpen(false);
      } else {
        console.log(result);
        setErrorMessage(result.errors);
      }
    }
    if (response.hasOwnProperty("errors")) {
      let message = "";
      Object.keys(response.errors).map((item) => {
        message += response.errors[item].join(" ");
      });
      setErrorMessage(message);
    }
  };

  return (
    <>
      <h5 className={classes.title}>Register</h5>
      <Form
        onSubmit={(values) => onSubmit(values, registration)}
        validate={validateForm}
        render={({ handleSubmit, submitting, invalid }) => (
          <form className={classes.widthForm} onSubmit={handleSubmit}>
            <Field
              name="name"
              validate={composeValidators(required, snpValidation)}
              type="text"
            >
              {renderInput({
                label: "",
                placeholder: "Name",
              })}
            </Field>
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
              validate={composeValidators(required, passwordValidation)}
              type="password"
            >
              {renderInput({
                label: "",
                placeholder: "Password",
              })}
            </Field>
            <Field name="password_confirmation" type="password">
              {renderInput({
                label: "",
                placeholder: "Confirm password",
              })}
            </Field>
            <div className={classes.checkboxBlock}>
              <Field name="checked" type="checkbox" validate={required}>
                {renderInput({
                  label: "I agree to Shipco's",
                  classNameWrapper: classes.checkedLogin,
                  widthInputBlock: classes.widthCheckboxBlock,
                  classNameWrapperLabel: classes.classNameWrapperLabel,
                })}
              </Field>
              <a href="/">Terms of Use</a>
            </div>
            {errorMessage && (
              <div className={classes.error}>
                The email has already been taken.
              </div>
            )}
            <Button
              customBtn={classes.btnSubmit}
              type="submit"
              disabled={invalid || submitting}
            >
              send request
            </Button>
          </form>
        )}
      />
      <p className={classes.text}>
        Already Registered?{" "}
        <Button
          customBtn={classes.btnRegister}
          onClick={() => {
            setContent(FormAuth);
          }}
        >
          Log In
        </Button>
      </p>
    </>
  );
};
