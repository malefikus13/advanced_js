// Задание №1 и №2
let firstText = "'Well,' Jack began, 'it's a long story.'";
const regExp = /\'/g;
const regExpFull = /\B'/g;

let secondText = firstText.replace(regExp, '"');
let secondTextFull = firstText.replace(regExpFull, '"');

console.log(`Изначальный текст: ${firstText}`);
console.log(`Замена всех ковычек: ${secondText}`);
console.log(`Замена всех ковычек, кроме апострафов: ${secondTextFull}`);


// Задание №3
const myForm = document.querySelector("#test_form");
const send = myForm.querySelector('#submit');
const userNameInput = myForm.querySelector('#name');
const userPhoneInput = myForm.querySelector('#phone');
const userMailInput = myForm.querySelector('#email');
const userText = myForm.querySelector('#text');
const myField = myForm.querySelectorAll('[data-info]');

const regExprName = /^[a-zA-Z]{4,6}$/;
const regExprPhone = /^[+][7][(][0-9]{3}[)][0-9]{3}[ -][0-9]{4}$/;
const regExprMail_1 = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
const regExprMail_2 = /^[a-z]{2}[\.-][a-z]{4}@[a-z]{4}[\.][a-z]{2}$/;

const checkEmptyFields = () => {
	myField.forEach(item => {
		if (!item.value) {
			alert('Заполните обязательное поле ' + item.name + ' !!!');
		}
	})
};

const checkNameField = () => {
	if (!regExprName.test(userNameInput.value)) {
		userNameInput.classList.add('red');
		alert('Введите корректное имя пользователя!');
	} else {
		userNameInput.classList.add('green');
	}
};

const checkPhoneField = () => {
	if (!regExprPhone.test(userPhoneInput.value)) {
		userPhoneInput.classList.add('red');
		alert('Введите корректный номер телефона!');
	} else {
		userPhoneInput.classList.add('green');
	}
}

const checkMailField = () => {
	if (!regExprMail_1.test(userMailInput.value)) {
		userMailInput.classList.add('red');
		alert('Введите корректную электронную почту!');
	} else {
		userMailInput.classList.add('green');
	}
}

send.addEventListener('click', ev => {
	ev.preventDefault();

	console.log('Имя пользователя: ' + userNameInput.value);
	console.log('Номер телефона пользователя: ' + userPhoneInput.value);
	console.log('Адрес электронной почты пользователя: ' + userMailInput.value);
	console.log('Комментарий пользователя: ' + userText.value);

	checkNameField();
	checkPhoneField();
	checkMailField();
});