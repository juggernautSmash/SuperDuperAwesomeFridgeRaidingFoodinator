console.log('profile.js is linked')
let email = localStorage.getItem('email')

const generateMyRecipeCard = ({id, title, img, url}) => {//Generate recipe card on the DOM based on selected FETCH 
    //console.log(`running generateRecipeCard`)
    let recipeCard = document.createElement('div')
    recipeCard.id = id
    recipeCard.className = 'card'
    recipeCard.innerHTML = `
        <div class='card-image'>
            <a href='${url}' target='_blank'>
            <img class='card-image' src='${img}'>
            <div class='card-title blue-grey darken-4'>
                <span class='recipe-title'>${title}</span>
            </div>
            </a>
        </div>
    `
    document.getElementById('myRecipes').append(recipeCard)
}// end generateMyRecipeCard

const addIngredientToDOM = ingredient => {//Creates an entry under ingredients with checkbox
    let foodDiv = document.createElement('li')
    foodDiv.id = ingredient
    foodDiv.innerHTML = `
        <div class="chip">
            ${ingredient}
            <i data-food='${ingredient}' class="close material-icons">close</i>
        </div>
    `
    document.getElementById('ingredientsList').append(foodDiv)
} //end addIngredientToDOM

const getProfile = () => {
    // email = localStorage.getItem('email')

    usersDb.doc(email).get()
    .then(data => {

        //Update Personal Info card
        document.getElementById('name').textContent = data.data().displayName
        document.getElementById('email').textContent = data.data().email

        //Update My Ingredients
        // console.log('food is...')
        // console.log(typeof(data.data().myFood))
        // console.log(data.data().myFood)
        data.data().myFood.forEach(food => {
            addIngredientToDOM(food)
        })
        //document.getElementById('ingredientsList').textContent = data.data().myFood

        //Update My Recipes
        data.data().myRecipe.forEach( recipe => {
            generateMyRecipeCard(recipe)
        })
    })
    .catch( e => {
        console.log('an error has occured')
        console.log(e)
    }) 
} // end getProfile

const addToLocalStorage = (key, value) =>{
    if(localStorage.getItem(key) === null){
        console.log(`${key} does not exist`)
    } else {
        console.log(`key is ${key}`)   
        let keyValue = JSON.parse(localStorage.getItem(key))
        keyValue.push(value)
        localStorage.setItem(key,JSON.stringify(keyValue))
    }
}

const removeFromLocalStorage = (key, value) => {
    if(localStorage.getItem(key) === null){
        console.log(`${key} does not exist`)
    } else {
        console.log(`key is ${key}`)   
        let keyValue = JSON.parse(localStorage.getItem(key)) //
        keyValue.splice(keyValue.indexOf(value), 1)
        localStorage.setItem(key,JSON.stringify(keyValue))
    }
}

document.getElementById('addItem').addEventListener('click', e => {// Add button action
    e.preventDefault()

    //take value in the text field
    let ingredient = document.getElementById('foodItem').value

    // add food ingredient to the DOM
    addIngredientToDOM(ingredient)
    // add food ingredient to firestore
    usersDb.doc(email).update({
        myFood: firebase.firestore.FieldValue.arrayUnion(ingredient)
    })

    addToLocalStorage('myFood', ingredient)

    // Clear the text field
    document.getElementById('foodItem').value = ''

})//end ADD button action

document.addEventListener('click', ({target}) => {
    if(target.className === 'close material-icons'){
        console.log(`X was pressed with dataset ${target.dataset.food}`)
        // Remove from firestore
        usersDb.doc(email).update({
            myFood: firebase.firestore.FieldValue.arrayRemove(target.dataset.food)
        })
        // Remove from localStorage
        removeFromLocalStorage('myFood', target.dataset.food )
    }
})

getProfile()