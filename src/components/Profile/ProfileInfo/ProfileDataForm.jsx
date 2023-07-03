import React from "react";
import { reduxForm } from "redux-form";
import {
  Input,
  Textarea,
  createField,
} from "../../../common/FormsControls/FormsControls";
import style from "../../../common/FormsControls/FormsControls.module.css";


const ProfileFormData = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button className="common__button">Save</button>
      </div>
      <div className="profile__looking-job">
        <b>Full name: </b>
        {createField("Full name", "fullName", [], Input)}
      </div>
      <div className="profile__looking-job">
        <b>Looking for a job: </b>
        {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
      </div>
      <div className="profile__looking-job">
        <b>My professional skills: </b>
        {createField(
          "My professional skills",
          "lookingForAJobDescription",
          [],
          Textarea
        )}
      </div>
      <div className="profile__looking-job">
        <b>About me: </b>
        {createField("About me", "aboutMe", [], Textarea)}
      </div>

      <div className="profile__contacts contacts ">
        <b>Contacts:</b>
        <div className="contacts__items">
        <div className={error && style.form__summary_error}>

          {Object.keys(profile.contacts).map((key) => {
            return (
              <div  key={key} className="profile__contacts">
                <b>{key}:</b>
                {createField(key, "contacts." + key, [], Input)}

              </div>
            );
          })}
        {error}
      </div>

        </div>
      </div>
    </form>
  );
};

const ProfileFormDataRedux = reduxForm({ form: "editProfile" })(
  ProfileFormData
);

export default ProfileFormDataRedux;
