let items = [];
let list = document.querySelector('ul[data-dn-list-items]');
let itemsOcultos = document.querySelector('input[data-dn-items-ocultos]');
let varianteColor = document.querySelector('input[data-dn-color]').getAttribute('data-dn-color');

const ready = function (cb) {
    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", function (e) {
        cb();
    }) : cb();
}
const focusEle = (element) => {
    document.querySelector(element).focus();
}
const remove = (i) => {
    items = items.filter(item => items.indexOf(item) !== i);
    render();
    focusEle('input[data-dn-input-text]');
}
const chip = (item, index, style) => {
    return `<li class="d-inline-block ${style}">${item}<a href="javascript:remove(${index})">&times;</a></li>`;
}
const fnAlert = (msj, tipo) => {
    return `<div data-dn-alert="dnAlert" class="alert alert-${tipo} alert-dismissible fade show position-absolute top-0 end-0 mt-5 me-5" role="alert">
                ${msj}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
}
const hideAlert = (alertDOM) => {
    setInterval(() => {
        alertDOM.classList.remove('show');
        alertDOM.classList.add('hide');
    }, 1500);
    setInterval(() => alertDOM.remove(), 3000);
}
const showAlert = (adjacent, msj, tipo) => {
    let alert = fnAlert(msj, tipo);
    adjacent.insertAdjacentHTML("afterbegin", alert);
    let alertDOM = document.querySelector('div[data-dn-alert]');
    hideAlert(alertDOM);
}
const render = (varianteColor) => {
    list.innerHTML = '';
    items.map((item, index) => {
        list.innerHTML += chip(item, index, varianteColor);
    });
    itemsOcultos.value = items.toString();
    list.insertAdjacentHTML('beforeend', `<li class="d-inline-block"><input autocomplete="off" class="input-txt" data-dn-input-text="txt" type="text"></li>`);
}
document.addEventListener('keydown', (e) => {
    if (e.target.matches('input[data-dn-input-text]')) {
        let txt = e.target;
        let val = txt.value.trim();
        if (e.key === 'Backspace') {
            if (val === '') {
                items.pop();
                render(varianteColor);
                txt.value = '';
                focusEle('input[data-dn-input-text]');
            }
        }
        if (e.key === 'Enter') {
            let body = document.querySelector('body');
            if (val !== '') {
                if (items.indexOf(val) >= 0) {
                    showAlert(body, 'El item esta repetido.', 'warning');
                    focusEle('input[data-dn-input-text]');
                } else {
                    items.push(val);
                    render(varianteColor);
                    txt.value = '';
                    focusEle('input[data-dn-input-text]');
                }
            } else {
                showAlert(body, 'Ingrese un item porfavor.', 'info');
                focusEle('input[data-dn-input-text]');
            }
        }
    }
});
document.addEventListener('click', (e) => {
    if (e.target.matches('div[data-dn-form-control]') || e.target.matches('ul[data-dn-list-items]') || e.target.matches('input[data-dn-items-ocultos] ~ label')) {
        focusEle('input[data-dn-input-text]');
    }
});
ready(function () {
    render(varianteColor);
});
