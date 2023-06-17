import React from "react";
import styles from "./FormsControls.module.css";

export const FormControl = ({ input, meta, child, ...props }) => {
  let isError = meta.touched && meta.error;
  return (
    <div className={styles.form__control + " " +  ((isError) && styles.form__error)}>
      <div>{props.children}</div>
      {isError && <span> {meta.error} </span>}
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
