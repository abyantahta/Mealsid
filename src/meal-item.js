class MealItem extends HTMLElement {
    set meal(meal) {
        this._meal = meal;
        this.render();
    }
    render() {
        this.innerHTML = `            
        <div class="img">
            <img src=${this._meal.strMealThumb} alt="">
        </div>
        <h3>${this._meal.strMeal}</h3>`
    }
}

customElements.define('meal-item', MealItem);