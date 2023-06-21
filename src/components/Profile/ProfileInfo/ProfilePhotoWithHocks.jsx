import React, { useEffect, useState } from "react";
import userPhoto from "../../../assets/images/user.jpg";

const ProfilePhotosWithHocks = (props) => {
  let [editMode, setEditMode] = useState(true);
  let [urlPhotoLocal, setUrlPhotoLocal] = useState(props.urlPhoto);

  useEffect(() => {
    setUrlPhotoLocal(props.urlPhoto);
  }, [props.urlPhoto]);

  const activateMode = () => {
    setEditMode(true);
  };
  const deActivateMode = () => {
    setEditMode(false);
    props.updateUrlPhoto(urlPhotoLocal);
  };

  const onPhotosChange = (e) => {
    setUrlPhotoLocal(e.currentTarget.value);
  };

  return (
    <section data-fp-section="">
      {editMode && (
        <div>
          <textarea
            onChange={onPhotosChange}
            autoFocus={true}
            onBlur={deActivateMode}
            value={urlPhotoLocal}
            className="profile-avatar__textarea"
          />
        </div>
      )}
      {!editMode && (
        <div onDoubleClick={activateMode}>
          <img
            className="profile__avatar decor-main-section__picture "
            src={props.urlPhoto }
            alt="AvatarProfile"
          />
        </div>
      )}
    </section>
  );
};

export default ProfilePhotosWithHocks;
