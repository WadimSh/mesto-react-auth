import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  };

  const handleChangeUserName = (e) => {
    setName(e.target.value);
  };

  const handleChangeUserDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isOpen={props.isOpen}
      buttonTextSubmit={props.buttonTextSubmit}
      name="profile"
      title="Редактировать профиль"
    >
      <input
        value={name || ""}
        onChange={handleChangeUserName}
        type="text"
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Ваше имя"
        autoComplete="off"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__input-error name-error" />
      <input
        value={description || ""}
        onChange={handleChangeUserDescription}
        type="text"
        className="popup__input popup__input_type_prof"
        name="profile"
        placeholder="Ваш род занятий"
        autoComplete="off"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__input-error profile-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
