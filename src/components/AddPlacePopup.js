import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setPlaceName] = React.useState("");
  const [link, setPlaceLink] = React.useState("");

  React.useEffect(() => {
    setPlaceName("");
    setPlaceLink("");
  }, [props.isOpen]);

  const handelNameChange = (e) => {
    setPlaceName(e.target.value);
  };

  const handelLinkChange = (e) => {
    setPlaceLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  };

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonTextSubmit={props.buttonTextSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_type_title"
        name="title"
        value={name || ""}
        onChange={handelNameChange}
        placeholder="Название картинки"
        autoComplete="off"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__input-error title-error" />
      <input
        type="url"
        className="popup__input popup__input_type_photo"
        name="photo"
        value={link || ""}
        onChange={handelLinkChange}
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
      />
      <span className="popup__input-error photo-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
