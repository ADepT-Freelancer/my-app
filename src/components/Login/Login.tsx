import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import {
  GetStringKeys,
  createField,
} from "../../common/FormsControls/FormsControls.tsx";
import { maxLengthCreator, required } from "../utils/validators/validators.ts";
import { login } from "../../redux/auth-reducer.tsx";
import style from "../../common/FormsControls/FormsControls.module.css";
import { AppStateType } from "../../redux/redux-store.js";
import { Input } from "./../../common/FormsControls/FormsControls";
const maxLength20 = maxLengthCreator(20);

type LoginFormOwmProps = {
  captchaUrl: string | null;
};

type LoginFormsValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwmProps> & LoginFormOwmProps
> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={error && style.form__summary_error}>
        <div>
          <Field
            validate={[required, maxLength20]}
            component={Input}
            name={"email"}
            placeholder={"email"}
          />
        </div>
        <div>
          <Field
            validate={[required, maxLength20]}
            type="password"
            component={Input}
            name={"password"}
            placeholder={"password"}
          />
        </div>
        <div>
          <Field component={Input} name={"rememberMe"} type={"checkbox"} />
        </div>
        {/* {createField("Email", "email", [required], Input)}
        {createField("Password ", "password", [required], Input, {
          type: "password",
        })}
        {createField(
          null,
          "rememberMe",
          [],
          Input,
          { type: "checkbox" },
          "remember me"
        )} */}
        {captchaUrl && <img src={captchaUrl} alt="captcha" />}
        {captchaUrl &&
          createField<LoginFormsValuesTypeKeys>(
            "Symbols from image",
            "captcha",
            [required],
            Input,
            {}
          )}

        {error}
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwmProps>({
  form: "loginFormRedux",
})(LoginForm);

type MapStateToPropsType = {
  isAuth: boolean;
  captchaUrl: string | null;
};

type MapDispatchToPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ) => void;
};

export type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};
const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (
  props
) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };
  if (props.isAuth) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <section>
      <h1> LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </section>
  );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);
