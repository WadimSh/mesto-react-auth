import React from 'react';
import successIcon from '../images/success-icon.svg';
import failIcon from '../images/fail-icon.svg';


function InfoTooltip(props) {

  return (
    <div className={`popup popup_type_open ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="infoTooltip">
        <img className="infoTooltip__image" src={props.status ? successIcon : failIcon} />
        <p className="infoTooltip__text">
          {props.status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
        <button type="button" className="popup__close popup__close-img" onClick={props.onClose} />
      </div>
    </div>
  )
}

export default InfoTooltip;