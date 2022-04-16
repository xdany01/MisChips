let items = [];
let list = document.getElementById('list');
let ingredientesOcultos = document.getElementById('ingredientesOcultos');

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
    focusEle('#txt');
}
const chip = (item, index, style) => {
    return `<li class="d-inline-block ${style}">${item}<a href="javascript:remove(${index})">&times;</a></li>`;
}
const fnAlert = (msj, tipo) => {
    return `<div id="dnAlert" class="alert alert-${tipo} alert-dismissible fade show position-absolute top-0 end-0 mt-5 me-5" role="alert">
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
    let alertDOM = document.querySelector('#dnAlert');
    hideAlert(alertDOM);
}
const render = () => {
    list.innerHTML = '';
    items.map((item, index) => {
        list.innerHTML += chip(item, index, 'green');
    });
    ingredientesOcultos.value = items.toString();
    list.insertAdjacentHTML('beforeend', `<li class="d-inline-block"><input autocomplete="off" class="input-txt" id="txt" type="text"></li>`);
}
document.addEventListener('keydown', (e) => {
    if (e.target.matches('#txt')) {
        let txt = e.target;
        let val = txt.value.trim();
        if (e.key === 'Backspace') {
            if (val === '') {
                items.pop();
                render();
                txt.value = '';
                focusEle('#txt');
            }
        }
        if (e.key === 'Enter') {
            let body = document.querySelector('body');
            if (val !== '') {
                if (items.indexOf(val) >= 0) {
                    showAlert(body, 'El item esta repetido.', 'warning');
                    document.querySelector('#txt').focus();
                } else {
                    items.push(val);
                    render();
                    txt.value = '';
                    focusEle('#txt');
                }
            } else {
                showAlert(body, 'Ingrese un item porfavor.', 'info');
                focusEle('#txt');
            }
        }
    }
});
document.addEventListener('click', (e) => {
    if (e.target.matches('#dnFormControl')) {
        focusEle('#txt');
    }
});
ready(function () {
    render();
});
