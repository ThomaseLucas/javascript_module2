const recipe_app_id = Config.RECIPE_APP_ID;
const recipe_api_key = Config.RECIPE_API_KEY;

const recipeList = document.getElementById("recipe-list");
//implementing the button and input from the user as variables.
function testSetup() {
    console.log("API setup compelte")
}

testSetup();

const button = document.getElementById('button_go')
const ingredientsInput = document.getElementById('ingredients')

//make an event listener for when the button is clicked.
button.addEventListener('click', function() {
    const ingredients = ingredientsInput.value;

    if (!ingredients) {
        alert("Please enter some ingredients!");
    }

    console.log(ingredients)

    fetchRecipes(ingredients)
});

function fetchRecipes(ingredients) {
    //learned that you use backticks and not single quotes('') for implementing imbeded variables.
    const url = `https://api.edamam.com/search?q=${encodeURIComponent(ingredients)}&app_id=${recipe_app_id}&app_key=${recipe_api_key}&to=20`;

    const loadingIndicator = document.createElement('div');
    loadingIndicator.innerText = "Loading recipes...";
    recipeList.appendChild(loadingIndicator)


    //I also learned how to use the axios API to call apis. Hopefully I will keep using this, becasue it seems much simpler than fetch()
    axios.get(url)
        .then(response => {
            
            loadingIndicator.remove();
            console.log(response.data);
            displayRecipes(response.data.hits)
        })  
        //this is a catch error function for any error that happens with the axios api
        .catch(error => {
            loadingIndicator.remove();
            console.error('There was a problem with the axios request:', error);
        });
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = '';

    if (recipes.length === 0) {
        const noResults = document.createElement('div');

        noResults.innerText = "No recipes found. Please try different ingredients.";

        recipeList.appendChild(noResults);
        return; // Exit the function
    }

    const recipeCount = document.createElement('div');
    recipeCount.innerText = `${recipes.length} recipe(s) found.`;
    recipeList.appendChild(recipeCount);

    recipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.className = "recipe-item";

        recipeItem.innerHTML = `
            <h2>${recipe.recipe.label}</h2>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}" class="recipe-image" />
            <div class="tooltip">
                <h3>Nutritional Information:</h3>
                <p>Calories: ${Math.round(recipe.recipe.calories)}</p>
                <p>Protein: ${Math.round(recipe.recipe.totalNutrients.PROCNT.quantity)}g</p>
                <p>Fat: ${Math.round(recipe.recipe.totalNutrients.FAT.quantity)}g</p>
                <p>Carbohydrates: ${Math.round(recipe.recipe.totalNutrients.CHOCDF.quantity)}g</p>
            </div>
        `;

        const recipeImage = recipeItem.querySelector('.recipe-image');
        const tooltip = recipeItem.querySelector('.tooltip');

        // Show tooltip on mouse enter
        recipeImage.addEventListener('mouseenter', () => {
            tooltip.style.display = 'block'; // Show the tooltip
        });

        // Hide tooltip on mouse leave
        recipeImage.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none'; // Hide the tooltip
        });

        recipeList.appendChild(recipeItem);
    });
}
