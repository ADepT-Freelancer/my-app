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
import { AppStateType } from "../../redux/redux-store.ts";
import { Input } from "./../../common/FormsControls/FormsControls";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

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

export type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean | undefined;
  captcha: string | null;
};
export const Login: React.FC = () => {
  const captchaUrl = useSelector(
    (state: AppStateType) => state.auth.captchaUrl
  );
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const dispatch: Dispatch<any> = useDispatch();

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(
      login(
        formData.email,
        formData.password,
        formData.rememberMe,
        formData.captcha
      )
    );
  };
  if (isAuth) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <section>
      <h1> LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </section>
  );
};

export default connect(null, { login })(Login);
