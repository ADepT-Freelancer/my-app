/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { ChangeEvent } from "react";
import userPhoto from "../../../assets/images/user.jpg";
import Preloader from "../../../common/preloader/preloader";
import { InitialStateType } from "../../../redux/profile-reducer";
import { ContactsType, ProfileType } from "../../../types/types";
import ProfileFormDataSubmit from "./ProfileDataForm.tsx";
import ProfileStatusWithHocks from "./ProfileStatusWithHocks";

type PropsType = {
  profilePage: InitialStateType;
  isProfileEditMode: boolean;

  saveProfileData: (formData: ProfileType) => void;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  setEditMode: () => void;
  status: string;
};

const ProfileInfo: React.FC<PropsType> = (props) => {
  // let [isEditMode, setEditMode] = useState(false);

  const onSubmit = (formData: ProfileType) => {
    props.saveProfileData(formData);
  };

  if (!props.profilePage.profile) {
    return <Preloader />;
  }
  return (
    <section data-fp-section="" className="page__main main-section">
      <div className="main-section__container">
        <div className="main-section__content">
          <UserFullName profile={props.profilePage.profile} />
          <ProfileStatusWithHocks
            status={props.profilePage.status}
            updateStatus={props.updateStatus}
          />
          <SocialNetworks profile={props.profilePage.profile} />
          <UsersPhoto
            profilePage={props.profilePage}
            isOwner={props.isOwner}
            savePhoto={props.savePhoto}
          />
          {props.isProfileEditMode ? (
            <ProfileFormDataSubmit
              onSubmit={onSubmit}
              initialValues={props.profilePage.profile}
              profile={props.profilePage.profile}
              // status={props.profilePage.status}
            />
          ) : (
            <ProfileData
              profile={props.profilePage.profile}
              isOwner={props.isOwner}
              setEditMode={props.setEditMode}
            />
          )}
        </div>
      </div>
    </section>
  );
};
type SocialNetworksType = {
  profile: ProfileType;
};
const SocialNetworks: React.FC<SocialNetworksType> = ({ profile }) => {
  return (
    <ul className="main-section__social social">
      <li className="social__item">
        <a
          href={profile.contacts.instagram || " "}
          className="social__link _icon-s-instagram"
        />
      </li>
      <li className="social__item">
        <a
          href={profile.contacts.github || " "}
          className="social__link _icon-s-git"
        />
      </li>
      <li className="social__item">
        <a
          href={profile.contacts.twitter || " "}
          className="social__link _icon-s-twitter"
        />
      </li>
      <li className="social__item">
        <a
          href={profile.contacts.mainLink || " "}
          className="social__link _icon-s-linkedin"
        />
      </li>
    </ul>
  );
};

type ProfileDataPropsType = {
  profile: ProfileType;
  isOwner: boolean;
  setEditMode: () => void;
};

const ProfileData: React.FC<ProfileDataPropsType> = ({
  profile,
  isOwner,
  setEditMode,
}) => {
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
                contactValue={profile.contacts[key as keyof ContactsType]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

type ContactProfileType = {
  contactTitle: string;
  contactValue: string | null;
};
const ContactProfile: React.FC<ContactProfileType> = ({
  contactTitle,
  contactValue,
}) => {
  return (
    <div>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

type UsersPhotoType = {
  profilePage: InitialStateType;
  savePhoto: (file: File) => void;
  isOwner: boolean;
};

const UsersPhoto: React.FC<UsersPhotoType> = ({
  profilePage,
  savePhoto,
  isOwner,
}) => {
  const onMainPhotoSelector = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
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
              src={profilePage.profile?.photos.large || userPhoto}
              alt="AvatarProfile"
            />
          </div>
        </div>
      </div>
      {isOwner && (
        <input
          placeholder=" - - - "
          type={"file"}
          onChange={onMainPhotoSelector}
        />
      )}
    </div>
  );
};

type UserFullNameType = {
  profile: ProfileType;
};

const UserFullName: React.FC<UserFullNameType> = ({ profile }) => {
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
