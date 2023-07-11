import React from "react";
import styles from "./FormsControls.module.css";
import { Field, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from "../../components/utils/validators/validators";

type FormControlPropsType = {
  meta: {
    touched: boolean;
    error: string;
  };
  children: React.ReactNode;
};

export const FormControl: React.FC<FormControlPropsType> = ({
  meta: { touched, error },
  children,
}) => {
  let isError = touched && error;
  return (
    <div
      className={styles.form__control + " " + (isError && styles.form__error)}
    >
      <div>{children}</div>
      {isError && <span> {error} </span>}
    </div>
  );
};
export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};
export const Input = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: FieldValidatorType[],
  component: React.FC<WrappedFieldProps>,
  props = {},
  text: string = " "
) {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />
      {text}
    </div>
  );
}
