const APP_ID = "c0acbeb2"
const API_KEY = "6188f36dd1d048b43a7958638f217770"
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

    console.log(ingredients)

    fetchRecipes(ingredients)
});

function fetchRecipes(ingredients) {
    //learned that you use backticks and not single quotes('') for implementing imbeded variables.
    const url = `https://api.edamam.com/search?q=${encodeURIComponent(ingredients)}&app_id=${APP_ID}&app_key=${API_KEY}`;

    //I also learned how to use the axios API to call apis. Hopefully I will keep using this, becasue it seems much simpler than fetch()
    axios.get(url)
        .then(response => {
            console.log(response.data);
            displayRecipes(response.data.hits)
        })
        //this is a catch error function for any error that happens with the axios api
        .catch(error => {
            console.error('There was a problem with the axios request:', error);
        });
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.innerHTML =`
            <h2>${recipe.recipe.label}</h2>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}"/>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        `;

        recipeList.appendChild(recipeItem);
    });
}
