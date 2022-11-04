const $ = (selector) => document.querySelector(selector);
const $$ = (selectors) => document.querySelectorAll(selectors);

const $btnAdd = $("#btn-add");
const $categories = $("#container-categories");
const $newCategories = $("#categorie");
const $tableCategories = $("#table-categories");

let categories = [
    {
        id: 1,
        nombre: "Comida",
    },

    {
        id: 2,
        nombre: "Servicios",
    },

    {
        id: 3,
        nombre: "Salidas",
    },

    {
        id: 4,
        nombre: "Educacion",
    },

    {
        id: 5,
        nombre: "Trabajo",
    },
];

if (!localStorage.getItem('categories')) {
    localStorage.setItem('categories', JSON.stringify(categories))
}
const btnEdit = $$(".btn-edit")
const btnDelete = $$(".btn-delete")

// *******************************************************GENERATE TABLE & REMOVE*********************************
const generateTable = (categories) => {
    for (const category of categories) {
        table.innerHTML += `
    <tr class="w-[20%] h-10 mb-5 categoryColumn"  >
                        <th class="w-[80%] text-start mb-3">${category.id, category.nombre}</th>
                        <th scope="col"><button class= "mr-3 btn-edit text-green-500" data-id="${category.id}" onclick="categorieEdit(${category.id})">Editar</button></th>
                        <th scope="col"> <button class= "btnRemove text-red-500" data-id="${category.id}">Eliminar</button></th>
            </tr>
               `
    }

    const btnRemove = $$(".btnRemove")
    for (const btn of btnRemove) {
        const categoryId = btn.getAttribute("data-id")
        btn.addEventListener("click", () => {
            deleteCategory(categoryId)
        });

    }

};

generateTable(categories);


// *******************************************************************************************************************************

const categoryInfo = () => {
    
    const nombre = $("#addCategory").value;
    let id = categories.length + 1

    return {
        id,
        nombre
    };
};

const generateNewCategory = () => {
    table.innerHTML = ''
    categories.push(categoryInfo());
    $("#addCategory").value = ""
    localStorage.setItem('categories', JSON.stringify(categories))
    generateTable(JSON.parse(localStorage.getItem('categories')))
   
}

$btnAdd.addEventListener("click", generateNewCategory)

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

// ************************EDIT & CANCEL****************************************************************************

const categorieEdit = (id) => {
    const nombre = $("#addCategory").value;
    $("#container-categories").classList.add("hidden");
    $("#container-edit-categories").classList.remove("hidden");
    const selectCategory = findCategory(id);
    $("#editCategory").value = `  ${selectCategory.nombre}`;
    $("#btn-editForm").setAttribute("data-id", id);
    $("#btn-cancel").setAttribute("data-id", id);
    $$(".btn-edit").setAttribute("data-id", id)
    $$(".btn-delete").setAttribute("data-id", id)

};

const saveCategoryData = (id) => {
    return {
        id,
        nombre: $("#editCategory").value,
    };

};

const editCategory = (id) => {
    return categories.map((category) => {
        if (category.id === parseInt(id)) {
            return saveCategoryData(id);
        };
    
        return category

        
    });
};

$("#btn-editForm").addEventListener("click", () => {
    const categoryId = $("#btn-editForm").getAttribute("data-id");
    $("#container-edit-categories").classList.add("hidden")
    $("#container-categories").classList.remove("hidden");
    $("#table").innerHTML = ''
    
    generateTable(editCategory(categoryId))
  

}  )


$("#btn-cancel").addEventListener("click", () => {
    $("#container-edit-categories").classList.add("hidden");
    $("#container-categories").classList.remove("hidden");

})
