import React, { ChangeEvent, useEffect, useState } from "react";

type PropsType = {
  status: string;
  updateStatus: (status: string) => void;
};

const ProfileStatusWithHocks: React.FC<PropsType> = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateMode = () => {
    setEditMode(true);
  };
  const deActivateMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <section data-fp-section="" className="page__main main-section">
      {!editMode && (
        <div onDoubleClick={activateMode}>
          <span>{props.status || "-----"}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
          placeholder="  - - - - - "
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deActivateMode}
            value={status}
            className="profile__status"
          />
        </div>
      )}
    </section>
  );
};

export default ProfileStatusWithHocks;
