import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import {
  Input,
  createField,
} from "../../common/FormsControls/FormsControls.tsx";
import { maxLengthCreator, required } from "../utils/validators/validators.ts";
import { login } from "../../redux/auth-reducer.tsx";
import style from "../../common/FormsControls/FormsControls.module.css";
import { AppStateType } from "../../redux/redux-store.js";
const maxLength20 = maxLengthCreator(20);

type LoginFormOwmProps = {
  captchaUrl: number;
};

type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

type LoginFormsValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwmProps> & LoginFormOwmProps
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={props.error && style.form__summary_error}>
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

        {props.captchaUrl && <img src={props.captchaUrl} alt="captcha" />}
        {props.captchaUrl &&
          createField<LoginFormsValuesTypeKeys>(
            "Symbols from image",
            "captcha",
            [required],
            Input,
            {}
          )}

        {props.error}
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

type mapStateToPropsType = {
  isAuth: boolean;
  captchaUrl: string | null;
};

type mapDispatchToPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ) => void;
};

const Login: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (
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

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);
