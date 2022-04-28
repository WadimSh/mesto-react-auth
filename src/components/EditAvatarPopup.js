import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  

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
        
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
      />
      <span className="popup__input-error avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
