import React, { ChangeEvent, useEffect, useState } from "react";

type PropsProfilePhotosWithHocksType = {
  urlPhoto: string;
  updateUrlPhoto: (urlPhotoLocal: string) => void;
};

const ProfilePhotosWithHocks: React.FC<PropsProfilePhotosWithHocksType> = (
  props
) => {
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

  const onPhotosChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUrlPhotoLocal(e.currentTarget.value);
  };

  return (
    <section data-fp-section="">
      {editMode && (
        <div>
          <textarea
            placeholder=" - - - "
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
            src={props.urlPhoto}
            alt="AvatarProfile"
          />
        </div>
      )}
    </section>
  );
};

export default ProfilePhotosWithHocks;
