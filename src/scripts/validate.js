//Показать ошибку
const showInputError = (formElement, inputElement, errorMessage, obj) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
};

//Скрыть ошибку
const hideInputError = (formElement, inputElement, obj) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
}; 

//Функция валидации поля ввода
const isValid = (formElement, inputElement, obj) => {
  if (inputElement.validity.patternMismatch) {
        // встроенный метод setCustomValidity принимает на вход строку
        // и заменяет ею стандартное сообщение об ошибке
    inputElement.dataset.errorMessage = "Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы."
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
        // если передать пустую строку, то будут доступны
        // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    // теперь, если ошибка вызвана регулярным выражением,
        // переменная validationMessage хранит наше кастомное сообщение
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

//Функция проверки валидности всех введенных полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
}; 

//Функция активации кнопки отправки формы
const toggleButtonState = (inputList, buttonElement, obj) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(obj.inactiveButtonClass);
  } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
    buttonElement.classList.remove(obj.inactiveButtonClass);
  }
}; 

//Функция включения-отключения кнопок отравки в формах
export const setEventListeners = (formElement, obj) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));

  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, obj);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
};

//Функция включения функционала проверки на валидность в формах
export const enableValidation = (obj) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(obj.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, obj);
  });
};

//функция очистки ошибок валидации в формах
export const clearValidation = (profileForm, obj) => {
  const inputList = Array.from(profileForm.querySelectorAll(obj.inputSelector));
  
  inputList.forEach((inputElement) => {
    if (!inputElement.validity.valid) {
      hideInputError(profileForm, inputElement, obj)
    } else {
      return inputElement;
    }
  });
}