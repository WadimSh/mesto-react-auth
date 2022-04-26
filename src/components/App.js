import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeletePopupCard from './DeletePopupCard.js';
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isPlaceDeletePopupOpen, setIsPlaceDeletePopupOpen] = React.useState(false);
  
  const [submitTextUserPopup, setSubmitTextUserPopup] = React.useState('Сохранить');
  const [submitTextAddPlacePopup, setSubmitTextAddPlacePopup] = React.useState('Сохранить');
  const [submitTextDeletePlacePopup, setSubmitTextDeletePlacePopup] = React.useState('Да');

  const [selectedCard, setSelectedCard] = React.useState({
    link: "",
    name: "",
  });
  const [deletCard, setDeleteCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user,cards]) => {
        setCards(cards);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .addLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    setSubmitTextDeletePlacePopup('Удаление...');
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    setSubmitTextAddPlacePopup('Создание...');
    api
      .postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = (data) => {
    setSubmitTextUserPopup('Сохранение...');
    api
      .patchUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateAvatar = (data) => {
    setSubmitTextUserPopup('Сохранение...');
    api
      .patchUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEditAvatarClick = () => {
    setSubmitTextUserPopup('Сохранить');
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setSubmitTextUserPopup('Сохранить');
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setSubmitTextAddPlacePopup('Создать');
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handlePlaceDeletePopupOpen = (card) => {
    setSubmitTextDeletePlacePopup('Да');
    setIsPlaceDeletePopupOpen(true);
    setDeleteCard(card);
  }

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsPlaceDeletePopupOpen(false);
    setSelectedCard({ link: "", name: "" });
    setDeleteCard({});
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          onCardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardLike={handleCardLike}
          onCardDelete={handlePlaceDeletePopupOpen}
          cards={cards}
        />
     
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonTextSubmit={submitTextUserPopup}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonTextSubmit={submitTextUserPopup}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonTextSubmit={submitTextAddPlacePopup}
        />

        <DeletePopupCard
          card={deletCard}
          isOpen={isPlaceDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          buttonTextSubmit={submitTextDeletePlacePopup}
        /> 
        
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
