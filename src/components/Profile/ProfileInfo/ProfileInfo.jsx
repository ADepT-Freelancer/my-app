/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import userPhoto from "../../../assets/images/user.jpg";
import Preloader from "./../../../common/preloader/preloader";
import ProfileFormDataSubmit from "./ProfileDataForm";
import ProfileStatusWithHocks from "./ProfileStatusWithHocks";

const ProfileInfo = (props) => {
  // let [isEditMode, setEditMode] = useState(false);

  const onSubmit = (formData) => {
    props.saveProfileData(formData);
  };

  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <section data-fp-section="" className="page__main main-section">
      <div className="main-section__container">
        <div className="main-section__content">
          <UserFullName profile={props.profile.data} />
          <ProfileStatusWithHocks
            status={props.status}
            updateStatus={props.updateStatus}
          />
          <SocialNetworks profile={props.profile.data} />
          <UsersPhoto
            isOwner={props.isOwner}
            savePhoto={props.savePhoto}
            profile={props.profile.data}
          />
          {props.isProfileEditMode ? (
            <ProfileFormDataSubmit
              onSubmit={onSubmit}
              initialValues={props.profile.data}
              profile={props.profile.data}
              status={props.status}
            />
          ) : (
            <ProfileData
              profile={props.profile.data}
              isOwner={props.isOwner}
              setEditMode={props.setEditMode}
            />
          )}
        </div>
      </div>
    </section>
  );
};

const SocialNetworks = ({ profile }) => {
  return (
    <ul className="main-section__social social">
      <li className="social__item">
        <a
          href={profile.contacts.instagram}
          className="social__link _icon-s-instagram"
        />
      </li>
      <li className="social__item">
        <a
          href={profile.contacts.github}
          className="social__link _icon-s-git"
        />
      </li>
      <li className="social__item">
        <a
          href={profile.contacts.twitter}
          className="social__link _icon-s-twitter"
        />
      </li>
      <li className="social__item">
        <a
          href={profile.contacts.mainLink}
          className="social__link _icon-s-linkedin"
        />
      </li>
    </ul>
  );
};
const ProfileData = ({ profile, isOwner, setEditMode }) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button className="common__button" onClick={setEditMode}>
            Edit
          </button>
        </div>
      )}

      <div className="profile__looking-job">
        <b>Full name: </b>
        {profile.fullName}
      </div>
      <div className="profile__looking-job">
        <b>Looking for a job: </b>
        {profile.lookingForAJob ? "yes" : "no"}
      </div>

      <div className="profile__looking-job">
        <b>My professional skills: </b>
        {profile.lookingForAJobDescription}
      </div>
      <div className="profile__looking-job">
        <b>About me: </b> {profile.aboutMe}
      </div>
      <div className="profile__contacts contacts ">
        <b>Contacts:</b>
        <div className="contacts__items">
          {Object.keys(profile.contacts).map((key) => {
            return (
              <ContactProfile
                key={key}
                contactTitle={key}
                contactValue={profile.contacts[key]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
const ContactProfile = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};
const UsersPhoto = ({ savePhoto, isOwner, profile }) => {
  const onMainPhotoSelector = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };
  return (
    <div>
      <div className="main-section__decor decor-main-section">
        <div className="decor-main-section__box">
          <div className="decor-main-section__image">
            <img
              className="decor-main-section__picture"
              src={profile.photos.large ? profile.photos.large : userPhoto}
              alt="AvatarProfile"
            />
          </div>
        </div>
      </div>
      {isOwner && <input type={"file"} onChange={onMainPhotoSelector} />}
    </div>
  );
};
const UserFullName = ({ profile }) => {
  return (
    <div className="main-section__title title">
      <div className="title__label">MY NAME IS</div>
      <h1 className="title__value title__value-big">
        {profile.fullName}
        <span>-{profile.userId}.</span>
      </h1>
    </div>
  );
};

export default ProfileInfo;
