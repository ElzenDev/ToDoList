
//         ***   V A R I A V E I S ***

const inputArea = document.querySelector('.textInsert')
const inputAreaDiv = document.querySelector('.divInsert')
const btnInsert = document.querySelector('.divInsert button')
const btnDeleteAll = document.querySelector('#dltAll')
const btnChangeTheme = document.querySelector('.themeToggler')
const changeThemeIcon = document.querySelector('#changeThemeIcon')
const ul = document.querySelector('ul')

var itensDB = []

//             *** F U N Ç Õ E S  ***

inputArea.addEventListener('keypresss', e => {
    if (e.key == 'Enter' && inputArea.value != '') {
        setItemDB()
    }
})

btnInsert.onclick = () => {
    if (inputArea.value != '') {
        setItemDB()
    }
}

btnChangeTheme.onclick = () => {
    document.body.classList.toggle('light')
    btnChangeTheme.classList.toggle('light')
    changeThemeIcon.classList.toggle('bi-sun-fill')
    inputArea.classList.toggle('light')
    inputAreaDiv.classList.toggle('light')
    ul.classList.toggle('light')
}

function setItemDB(){
    if (itensDB.length >= 20) {
        alert('Limite maximo de 20 itens atingido')
        return
    }

    itensDB.push({'item': inputArea.value, 'status': ''})
    updateDB()
}

function updateDB() {
    localStorage.setItem('todolist', JSON.stringify(itensDB))
    loadItens()
}

function loadItens() {
    ul.innerHTML = '';
    itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
    itensDB.forEach((item, i) => {
        insertItemTela(item.item, item.status, i)
    })
}

function insertItemTela(text, status, i) {
    const li = document.createElement('li')

    li.innerHTML = `
    <section class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i id='dltIcon' class='bi-trash3-fill'></i></button>
    </section>
    `
    ul.appendChild(li)

    if (status) {
        document.querySelector(`[data-si="${i}"]`).classList.add('line-trough')
    }
    else {
        document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
    }

    inputArea.value = ''
    
}

function done(chk, i) {
    
    if( chk.checked) {
        itensDB[i].status = 'checked'
    } else {
        itensDB[i].status = ''
    }

    updateDB()
}

function removeItem(i) {
    itensDB.splice(i, 1)
    updateDB()
}

btnDeleteAll.onclick = () => {
    itensDB = []
    updateDB()
}

loadItens()