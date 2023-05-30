/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";


const Post = (props) => {
  return (
    <article className="item-portfolio">
      <a href={props.link} className="item-portfolio__image-ibg">
        <img src={props.photo} alt="Agency Website" />
      </a>
      <div className="item-portfolio__body">
        <h4 className="item-portfolio__title">
          <a href={props.link} className="item-portfolio__link-title">
            {props.title}
          </a>
        </h4>
        <div className="item-portfolio__footer">
          <a
            href={props.link}
            className="item-portfolio__category category-link"
          >
            {props.textButton}
          </a>
          <a href={props.link} className="item-portfolio__link _icon-link" />
        </div>
      </div>
    </article>
  );
};

export default Post;
