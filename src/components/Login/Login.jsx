import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../utils/validators/validators";

const maxLength20 = maxLengthCreator(20);

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field  validate={[required, maxLength20]} component={Input} name={"login"} placeholder={"Login"} />
      </div>
      <div>
        <Field  validate={[required, maxLength20]} component={Input} name={"password"} placeholder={"Password"} />
      </div>
      <div>
        <Field component={Input} name={"rememberMe"} type={"checkbox"} />
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: "loginFormRedux" })(LoginForm);

const onSubmit = (formData) => {
  console.log(formData);
}

const Login = (props) => {
  return (
    <section>
      <h1> LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit}/>
    </section>
  );
};

export default Login;
