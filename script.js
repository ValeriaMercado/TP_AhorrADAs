const $ = (selector) => document.querySelector(selector)
const $$ = (selectors) => document.querySelectorAll(selectors)

//DOM EVENTS
const toggleFilter = $('#toggleFilters')
const containerFilter = $('#filterContainer')
const btnAddOperation = $('#btnAddOperation')
const toggleOperation = $('#toggleOperation')

toggleFilter.addEventListener("click", (e) => {
        e.preventDefault()
       if (toggleFilter.innerText === 'Ocultar filtros'){
        containerFilter.classList.add('hidden')
        toggleFilter.innerText = 'Mostrar filtros'
       }
       else {
        containerFilter.classList.remove('hidden')
        toggleFilter.innerText = 'Ocultar filtros'
       }
    })

btnAddOperation.addEventListener('click', (e)=>{
        e.preventDefault()
        operations.push(newOperation())
        addOperation()
        console.log(operations)
})

toggleOperation.addEventListener("click", (e) => {
    e.preventDefault()
    $('#newOperationContainer').classList.remove('hidden')
    
})

// NEW OPERATION
let operations = []

const newOperation = () => {
        const descriptionOperation = $('#description').value
        const amountOperation = parseInt($('#amountOperation').value)
        const operationType = $('#operationType').value
        const selectCategoryOperation = $('#selectCategoryOperation').value
        const dateOperation = $('#dateOperation').value
        return{
                descriptionOperation,
                amountOperation,
                operationType,
                selectCategoryOperation,
                dateOperation
        }
}

const addOperation = () =>{
        operations.map(operation =>{
                $('#tableContainer').innerHTML += `
                <ul class="flex justify-between  w-1/4 mt-2 mr-10 px-10">
                <li "m-auto">
                    <span class="ml-2 mr-10 text-black">${operation.descriptionOperation}</span>
                </li>
                <li "m-auto">
                    <span class="ml-2 mr-10 text-black">${operation.amountOperation}</span>
                </li>
                <li "m-auto">
                    <span class="ml-2 mr-10 text-black">${operation.operationType}</span>
                </li>
                <li "m-auto">
                    <span class="ml-2 mr-10 text-black">${operation.selectCategoryOperation}</span>
                </li>
                <li "m-auto">
                    <span class="ml-2  text-black">${operation.dateOperation}</span>
                </li>
                </ul>
                <button class="editOperation">Editar</button>
                <button class="deleteOperation" data-id"${operation.descriptionOperation}">Eliminar</button>
                `
        })
}

  