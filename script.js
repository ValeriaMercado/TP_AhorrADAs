const $ = (selector) => document.querySelector(selector)
const $$ = (selectors) => document.querySelectorAll(selectors)

//TOGGLE FILTERS
const toggle = $('#toggleFilters')
const containerFilter = $('#filterContainer')

toggle.addEventListener("click", (e) => {
        e.preventDefault()
       if (toggle.innerText === 'Ocultar filtros'){
        containerFilter.classList.add('hidden')
        toggle.innerText = 'Mostrar filtros'
       }
       else {
        containerFilter.classList.remove('hidden')
        toggle.innerText = 'Ocultar filtros'
       }
    })

    
  