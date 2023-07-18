/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Contacts = (props) => {
  return (
    <section className="page__contacts contacts">
      <div className="contacts__container">
        <div className="contacts__content">
          {/* <form action="#" className="contacts__form form">
        <div className="form__item">
          <input
            autoComplete="off"
            type="text"
            name="form[]"
            data-error="Error"
            data-required=""
            placeholder="Name"
            className="form__input"
          />
        </div>
        <div className="form__item">
          <input
            autoComplete="off"
            type="text"
            name="form[]"
            data-error="Error"
            data-required="email"
            placeholder="Email"
            className="form__input"
          />
        </div>
        <div className="form__item">
          <textarea
            autoComplete="off"
            name="form[]"
            placeholder="Message"
            data-error="Error"
            className="form__input"
            defaultValue={""}
          />
        </div>
        <div className="form__item">
          <button type="submit" className="form__button">
            Send Message
          </button>
        </div>
      </form> */}
          <div className="contacts__body">
            <ul className="contacts__list list-contacts">
              <li className="list-contacts__item">
                <div className="list-contacts__icon">
                  <img src="@img/contacts/icons/01.svg" alt="" />
                </div>
                <div className="list-contacts__body">
                  <div className="list-contacts__title">Address</div>
                  <a href="" className="list-contacts__text">
                    3424 Layman Avenue, Fayetteville, NC
                  </a>
                </div>
              </li>
              <li className="list-contacts__item">
                <div className="list-contacts__icon">
                  <img src="@img/contacts/icons/02.svg" alt="" />
                </div>
                <div className="list-contacts__body">
                  <div className="list-contacts__title">Phone</div>
                  <a href="tel:5014141541" className="list-contacts__text">
                    (501) 414-1541
                  </a>
                </div>
              </li>
              <li className="list-contacts__item">
                <div className="list-contacts__icon">
                  <img src="@img/contacts/icons/03.svg" alt="" />
                </div>
                <div className="list-contacts__body">
                  <div className="list-contacts__title">E-Mail</div>
                  <a
                    href="mailto:devchapter@gmail.com"
                    className="list-contacts__text"
                  >
                    devchapter@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
