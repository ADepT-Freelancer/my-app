import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Input } from "../../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../utils/validators/validators";
import { login } from "./../../redux/auth-reducer";
import style from "../../common/FormsControls/FormsControls.module.css";
const maxLength20 = maxLengthCreator(20);

const LoginForm = (props) => {
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
        {props.error}
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: "loginFormRedux" })(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };
  if (props.isAuth) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <section>
      <h1> LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
