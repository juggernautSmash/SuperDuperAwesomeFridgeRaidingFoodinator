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
        <label>
            <input class="with-gap" name="ingredient" type="checkbox" value='${ingredient}'/>
            <span>${ingredient}</span>
        </label>
    `
    document.getElementById('ingredientsList').append(foodDiv)
}//end addIngredientToDOM

const generateRecipeCard = ({ id, title, image, missedIngredientCount}) => {//Generate recipe card on the DOM based on selected FETCH 
    //console.log(`running generateRecipeCard`)

    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
        .then(r => r.json())
        .then(recipe => {

            //Generate recipeCard in the ALL tab
            let recipeCard = document.createElement('div')
            recipeCard.id = id
            recipeCard.className = 'col s6 card'
            recipeCard.innerHTML = `
                <div class='col s6 card-image'>
                    <button class='saveRecipe btn-floating btn-large waves-effect waves-red blue-grey darken'>
                        <i class='save material-icons' 
                            data-title='${title}' 
                            data-id='${id}' 
                            data-img='${image}' 
                            data-url='${recipe.sourceUrl}' 
                            data-saved='false'>add</i>
                    </button>
                    <a href='${recipe.sourceUrl}' target='_blank'>
                    <img class='card-image' src='${image}'>
                    <div class='card-title blue-grey darken-4'>
                        <span class='recipe-title'>${title}</span>
                    </div>
                    </a>
                </div>
            `
            console.log('generate recipe card in all recipe')
            document.getElementById('allRecipes').append(recipeCard)

            //Generate recipeCard in the Some Groceries tab
            if(missedIngredientCount > 0){
                let makeLaterCard = document.createElement('div')
                makeLaterCard.id = id
                makeLaterCard.className = 'col s6 card'
                makeLaterCard.innerHTML = `
                    <div class='col s6 card-image'>
                        <button class='saveRecipe btn-floating btn-large waves-effect waves-red blue-grey darken'>
                            <i class='save material-icons' 
                                data-title='${title}' 
                                data-id='${id}' 
                                data-img='${image}' 
                                data-url='${recipe.sourceUrl}' 
                                data-saved='false'>add</i>
                        </button>
                        <a href='${recipe.sourceUrl}' target='_blank'>
                        <img class='card-image' src='${image}'>
                        <div class='card-title blue-grey darken-4'>
                            <span class='recipe-title'>${title}</span>
                        </div>
                        </a>
                    </div>
                `
                console.log(`missedIngredientCount is ${missedIngredientCount}`)
                console.log('generating recipeCard in makeLater')
                document.getElementById('makeLater').append(makeLaterCard)
            } else { // Generate recipeCard to Make Now tab
                let makeNowCard = document.createElement('div')
                makeNowCard.id = id
                makeNowCard.className = 'col s6 card'
                makeNowCard.innerHTML = `
                    <div class='col s6 card-image'>
                        <button class='saveRecipe btn-floating btn-large waves-effect waves-red blue-grey darken'>
                            <i class='save material-icons' 
                                data-title='${title}' 
                                data-id='${id}' 
                                data-img='${image}' 
                                data-url='${recipe.sourceUrl}'
                                data-saved='false'>add</i>
                        </button>
                        <a href='${recipe.sourceUrl}' target='_blank'>
                        <img class='card-image' src='${image}'>
                        <div class='card-title blue-grey darken-4'>
                            <span class='recipe-title'>${title}</span>
                        </div>
                        </a>
                    </div>
                `
                console.log(`missedIngredientCount is ${missedIngredientCount}`)
                console.log('generating recipeCard in makeNow')
                document.getElementById('makeNow').append(makeNowCard)               
            }
            // document.getElementById('makeLater').append(recipeCard)
        })//end then
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
    console.log(`running addToLocalStorage`)
    if(localStorage.getItem(key) === null){
        console.log(`${key} does not exist`)
    } else {
        console.log(`key is ${key}`)
        //Get the value in localStorage   
        let keyValue = JSON.parse(localStorage.getItem(key))
        //Push the new value in the data retrieved from localStroge
        keyValue.push(value)
        //Push the updated value to localStorage
        localStorage.setItem(key,JSON.stringify(keyValue))
    }
} //end addToLocalStorage

const removeFromLocalStorage = (key, value) => {
    console.log(`running removeFromLocalStorage`)
    if(localStorage.getItem(key) === null){
        console.log(`${key} does not exist`)
    } else {
        console.log(`key is ${key}`)   
        let keyValue = JSON.parse(localStorage.getItem(key)) //
        keyValue.splice(keyValue.indexOf(value), 1)
        localStorage.setItem(key,JSON.stringify(keyValue))
    }
} //end removeFromLocalStorage

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
    document.getElementById('makeNow').innerHTML = ''
    document.getElementById('makeLater').innerHTML = ''

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
            //console.log(e)
            recipes.forEach(recipe => {//grab each recipe in from the data
                // console.log(recipe.title)
                // console.log(recipe.missedIngredientCount)
                generateRecipeCard(recipe)
                // recipe.missedIngredientCount === 0 ? yesMake.push(recipe.id) : notMake.push(recipe.id)
            })
        })//end .then
        .catch(err => {
            console.log(`Error found`)
            console.log(err)
        })//end catch
    }
})// end FETCH button action

document.addEventListener('click', ({target:recipe}) => {
    if(recipe.className === 'save material-icons'){
        console.log('save recipe button pressed')
        console.log(`Is the recipe saved? ${recipe.dataset.saved}`)
        if( recipe.dataset.saved === 'false' ){
            let saveRecipe = {
                id: recipe.dataset.id,
                title: recipe.dataset.title,
                img: recipe.dataset.img,
                url: recipe.dataset.url
            }
            savedRecipes.push(saveRecipe)
            recipe.dataset.saved = 'true'

            usersDb.doc(email).update({
                myRecipes: firebase.firestore.FieldValue.arrayUnion(saveRecipe)
            }) 

            console.log(`recipe is saved`)
        }// end if
    }// end if
})// end addEventListener

getFood()