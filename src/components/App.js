import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] =
    React.useState(false);
  const [isInfoTooltipSuccess, setInfoTooltipSuccess] = React.useState(null);
  const history = useHistory();

  React.useEffect(() => {
    api
      .getProfileInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getCardList()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    auth
      .getInfo(jwt)
      .then((res) => {
        setEmail(res.data.email);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      })
  }, [history]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .getLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((d) => d._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    api
      .changeProfileInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .changeProfileAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onLogin(data) {
    return auth.authorize(data).then(({ token }) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', token);
        setEmail(data.email);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipPopupOpen(true);
        setInfoTooltipSuccess(false);
      })
  }

  function onLogout() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/signin");
  }

  function onRegister(data) {
    return auth.register(data).then(() => {
          setInfoTooltipSuccess(true);
          setInfoTooltipPopupOpen(true);
          history.push("/signin");
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipPopupOpen(true);
        setInfoTooltipSuccess(false);
      })
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userEmail={email} onLogin={onLogin} onLogout={onLogout} />

        <Switch>
          <Route  path="/signup">
            <Register onRegister={onRegister} />
          </Route>

          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>

          <ProtectedRoute
            exact
            path='/'
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            clickOnCard={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            loggedIn={loggedIn}
            onLogout={onLogout}
          />

        </Switch>

        {/* Форма для редактирования профиля */}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* Форма для добавления новых карточек  */}

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* Попап открытия картинки  */}

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        {/* Попап удаления карточки */}

        <PopupWithForm
          name="delete-image"
          title="Вы уверены?"
          button="Да"
        ></PopupWithForm>

        {/* попап изменения аватара */}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          auth={isInfoTooltipSuccess}
        />

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
