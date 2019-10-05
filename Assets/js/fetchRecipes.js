let userIngredients = []
let apiKey = '1627e18e0caa4fd4890ad8754a8f6ed8'

const addIngredientToDOM = ingredient => {//Creates an entry under ingredients with checkbox
  let foodDiv = document.createElement('div')
  foodDiv.id = ingredient
  foodDiv.innerHTML = `
        <p>
            <label>
                <input class="with-gap" name="ingredient" type="checkbox" value='${ingredient}'/>
                <span>${ingredient}</span>
            </label>
        </p>
    `
  document.getElementById('ingredientsList').append(foodDiv)
}//end addIngredientToDOM

  const retrieveIngredientsFromLocal = () => {
    let ingredients = JSON.parse(localStorage.getItem('myFood'))
    ingredients.forEach(ingredient => {
      addIngredientToDOM(ingredient)
    })
  }


const generateRecipeCard = ({ id, title, image }) => {//Generate recipe card on the DOM based on selected FETCH 
  //console.log(`running generateRecipeCard`)

  fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
    .then(r => r.json())
    .then(recipe => {
      //console.log(`recipe URL is ${recipe.sourceUrl}`)
      //recipeUrl = recipe.sourceUrl
      let recipeCard = document.createElement('div')
      recipeCard.id = id
      recipeCard.className = 'card'
      recipeCard.innerHTML = `
                <div class='card-content'>
                    <a href='${recipe.sourceUrl}'>
                    <img src='${image}'
                    <span class='card-title'>${title}</span>
                    </a>
                </div>
            `

      document.getElementById('fetchResults').append(recipeCard)
    })//end then
    .catch(err => {
      console.log(`something went wrong getting the recipe`)
    })//end catch
}// end generateRecipeCard

document.getElementById('addItem').addEventListener('click', e => {// Add button action
  e.preventDefault()

  //take value in the text field
  let ingredient = document.getElementById('foodItem').value

  //console.log(ingredient)
  userIngredients.push(ingredient)
  addIngredientToDOM(ingredient)

  document.getElementById('foodItem').value = ''
})//end ADD button action

document.getElementById('fetchRecipes').addEventListener('click', e => {//FETCH button action
  console.log('Fetch Button is pressed')
  let ingredients = document.getElementsByName('ingredient')
  //console.log(ingredients)
  let selectedIngredients = [] //store all the checked ingredients here

  //check for which boxes are checked
  for (let i = 0; i < ingredients.length; i++) {
    ingredients[i].checked ? selectedIngredients.push(ingredients[i].value) : null
  }

  fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${selectedIngredients.toString()}&number=10`)
    .then(r => r.json())//grab the recipes
    .then(recipes => { //convert data to something readable
      //console.log(e)
      recipes.forEach(recipe => {//grab each recipe in from the data
        // console.log(recipe.title)
        generateRecipeCard(recipe)
      });
    })//end .then
    .catch(err => {
      console.log(`Error found`)
      console.log(err)
    })//end catch
})// end FETCH button action

retrieveIngredientsFromLocal()

