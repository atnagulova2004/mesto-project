import '../pages/index.css';
import { openModal, closeModal } from './modal.js';
import { enableValidation } from './validate.js';
import { initialCards, createCard} from './cards.js';

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
export const imagePopup = document.querySelector('.popup_type_image');
export const popupImage = imagePopup.querySelector('.popup__image');
export const popupCaption = imagePopup.querySelector('.popup__caption');

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const profileEditCloseButton = profilePopup.querySelector('.popup__close');
const cardCloseButton = cardPopup.querySelector('.popup__close');
const imageCloseButton = imagePopup.querySelector('.popup__close');

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

function closeByOverlay (evt) {
  if (evt.target===evt.currentTarget) {
    closeModal(evt.target);
  }
}

popups.forEach (element => {
  element.addEventListener('mousedown', closeByOverlay);
});

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

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

profileFormElement.addEventListener('submit', profileFormSubmit);
cardFormElement.addEventListener('submit', cardFormSubmit);
cardAddButton.addEventListener('click', () => openModal(cardPopup));
profileEditCloseButton.addEventListener('click', () => closeModal(profilePopup));
cardCloseButton.addEventListener('click', () => closeModal(cardPopup));
imageCloseButton.addEventListener('click', () => closeModal(imagePopup));

initialCards.forEach(element => {
  placesList.append(createCard(element));
});


enableValidation(validationSettings);