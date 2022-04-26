import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  const [avatar, setUserAvatar] = React.useState("");

  React.useEffect(() => {
    setUserAvatar("");
  }, [props.isOpen]);

  const handelAvatarChange = (e) => {
    setUserAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      buttonTextSubmit={props.buttonTextSubmit}
      name="avatar"
      title="Обновить аватар"
    >
      <input
        ref={avatarRef}
        type="url"
        className="popup__input popup__input_type_avatar"
        name="avatar"
        value={avatar}
        onChange={handelAvatarChange}
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
      />
      <span className="popup__input-error avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
