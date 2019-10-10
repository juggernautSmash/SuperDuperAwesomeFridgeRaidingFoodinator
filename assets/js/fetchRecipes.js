console.log('fetchRecipes.js is linked')
let email = localStorage.getItem('email')

let userIngredients = []
let selectedIngredients = []
let apiKey = '1627e18e0caa4fd4890ad8754a8f6ed8'
let savedRecipes = []

const addIngredientToDOM = ingredient => {//Creates an entry under ingredients with checkbox
    let foodDiv = document.createElement('li')
    foodDiv.id = ingredient
    foodDiv.innerHTML = `
        <div class="chip">
            <label>
                <input class="with-gap" name="ingredient" type="checkbox" value='${ingredient}'/>
                <span>${ingredient}</span>
                <i data-food='${ingredient}' class="close material-icons">close</i>
            </label>
        </div>
    `
    document.getElementById('ingredientsList').append(foodDiv)
}//end addIngredientToDOM

const generateRecipeCard = ({ id, title, image }) => {//Generate recipe card on the DOM based on selected FETCH 
    console.log(`running generateRecipeCard`)
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
        .then(r => r.json())
        .then(recipe => {

            //Generate recipeCard in the ALL tab
            let recipeCard = document.createElement('div')
            recipeCard.id = id
            recipeCard.className = 'row'
            recipeCard.innerHTML = `
                <div class="col s12 m6">
                    <div class="card">
                        <div class="card-image">
                            <a href='${recipe.sourceUrl}' target='_blank'>
                                <img src="${image}">
                            </a>
                            <a class="btn-floating halfway-fab waves-effect waves-light red">
                                <i class="save material-icons" 
                                    data-title='${title}' 
                                    data-id='${id}' 
                                    data-img='${image}' 
                                    data-url='${recipe.sourceUrl}' 
                                    data-saved='false'>add</i>
                            </a>
                        </div>
                        <div class="card-content blue-grey darken-4">
                            <a href='${recipe.sourceUrl}' target='_blank'>
                                <p class="recipe-title">${title}</p>
                            </a>
                        </div>
                    </div>
                </div>
            `
            console.log('generate recipe card in all recipe')
            document.getElementById('allRecipes').append(recipeCard)

            //Generate recipeCard in the Some Groceries tab
        })//end .then
        .catch(err => {
            console.log(`something went wrong getting the recipe`)
            console.log(err)
        })//end catch
} // end generateRecipeCard

const getFood = () => {
    let foods = JSON.parse(localStorage.getItem('myFood'))

    foods.forEach( food => {
        addIngredientToDOM(food)
    })
} //end getFood

const addToLocalStorage = (key, value) =>{
    if(localStorage.getItem(key) === null){
        console.log(`${key} does not exist`)
    } else {
        //Get the value in localStorage   
        let keyValue = JSON.parse(localStorage.getItem(key))

        switch (key){
            case 'myFood':
                console.log(`running case myFood`)
                console.log(`check is ${keyValue.findIndex( food => food === value) < 0}`)
                if(keyValue.findIndex( food => food === value) < 0){
                    console.log(`adding to localStorage myFoods`)
                    keyValue.push(value)
                    localStorage.setItem(key,JSON.stringify(keyValue))
                } else {
                    console.log(`${value} is already in localStorage`)
                }
                break;
            case 'myRecipes':
                console.log('running case myRecipes')
                console.log(`check is ${keyValue.findIndex( recipe => recipe.id === value.id)}`)
                if(keyValue.findIndex( recipe => recipe.id === value.id) < 0){
                    console.log(`adding to localStorage myRecipes`)
                    keyValue.push(value)
                    localStorage.setItem(key,JSON.stringify(keyValue))
                } else {
                    console.log(`${value} is already in localStorage`)
                }
                break;
            default:
                console.log(`${key} is unhandled`)
        }// end switch 
    } // end else
}//end addToLocalStorage

const removeFromLocalStorage = (key, value) => {
    console.log(`running removeFromLocalStorage`)
    switch (key){
        case 'myFood':
            let keyValue = JSON.parse(localStorage.getItem(key)) //
            keyValue.splice(keyValue.indexOf(value), 1)
            localStorage.setItem(key,JSON.stringify(keyValue))
            usersDb.doc(email).update({
                myFood: firebase.firestore.FieldValue.arrayRemove(value)
            }) 
            break;
        case 'myRecipes':
            let storedRecipes = JSON.parse(localStorage.getItem('myRecipes'))
            let myRecipeIndex = storedRecipes.findIndex( recipe => recipe.id === value)  
            storedRecipes.splice(myRecipeIndex,1)
            localStorage.setItem('myRecipes', JSON.stringify(storedRecipes))
            usersDb.doc(email).update({
                'myRecipes': storedRecipes
            })
        default:
            console.log(`The key is ${key}`)
    }
} 

document.getElementById('addItem').addEventListener('click', e => { // Add button action
    e.preventDefault()

    //take value in the text field
    let ingredient = document.getElementById('foodItem').value
    
    //handler if no ingredients text
    if(ingredient === ''){
        swal("Please input an ingredient")
    } else if(JSON.parse(localStorage.getItem('myFood')).indexOf(ingredient) >= 0 ){
        swal(`${ingredient} is already in your list`)
    } else{
        userIngredients.push(ingredient)
        addIngredientToDOM(ingredient)
    }
    //console.log(ingredient)

    document.getElementById('foodItem').value = ''
})//end ADD button action

document.getElementById('fetchRecipes').addEventListener('click', e => {//FETCH button action
    console.log('Fetch Button is pressed')
    // Clear the results div
    document.getElementById('allRecipes').innerHTML = ''

    let ingredients = document.getElementsByName('ingredient')
    
    //console.log(ingredients)
    let selectedIngredients = [] //store all the checked ingredients here

    //check for which boxes are checked
    for(let i = 0; i < ingredients.length; i++){
        ingredients[i].checked ? selectedIngredients.push(ingredients[i].value) : null
    }

    // Handler if no checked ingredients
    if(selectedIngredients.length === 0){
        swal('Please select ingredients to search recipes')
    } else {
        fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${selectedIngredients.toString()}&number=10`)
        .then(r => r.json())//grab the recipes
        .then( recipes => { //convert data to something readable
            recipes.forEach(recipe => {//grab each recipe in from the data
                generateRecipeCard(recipe)
            })
        })//end .then
        .catch(err => {
            console.log(`Error found`)
            console.log(err)
        })//end catch
    }
})// end FETCH button action

document.addEventListener('click', ({target}) => {
    switch (target.className){
        case 'save material-icons':
            console.log('save recipe button pressed')
            console.log(`Is the recipe saved? ${target.dataset.saved}`)
            if( target.dataset.saved === 'false' ){
                let saveRecipe = {
                    id: target.dataset.id,
                    title: target.dataset.title,
                    img: target.dataset.img,
                    url: target.dataset.url
                }
                savedRecipes.push(saveRecipe)
                target.dataset.saved = 'true'
    
                usersDb.doc(email).update({
                    myRecipes: firebase.firestore.FieldValue.arrayUnion(saveRecipe)
                }) 
                console.log(`recipe is saved`)
            } // end if
            else {
                console.log(`recipe is already saved`)
            } // end else
            break;
        case 'close material-icons':
            // Remove from localStorage
            removeFromLocalStorage('myFood', target.dataset.food )
            break;
    }

})// end addEventListener

getFood()
