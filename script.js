
const $ = (selector) => document.querySelector(selector);
const $$ = (selectors) => document.querySelectorAll(selectors);

const $btnAdd = $("#btn-add");
const $categories = $("#container-categories");
const $newCategories = $("#categorie");
const $tableCategories = $("#table-categories");


let defaultCategories = [
  { id: 1, nombre: "Comida", },
  { id: 2, nombre: "Servicios", },
  { id: 3, nombre: "Salidas", },
  { id: 4, nombre: "Educacion", },
  { id: 5, nombre: "Trabajo", }
];


let categories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : defaultCategories;

if (!localStorage.getItem('categories')) {
  localStorage.setItem('categories', JSON.stringify(categories))
}

const getDataFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

const sendDataFromLocalStorage = (key, array) => {
  return localStorage.setItem(key, JSON.stringify(array))
}

const btnEdit = $$(".btn-edit")
const btnDelete = $$(".btn-delete")

// *******************************************************GENERATE TABLE & REMOVE***********************************************
const generateTable = (categories) => {
  for (const category of categories) {
    table.innerHTML += `
    <tr class="w-[20%] h-10 mb-5 categoryColumn"  >
                        <th class="w-[80%] text-start mb-3">${category.id, category.nombre}</th>
                        <th scope="col"><button class= "mr-3 btn-edit text-green-500" data-id="${category.id}" onclick="categoriesEdit(${category.id})">Editar</button></th>
                        <th scope="col"> <button class= "btnRemove text-red-500" data-id="${category.id}">Eliminar</button></th>
            </tr>
               `
  }

  const btnRemove = $$(".btnRemove")
  for (const btn of btnRemove) {
    const categoryId = btn.getAttribute("data-id")
    btn.addEventListener("click", () => {
      deleteCategory(categoryId)

    })
  }

}

generateTable(JSON.parse(localStorage.getItem('categories')))


// ********************************************************GENERATE NEW CATEGORY*************************************************



const random = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}
const categoryInfo = () => {
  const nombre = $("#addCategory").value;
  let id = random(6, 999)
  return {
    id,
    nombre
  };
};


const generateNewCategory = () => {
  if ($("#addCategory").value === "") {
    return alert("Debe ingresar un nombre para la categoría")
  } else {
    table.innerHTML = ''
    categories.push(categoryInfo());
    $("#addCategory").value = ""
    localStorage.setItem('categories', JSON.stringify(categories))
    generateTable(JSON.parse(localStorage.getItem('categories')))

  }
}
$btnAdd.addEventListener("click", generateNewCategory)


$("#addCategory").addEventListener("keypress", (e) => {
  if (e.keyCode == '13') {
    generateNewCategory();
  }
})

// ********************************************************DELETE CATEGORY*******************************************************

const deleteCategory = (categoryId) => {
  table.innerHTML = ''
  let categoriesLocal = JSON.parse(localStorage.getItem('categories'))
  let newCategories = categoriesLocal.filter((category) => {
    return category.id !== parseInt(categoryId)

  })

  categories = newCategories
  localStorage.setItem('categories', JSON.stringify(newCategories))
  generateTable(JSON.parse(localStorage.getItem('categories')))
}

const findCategory = (id) => {
  return categories.find((category) => category.id === id);

};

// **********************************************************EDIT & CANCEL************************************************

const categoriesEdit = (id) => {

  $("#container-categories").classList.add("hidden");
  $("#container-edit-categories").classList.remove("hidden");
  const selectCategory = findCategory(id);
  $("#editName").value = `  ${selectCategory.nombre}`;
  $("#btn-editForm").setAttribute("data-id", id);
  $("#btn-cancel").setAttribute("data-id", id);


};

const saveCategoryData = (id) => {
  return {
    id,
    nombre: $("#editName").value,
  };
};

const editCategory = (id) => {
  return categories.map((category) => {
    if (category.id === parseInt(id)) {
      return saveCategoryData(parseInt(id));
    };
    return category

  });

};

$("#btn-editForm").addEventListener("click", () => {
  const categoriesId = $("#btn-editForm").getAttribute("data-id");
  $("#container-edit-categories").classList.add("hidden")
  $("#container-categories").classList.remove("hidden");
  $("#table").innerHTML = ''


  let categoriesEdit = editCategory(parseInt(categoriesId))
  localStorage.setItem('categories', JSON.stringify(categoriesEdit))
  categories = categoriesEdit;

  generateTable(JSON.parse(localStorage.getItem('categories')))

})


// ********************************************BUTTONS EVENTS********************************************************************

$("#btn-cancel").addEventListener("click", () => {
  $("#container-edit-categories").classList.add("hidden");
  $("#container-categories").classList.remove("hidden");

})


$("#showCategories").addEventListener("click", (e) => {
  e.preventDefault()
  $("#container-categories").classList.remove("hidden")
  $(".balance-section").classList.add("hidden")
  $("#select-box-filtros").classList.add("hidden")
  $("#operationContainer").classList.add("hidden")
  $("#newOperationContainer").classList.add("hidden")
  $("#editOperationContainer").classList.add("hidden")
  $("operations").classList.add("hidden")
  $("#reports").classList.add("hidden")

})

// ***************************************************************DOM EVENTS*****************************************************
const toggleFilter = $('#toggleFilters')
const containerFilter = $('#filterContainer')
const btnAddOperation = $('#btnAddOperation')
const toggleOperation = $('#toggleOperation')
const toggleOperation2 = $('#toggleOperation2')


toggleFilter.addEventListener("click", (e) => {
  e.preventDefault()
  if (toggleFilter.innerText === 'Ocultar filtros') {
    containerFilter.classList.add('hidden')
    toggleFilter.innerText = 'Mostrar filtros'
  }
  else {
    containerFilter.classList.remove('hidden')
    toggleFilter.innerText = 'Ocultar filtros'
  }
})

btnAddOperation.addEventListener('click', (e) => {
  $("#operations").classList.add("hidden")
  e.preventDefault()
  $('#newOperationContainer').classList.add('hidden')
  $('#balance').classList.remove("hidden")
  $('#select-box-filtros').classList.remove("hidden")
  $('#operationContainer').classList.remove("hidden")

})

toggleOperation.addEventListener("click", (e) => {
  e.preventDefault()
  $('#newOperationContainer').classList.remove('hidden')

})

toggleOperation2.addEventListener("click", (e) => {
  e.preventDefault()
  $('#newOperationContainer').classList.remove('hidden')
  $('#balance').classList.add("hidden")
  $('#select-box-filtros').classList.add("hidden")
  $('#container-categories').classList.add("hidden")
  $('#operationContainer').classList.add("hidden")
})



// *********************************************************OPERATIONS**************************************************************

let operationsDefault = []

let operations = localStorage.getItem('operations') ? JSON.parse(localStorage.getItem('operations')) : operationsDefault;

if (!localStorage.getItem('operations')) {
  localStorage.setItem('operations', JSON.stringify(operations))
}


const btnEditOp = $$(".editOperation")

const generateOperationTable = (operations) => {
  $('#tableContainer').innerHTML = ''
  operations.map(operation => {
    $('#tableContainer').innerHTML += `
                <table class=" w-full">
                <tr class="w-full font-bold text-center">
                <td class="w-1/5 font-bold"> ${operation.descriptionOperation}</td>
                <td class="w-1/5 font-bold hidden"> ${operation.ids}</td>
                    <td class="w-1/5 mr-3 btn-edit text-green-500">${operation.selectCategoryOperation}</td>
                    <td class="w-1/5">${operation.dateOperation}</td>
                    <td class="w-1/5"><p>${operation.amountOperation}</p></td>
                    <td class="w-1/5 space-y-1 flex-row space-x-2 items-center text-blue-700 ml-[40%]"> <button class="editOperation" data-id="${operation.ids}" onclick="operationsEdit(${operation.ids})"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btnDeleted text-red-500" data-id="${operation.ids}" onclick="location.reload()"><i class="fa-solid fa-trash"></i></button></td>
                </tr>
                </table>
            `
  })

  const btnDeleted = $$(".btnDeleted")
  for (const btn of btnDeleted) {
    const operationId = btn.getAttribute("data-id")
    btn.addEventListener("click", () => {
      deleteOperation(operationId)

    })
  }


}
generateOperationTable(JSON.parse(localStorage.getItem('operations')))


const operationInfo = () => {
  const ids = random(6, 999)
  const descriptionOperation = $('#description').value
  const amountOperation = parseInt($('#amountOperation').value)
  const operationType = $('#operationType').value
  const selectCategoryOperation = $('#selectCategoryOperation').value
  const dateOperation = $('#dateOperation').value
  return {
    descriptionOperation,
    amountOperation,
    operationType,
    selectCategoryOperation,
    dateOperation,
    ids

  }
}
// *********************************************************NEW OPERATION********************************************************

const generateNewOperation = () => {
  $('#tableContainer').innerHTML = ''
  operations.push(operationInfo());
  $("#descriptionEdit").value = ""
  localStorage.setItem('operations', JSON.stringify(operations))
  generateOperationTable(JSON.parse(localStorage.getItem('operations')))

}

$("#btnAddOperation").addEventListener("click", generateNewOperation)


$("#descriptionEdit").addEventListener("keypress", (e) => {
  if (e.keyCode == '13') {
    generateNewOperation();
  }
})

// ********************************************************DELETE OPERATION******************************************************

const deleteOperation = (operationId) => {
  $('#tableContainer').innerHTML = ''
  let operationsLocal = JSON.parse(localStorage.getItem('operations'))
  let newOperations = operationsLocal.filter((operation) => {
    return operation.ids !== parseInt(operationId)

  })

  operations = newOperations
  localStorage.setItem('operations', JSON.stringify(operations))
  generateOperationTable(JSON.parse(localStorage.getItem('operations')))
}



const findOperation = (ids) => {
  return operations.find((operations) => operations.ids === ids);

};

// **************************************EDIT & CANCEL****************************************************************************

const operationsEdit = (ids) => {
  $("#btnEditOperation").setAttribute("data-id", ids);
  $("#editOperationContainer").classList.remove("hidden");
  $('#balance').classList.add("hidden")
  $('#select-box-filtros').classList.add("hidden")
  $('#container-categories').classList.add("hidden")
  $('#operationContainer').classList.add("hidden")
  const chosenOp = findOp(ids);
  $("#description").value = chosenOp.descriptionOperation
  $("#amount").value = chosenOp.amountOperation

};

const saveOperationData = (ids) => {
  return {
    descriptionOperation: $("#descriptionEdit").value,
    amountOperation: $("#amountOperationEdit").value,
    selectCategoryOperation: $("#selectCategoryOperationEdit").value,
    operationType: $("#operationTypeEdit").value,
    dateOperation: $("#dateOperationEdit").value,
    ids,
  };
};


const editOperations= (ids) => {
  return operations.map((operation) => {
    if (operation.ids === parseInt(ids)) {
      return saveOperationData(parseInt(ids));
    };
    return operation

  });

};

$("#btnEditOperation").addEventListener("click", () => {
  const operationsId = $("#btnEditOperation").getAttribute("data-id");
  $("#editOperationContainer").classList.add("hidden")
  $('#tableContainer').innerHTML  = ''


  let operationsEdit = editOperations(parseInt(operationsId))
  localStorage.setItem('operations', JSON.stringify(operationsEdit))
  operations = operationsEdit;

  generateOperationTable(JSON.parse(localStorage.getItem('operations')))

})

$("#cancelEditOp").addEventListener("click", () => {
  $("#editOperationContainer").classList.add("hidden")
  $('#balance').classList.remove("hidden")
  $('#select-box-filtros').classList.remove("hidden")
  $('#operationContainer').classList.remove("hidden")
})

$("#cancelAddOperation").addEventListener("click", () => {
  $("#newOperationContainer").classList.add("hidden")
  $('#balance').classList.remove("hidden")
  $('#select-box-filtros').classList.remove("hidden")
  $('#operationContainer').classList.remove("hidden")
})

// *********************************************************************BALANCE****************************************************

const gainBalance = $("#gananciasBalance");
const spendingBalance = $("#gastosBalance")
let balanceTotal = ("#balance-total");

const generateTableBalance = () => {
getDataFromLocalStorage("operations");
let gainBalance  = 0
let spendingBalance = 0

for (const operation of operations) {
  if (operation.operationType === "spending"){
    spendingBalance += operation.amountOperation

  } else if 
    (operation.operationType === "gain"){
      gainBalance += operation.amountOperation
    }
  }

  balanceTotal = gainBalance - spendingBalance

  $("#balance").innerHTML = `
  <h2 class="font-bold text-center text-[#79b9b9] p-2 mt-4 text-[27px]">Balance</h2>
  <div class="grid gap-4 grid-cols-2 m-3 flex">
      <div>
          <h3 class="flex mb-5 mt-3 text-[22px]">Ganancias</h3>
      </div>
      <div>
          <h3 id="gananciasBalance" class="font-bold text-green-700 ml-4 mt-3 text-[22px]">+${gainBalance}</h3>
      </div>
      <div>
          <h3 id="gastosBalance" class="flex mb-5 text-[22px]">Gastos</h3>
      </div>
      <div class="font-bold text-red-700 ml-4 text-[22px]">
          <p>-${spendingBalance}</p>
      </div>
      <div>
          <h1 class="font-bold text-[25px]">Total</h1>
      </div> 
      <div id="balance-total" class="font-bold text-[25px] ml-4">$${balanceTotal}</div> 

	`;

}
generateTableBalance();

btnAddOperation.addEventListener("click", () => {
  generateTableBalance()
})

//ERROR? -->
// btnEdit.addEventListener("click", () => {
//   generateTableBalance()
// })

// FILTERS
const filterOperationsType = (array, type) => {
  const operations = array.filter((curr) => {
    return curr.type === type;
  })
  return operations;
}

const applyFilters = () => {
  const type = $('#type-filter').value;
  const filterForType = getDataFromLocalStorage('operations').filter(
    (operation) => {
      if (type === "todos") {
        return operation
      }
      return operation.operationType === type
    }
  )
  const category = $('#filter-categories').value

  const finalFilter = filterForType.filter((operation) => {
    if (category === "todos") {
      return operation
    }
    return operation.selectCategoryOperation === category
  })

  return finalFilter
}


//FILTER FOR TYPE
$('#type-filter').onchange = () => {
  const arrayFilterType = applyFilters()
  generateOperationTable(arrayFilterType)
}

//FILTER FOR CATEGORY
$('#filter-categories').onchange = () => {
  const arrayFilterFinal = applyFilters()
  generateOperationTable(arrayFilterFinal)
}

// DATES
const orderDates = (arr) => {
  const orderedDates = arr.sort((a, b) => {
    return new Date(b.dateOperation) - new Date(a.dateOperation)
  })

  const finalDate = orderedDates.map((operation) => {
    new Date(operation.dateOperation).toLocaleDateString();
    return operation
  })
  return finalDate
}

const newDates = (operations) => {
  const selectedDates = [];
  for (let i = 0; i < operations.length; i++) {
    if (new Date($('#date-filter').value) <= new Date(operations[i].dateOperation)) {
      selectedDates.push(operations[i]);
    }
  }
  return selectedDates
}

//FILTER FOR DATE
$('#date-filter').onchange = () => {
  const filterDates = newDates(getDataFromLocalStorage('operations'))
  generateOperationTable(orderDates(filterDates))
}

//ADD CATEGORY SELECT

const categorySelect = (inputID) =>{
  let categories = getDataFromLocalStorage("categories")
  inputID.innerHTML = ''
  for (const category of categories){
     const {id, nombre} = category 
     inputID.innerHTML += `<option value="${nombre}">${nombre}</option>`
  }
}

window.addEventListener("load", () =>{
  categorySelect($("#filter-categories"))
  const option = document.createElement("option")
  const value = document.createTextNode ("Todas")
  option.appendChild(value)

  $("#filter-categories").append(option)
})

window.addEventListener("load", () =>{
  categorySelect($("#selectCategoryOperation"))
  const option = document.createElement("option")
  const value = document.createTextNode ("Todas")
  option.appendChild(value)

  $("#selectCategoryOperation").append(option)
})