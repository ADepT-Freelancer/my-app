import LoadingSpinner1s200px from "../../assets/images/LoadingSpinner1s200px.svg";
import React from "react";

let Preloader: React.FC = () => {
  return (
    <div>
      <img src={LoadingSpinner1s200px} alt="Preloader" />
    </div>
  );
};

export default Preloader;
