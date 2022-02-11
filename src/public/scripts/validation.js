const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input'); //access inputs inside form

const expressions = {
    fullname: /^[a-zA-ZÀ-ÿ\s]{4,64}$/, // Letras y espacios, pueden llevar acentos.
    lastname: /^[a-zA-ZÀ-ÿ\s]{4,64}$/, // Letras y espacios, pueden llevar acentos.
    id: /^.{4,24}$/,
    username: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    password: /^.{8,24}$/ // 4 a 12 digitos.
};

const espacios = {
    fullname: false,
    lastname: false,
    id: false,
    username: false,
    password: false
};

const validateForm = (e) => {
    switch (e.target.name) {
    case 'fullname':
        validateCamp(expressions.fullname, e.target, 'fullname');
        break;
    case 'lastname':
        validateCamp(expressions.lastname, e.target, 'lastname');
        break;
    case 'id':
        validateCamp(expressions.id, e.target, 'id');
        break;
    case 'username':
        validateCamp(expressions.username, e.target, 'username');
        break;
    case 'password':
        validateCamp(expressions.password, e.target, 'password');
        break;
    }
};

const validateCamp = (expression, input, espacio) => {
    if (expression.test(input.value)){
        document.getElementById(`group__${espacio}`).classList.remove('form__group--incorrect');
        document.getElementById(`group__${espacio}`).classList.add('form__group--correct');
        document.querySelector(`#group__${espacio} i`).classList.add('fa-check-circle');
        document.querySelector(`#group__${espacio} i`).classList.remove('fa-times-circle');
        document.querySelector(`#group__${espacio}  .form__input-error`).classList.remove('form__input-error-act');
        espacios[espacio] = true;
    } else {
        document.getElementById(`group__${espacio}`).classList.add('form__group--incorrect');
        document.getElementById(`group__${espacio}`).classList.add('form__group--correct');
        document.querySelector(`#group__${espacio} i`).classList.add('fa-times-circle');
        document.querySelector(`#group__${espacio} i`).classList.remove('fa-check-circle');
        document.querySelector(`#group__${espacio}  .form__input-error`).classList.add('form__input-error-act');
        espacios[espacio] = false;
    }
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

form.addEventListener('submit', (e) => {
    
    if(espacios.fullname && espacios.lastname && espacios.id  && espacios.username  && espacios.password){
        this.submit();
        //return;
    } else {
        e.preventDefault();
        document.querySelectorAll('.form__group--correct').forEach((icon) => {
            icon.classList.remove('form__group--correct');
        });
        document.querySelectorAll('.form__group--incorrect').forEach((icon) => {
            icon.classList.remove('form__group--incorrect');
        });
        document.getElementById('form__message').classList.add('form__message--act');
        setTimeout(() => {
            document.getElementById('form__message').classList.remove('form__message--act');
        }, 5000);
    } 
});