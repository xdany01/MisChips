let items = [];
let list = document.getElementById('list');
let ingredientesOcultos = document.getElementById('ingredientesOcultos');

const ready = function (cb) {
    document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", function (e) {
            cb();
        })
        : cb();
}

const remove = (i) => {
    items = items.filter(item => items.indexOf(item) !== i);
    render();
}

const chip = (item, index) => {
    return `<li>${item}<a href="javascript: remove(${index})">&times;</a></li>`;
}

const render = () => {
    list.innerHTML = '';
    items.map((item, index) => {
        list.innerHTML += chip(item, index);
    });
    ingredientesOcultos.value = items.toString();
}

document.addEventListener('keydown', (e) => {
    if (e.target.matches('#txt')) {
        let txt = e.target;
        if (e.key === 'Enter') {
            let val = txt.value;
            if (val !== '') {
                if (items.indexOf(val) >= 0) {
                    $('#ingredienteRepetido').toast('show');
                } else {
                    items.push(val);
                    render();
                    txt.value = '';
                }
            } else {
                $('#ingredienteVacio').toast('show');
            }
        }
    }
});

ready(function () {
    render();
});