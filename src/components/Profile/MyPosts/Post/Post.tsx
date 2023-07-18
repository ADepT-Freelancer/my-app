/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";

type PropsType = {
  link: string | null;
  photo: string | null;
  title: string | null;
  textButton: string | null;
  likeCounter: number;
  id: number;
};

const Post: React.FC<PropsType> = (props) => {
  return (
    <article className="item-portfolio">
      <a href={props.link || " "} className="item-portfolio__image-ibg">
        <img src={props.photo || " "} alt="Agency Website" />
      </a>
      <div className="item-portfolio__body">
        <h4 className="item-portfolio__title">
          <a href={props.link || " "} className="item-portfolio__link-title">
            {props.title}
          </a>
        </h4>
        <div className="item-portfolio__footer">
          <a
            href={props.link || " "}
            className="item-portfolio__category category-link"
          >
            {props.textButton}
          </a>
          <a  href={props.link || " "} className="item-portfolio__link _icon-link" />
        </div>
      </div>
    </article>
  );
};

export default Post;
