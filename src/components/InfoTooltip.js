import React from "react";
import SuccessImage from "../images/Success-image.svg";
import ErrorImage from "../images/Error-image.svg";

function infoTooltip({isOpen, onClose, isSuccess}) {
  return (
    <div className={`popup popup_infotooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content popup__content-infotooltip">
        <button
          type="button"
          className="popup__button-close button"
          onClick={onClose}
        ></button>
        <img
          className="popup__image-infotooltip"
          src={isSuccess ? `${SuccessImage}` : `${ErrorImage}`}
          alt="статус"
        />
        <h2 className="popup__title-infotooltip">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз"}
        </h2>
      </div>
    </div>
  )
}

export default infoTooltip;
