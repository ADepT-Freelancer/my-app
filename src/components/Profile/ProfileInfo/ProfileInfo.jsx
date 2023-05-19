import React from "react";
import s from "./ProfileInfo.module.css";



const ProfileInfo = () => {
  return (
    <section data-fp-section="" className="page__main main-section">
      <div className="main-section__container">
        <div className="main-section__content">
          <div className="main-section__title title">
            <div className="title__label">MY NAME IS</div>
            <h1 className="title__value title__value_big">
              Artem <span>Fuchko.</span>
            </h1>
          </div>
          <div className="main-section__text text">
            <p>
   I present to you my social network project. In which links to my previous work are listed.
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
                src="@img/main/picture.png"
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
