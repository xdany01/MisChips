let mapa = new Map();
Array.from(document.querySelectorAll('input[data-dn-items-ocultos]')).forEach(e => {
    let name = e.getAttribute('name');
    mapa.set(name, Array());
});

const dnInputText = (contenido) => {
    let retorno = 'input[data-dn-input-text]';
    if (contenido != null) {
        if (contenido.trim().length > 0) {
            retorno = `input[data-dn-input-text='${contenido}']`;
        }
    }
    return retorno;
}
const focusEle = (element) => {
    document.querySelector(element).focus();
}
const chip = (item, index, style, name) => {
    return `<li class="d-inline-flex align-items-center ${style}" >${item}<a href="javascript:remove(${index},'${name}')">&times;</a></li>`;
}
const fnAlert = (msj, tipo) => {
    return `<div data-dn-alert="dnAlert" 
                 class="alert alert-${tipo} alert-dismissible fade show position-absolute top-0 end-0 mt-5 me-5" 
                 role="alert">
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
const render = (list, itemsOcultos, varianteColor) => {
    list.innerHTML = '';
    let name = itemsOcultos.getAttribute('name');
    mapa.get(name).map((item, index) => {
        list.innerHTML += chip(item, index, varianteColor, name);
    });
    itemsOcultos.value = mapa.get(name).toString();
    list.insertAdjacentHTML('beforeend',
        `<li class="d-inline-block">
                <input autocomplete="off" class="input-txt" data-dn-input-text="${name}" type="text">
             </li>`);
}
const remove = (i, name) => {
    let list = document.querySelector(`ul[data-dn-list-items="${name}"]`);
    let itemsOcultos = document.querySelector(`input[data-dn-items-ocultos="${name}"]`);
    let varianteColor = itemsOcultos.getAttribute('data-dn-color');
    let itemsFiltrados = mapa.get(name).filter(item => mapa.get(name).indexOf(item) !== i);
    mapa.set(name, itemsFiltrados);
    render(list, itemsOcultos, varianteColor);
    focusEle(dnInputText(name));
}

document.addEventListener('keydown', (e) => {
    if (e.target.matches(dnInputText())) {
        let name = e.target.getAttribute('data-dn-input-text');
        let list = document.querySelector(`ul[data-dn-list-items="${name}"]`);
        let itemsOcultos = document.querySelector(`input[data-dn-items-ocultos="${name}"]`);
        let varianteColor = itemsOcultos.getAttribute('data-dn-color');
        let txt = e.target;
        let val = txt.value.trim();
        if (e.key === 'Enter') {
            let body = document.querySelector('body');
            if (val !== '') {
                if (mapa.get(name).indexOf(val) >= 0) {
                    showAlert(body, 'El item esta repetido.', 'warning');
                    focusEle(dnInputText(name));
                } else {
                    mapa.get(name).push(val);
                    render(list, itemsOcultos, varianteColor);
                    txt.value = '';
                    focusEle(dnInputText(name));
                }
            } else {
                showAlert(body, 'Ingrese un item porfavor.', 'info');
                focusEle(dnInputText(name));
            }
        }
        if (e.key === 'Backspace') {
            if (val === '') {
                remove(mapa.get(name).length - 1, name);
                txt.value = '';
                focusEle(dnInputText(name));
            }
        }
    }
});
document.addEventListener('click', (e) => {
    if (e.target.matches('div[data-dn-form-control]') || e.target.matches('ul[data-dn-list-items]') || e.target.matches('label[data-dn-label]')) {
        let name = e.target.getAttribute('data-dn-form-control') || e.target.getAttribute('data-dn-list-items') || e.target.getAttribute('data-dn-label')
        focusEle(dnInputText(name));
    }
});
