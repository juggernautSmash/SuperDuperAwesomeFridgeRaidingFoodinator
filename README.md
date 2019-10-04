# SuperDuperAwesomeFridgeRaidingFoodinator
Project #1  for Bootcamp Spot. This is an app that fetches recipes based on user input ingredients.

[JC][9/28/2019]
    -  Updated index.html
        -- updated firebase config to use the team's
        -- updated the title of the DOM
        -- added google fonts CDN
    - changed refrigerator photo
    - moved refrigerator photo to /assets/images
    - moved recipeCss.css to /assets/css
    - added fetchRecipes.js in /assets/js
        -- this is handles adding ingredients to the DOM with checkboxes
        -- fetch recipes based on checked ingredients
        -- generated recipe cards based on the DOM based on fetched recipes.
    - added foodProfile.html
        -- sample page for inputting ingredients
        -- sample page for fetching recipes
        -- sample page for generating recipe cards based on selected ingredients

[JC][10/3/2019]
    - style.css
        -- added style for elements not handled by materialize and also to some override materialize elements

    - foodProfile
        -- organized the divs to only have one div with class container
        -- updated the text colors in the nav bar
        -- added an organizer for the search results
        -- added sweet alert to handle null inputs 
    
    - fetchRecipes.js
        -- update generateRecipeCard to include missedIngredient count to organize recipe results
        -- added data-* to the recipe card for saving the recipes
        -- added feature to save recipes
        -- added swal to handle null inputs
        -- added feature to reset the search results field when a new search is conducted
    
    - added tabs.js to handle the tabs in the search results.