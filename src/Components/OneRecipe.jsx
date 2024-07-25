import '../Styles/OneRecipe.css'
export default function OneRecipe({ data }) {

    function getIngredientsList(data) {
        const ingredients = [];

        for (let i = 1; i <= 30; i++) { // Assuming a maximum of 30 ingredients
            const ingredient = data[`strIngredient${i}`];
            const measure = data[`strMeasure${i}`];

            if (ingredient && measure) {
                ingredients.push(`${measure} ${ingredient}`);
            } else {
                break; // Stop when there are no more ingredients
            }
        }

        return ingredients;
    }

    const category = data.strCategory;
    const cuisine = data.strArea;
    const thumbnail = data.strMealThumb;
    const recipeVideo = data.strYoutube;
    const ingredients = getIngredientsList(data);
    const instructions = data.strInstructions;

    return (
        <>
            <div className="oneContainer">
                <h2>"{data.strMeal}"</h2>
                <div className='intro'>
                    <div>
                        <img src={thumbnail} alt={data.strMeal} />
                    </div>
                    <div>
                        <p>CateGory : {category}</p>
                        <p>Cuisine : {cuisine}</p>
                        <p>Recipe Video : <a src={recipeVideo}>Watch Here</a></p>
                        <h3>Ingredients:</h3>
                        <ul>
                            {ingredients.map((i) => <li>{i}</li>)}
                        </ul>
                    </div>
                </div>
                <h3>Instructions:</h3>
                <p>{instructions}</p>

            </div>
        </>
    )
}