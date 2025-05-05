// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const profileFormElement = document.querySelector('[name="edit-profile"]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profilePopup = document.querySelector('.popup_type_edit');
const profileName = profilePopup.querySelector('[name="name"]');
const profileNewDescription = profilePopup.querySelector('[name="description"]');
const popups = document.querySelectorAll('.popup');

const cardFormElement = document.querySelector('[name="new-place"]');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const profileEditCloseButton = profilePopup.querySelector('.popup__close');
const cardCloseButton = cardPopup.querySelector('.popup__close');
const imageCloseButton = imagePopup.querySelector('.popup__close');

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');

});

function openModal(popup) {      
  popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

profileEditButton.addEventListener('click', () => {
  profileName.value = profileTitle.textContent;
  profileNewDescription.value = profileDescription.textContent;
  openModal(profilePopup);
});

function profileFormSubmit(evt) {
  evt.preventDefault();
  profileDescription.textContent = profileNewDescription.value;
  profileTitle.textContent = profileName.value;
  closeModal(profilePopup);
}

function cardFormSubmit(evt) {
  evt.preventDefault();
  const formInitialCards = [
    {
      name: document.querySelector('[name="place-name"]').value,
      link: document.querySelector('[name="link"]').value,
    }
  ];
  formInitialCards.forEach(element => {
    placesList.prepend(createCard(element));
  });
  cardFormElement.reset();
  closeModal(cardPopup);
}

profileFormElement.addEventListener('submit', profileFormSubmit);
cardFormElement.addEventListener('submit', cardFormSubmit);

cardAddButton.addEventListener('click', () => openModal(cardPopup));
profileEditCloseButton.addEventListener('click', () => closeModal(profilePopup));
cardCloseButton.addEventListener('click', () => closeModal(cardPopup));
imageCloseButton.addEventListener('click', () => closeModal(imagePopup));

// @todo: Функция создания карточки
const createCard = (initialCards) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = initialCards.link;
  cardImage.alt = initialCards.name;
  cardTitle.textContent = initialCards.name;

  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  cardImage.addEventListener('click', () => {
    popupImage.src = initialCards.link;
    popupImage.alt = initialCards.name;
    popupCaption.textContent = initialCards.name;
    openModal(imagePopup);
  });

  return cardElement;
}

initialCards.forEach(element => {
  placesList.append(createCard(element));
});
