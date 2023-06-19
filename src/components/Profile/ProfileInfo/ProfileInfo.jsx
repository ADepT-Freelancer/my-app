/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import Preloader from './../../../common/preloader/preloader';
import userPhoto from "../../../assets/images/user.jpg";
import ProfileStatus from './ProfileStatus.jsx'



const ProfileInfo = (props) => {
if (!props.profile) {
  return <Preloader />
}
  return (
    <section data-fp-section="" className="page__main main-section">
      <div className="main-section__container">
        <div className="main-section__content">
          <div className="main-section__title title">
            <div className="title__label">MY NAME IS</div>
            <h1 className="title__value title__value-big">
            {props.profile.data.fullName} 
              <span>-{props.profile.data.userId}.</span>
            </h1>
          </div>
          <div className="main-section__text text">
            <p>
            <ProfileStatus 
            status={props.status}
            />
            </p>
          </div>
          <ul className="main-section__social social">
            <li className="social__item">
              <a href="#" className="social__link _icon-s-instagram" />
            </li>
            <li className="social__item">
              <a href="#" className="social__link _icon-s-git" />
            </li>
            <li className="social__item">
              <a href="#" className="social__link _icon-s-twitter" />
            </li>
            <li className="social__item">
              <a href="#" className="social__link _icon-s-linkedin" />
            </li>
          </ul>
        </div>
        <div className="main-section__decor decor-main-section">
          <div className="decor-main-section__box">
            <div className="decor-main-section__image">
              <img
                className="decor-main-section__picture"
                src={(props.profile.data.photos.large)  ? props.profile.data.photos.large : userPhoto}

                // src="data:image/jpeg;base64,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"
                alt="AvatarProfile"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
