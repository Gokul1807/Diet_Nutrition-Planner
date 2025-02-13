document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('diet-form').addEventListener('submit', function(event) {
        event.preventDefault();
        let dietType = document.getElementById('diet-type').value;
        let goal = document.getElementById('goal').value;

        let mealPlan = generateMealPlan(dietType, goal);
        document.getElementById('meal-results').innerHTML = mealPlan;
    });

    document.getElementById('analyze-food').addEventListener('click', function() {
        let foodOutput = document.getElementById('food-output');
        foodOutput.innerHTML = 'Analyzing food...';

        let dietType = document.getElementById('diet-type').value;
        let goal = document.getElementById('goal').value;

        let mealPlan = generateMealPlan(dietType, goal);
        let selectedMeals = mealPlan.match(/<li>(.*?)<\/li>/g).map(meal => {
            const parts = meal.replace(/<\/?li>/g, '').split(":");
            return parts[0].trim();
        });

        let foodAnalysis = selectedMeals.map(meal => {
            return `<p>${meal}: Estimated Calories: ${getCalories(meal)}</p>`;
        }).join('');

        foodOutput.innerHTML = foodAnalysis;
    });

    document.getElementById('track-calories').addEventListener('click', function() {
        let calorieLog = document.getElementById('calorie-log');
        calorieLog.innerHTML = 'Tracking calories...';

        let dietType = document.getElementById('diet-type').value;
        let goal = document.getElementById('goal').value;

        let mealPlan = generateMealPlan(dietType, goal);
        let selectedMeals = mealPlan.match(/<li>(.*?)<\/li>/g).map(meal => meal.replace(/<\/?li>/g, ''));

        let totalCalories = selectedMeals.reduce((total, meal) => total + getCalories(meal), 0);

        calorieLog.innerHTML = `Total Calories for selected meals: ${totalCalories}`;
    });

    document.getElementById('suggest-exercise').addEventListener('click', function() {
        let exercisePlan = document.getElementById('exercise-plan');
        exercisePlan.innerHTML = 'Suggesting exercises...';

        let goal = document.getElementById('goal').value;

        let exercises = getExercisePlan(goal);

        exercisePlan.innerHTML = `<ul>${exercises.map(exercise => `<li>${exercise}</li>`).join('')}</ul>`;
    });
});

function generateMealPlan(dietType, goal) {
    let meals = {
        vegan: {
            weight_loss: [
                { name: 'Poha with Peanuts', description: 'Light and filling, good source of carbohydrates and protein.' },
                { name: 'Dal Khichdi', description: 'A balanced meal with protein, fiber, and carbohydrates.' },
                { name: 'Vegetable Sabzi with Roti', description: 'Provides essential vitamins and minerals from vegetables.' }
            ],
            muscle_gain: [
                { name: 'Peanut Chutney with Idli', description: 'Rich in protein and healthy fats.' },
                { name: 'Rajma Chawal', description: 'Excellent source of protein and complex carbohydrates.' },
                { name: 'Soya Chunk Curry', description: 'High in protein and fiber.' }
            ],
            maintenance: [
                { name: 'Fruit Chaat', description: 'Provides vitamins and antioxidants.' },
                { name: 'Vegetable Pulao', description: 'A flavorful and nutritious meal.' },
                { name: 'Sprouts Salad', description: 'Rich in vitamins, minerals, and fiber.' }
            ]
        },
        vegetarian: {
            weight_loss: [
                { name: 'Ragi Dosa with Chutney', description: 'Rich in fiber and calcium.' },
                { name: 'Lauki Soup', description: 'Low in calories and hydrating.' },
                { name: 'Grilled Paneer with Salad', description: 'High in protein and low in carbohydrates.' }
            ],
            muscle_gain: [
                { name: 'Egg Bhurji with Roti', description: 'Excellent source of protein.' },
                { name: 'Paneer Butter Masala', description: 'Rich in protein and calcium (moderate calories).' },
                { name: 'Dal & Jeera Rice', description: 'Provides protein and carbohydrates.' }
            ],
            maintenance: [
                { name: 'Mixed Fruit Smoothie', description: 'Provides vitamins and antioxidants.' },
                { name: 'Masala Dosa', description: 'A balanced meal with carbohydrates and protein.' },
                { name: 'Curd Rice', description: 'Cooling and easy to digest.' }
            ]
        },
        keto: {
            weight_loss: [
                { name: 'Paneer Bhurji', description: 'High in protein and low in carbohydrates.' },
                { name: 'Avocado & Cucumber Salad', description: 'Rich in healthy fats and fiber.' },
                { name: 'Grilled Chicken with Ghee', description: 'High in protein and healthy fats.' }
            ],
            muscle_gain: [
                { name: 'Egg Bhurji with Butter', description: 'High in protein and healthy fats.' },
                { name: 'Mutton Soup', description: 'Rich in protein and nutrients.' },
                { name: 'Cheese & Almonds', description: 'High in protein and healthy fats.' }
            ],
            maintenance: [
                { name: 'Keto Smoothie', description: 'Provides healthy fats and nutrients.' },
                { name: 'Tandoori Chicken', description: 'High in protein and low in carbohydrates.' },
                { name: 'Stuffed Capsicum', description: 'A flavorful and low-carb meal.' }
            ]
        },
        balanced: {
            weight_loss: [
                { name: 'Moong Dal Chilla', description: 'High in protein and fiber.' },
                { name: 'Grilled Fish with Veggies', description: 'Excellent source of protein and omega-3 fatty acids.' },
                { name: 'Palak Dal with Brown Rice', description: 'Provides iron, fiber, and complex carbohydrates.' }
            ],
            muscle_gain: [
                { name: 'Banana & Peanut Butter Shake', description: 'Provides protein, carbohydrates, and healthy fats.' },
                { name: 'Chicken Biryani', description: 'A complete meal with protein, carbohydrates, and spices.' },
                { name: 'Chapati with Paneer Sabzi', description: 'Provides protein, carbohydrates, and fiber.' }
            ],
            maintenance: [
                { name: 'Daliya (Broken Wheat) Porridge', description: 'Rich in fiber and nutrients.' },
                { name: 'Vegetable Upma', description: 'A light and nutritious meal.' },
                { name: 'Dal Tadka with Roti', description: 'Provides protein, fiber, and carbohydrates.' }
            ]
        }
    };

    let selectedMeals = meals[dietType][goal];
    return `<ul>${selectedMeals.map(meal => `<li>${meal.name}: ${meal.description}</li>`).join('')}</ul>`;
}

function getCalories(meal) {
    const mealName = meal.split(":")[0].trim();
    const calories = {
        'Poha with Peanuts': 350,
        'Dal Khichdi': 400,
        'Vegetable Sabzi with Roti': 300,
        'Peanut Chutney with Idli': 450,
        'Rajma Chawal': 500,
        'Soya Chunk Curry': 350,
        'Fruit Chaat': 200,
        'Vegetable Pulao': 300,
        'Sprouts Salad': 150,
        'Ragi Dosa with Chutney': 350,
        'Lauki Soup': 100,
        'Grilled Paneer with Salad': 400,
        'Egg Bhurji with Roti': 500,
        'Paneer Butter Masala': 550,
        'Dal & Jeera Rice': 500,
        'Mixed Fruit Smoothie': 250,
        'Masala Dosa': 400,
        'Curd Rice': 350,
        'Paneer Bhurji': 400,
        'Avocado & Cucumber Salad': 250,
        'Grilled Chicken with Ghee': 600,
        'Egg Bhurji with Butter': 500,
        'Mutton Soup': 600,
        'Cheese & Almonds': 450,
        'Keto Smoothie': 200,
        'Tandoori Chicken': 500,
        'Stuffed Capsicum': 350,
        'Moong Dal Chilla': 300,
        'Grilled Fish with Veggies': 400,
        'Palak Dal with Brown Rice': 350,
        'Banana & Peanut Butter Shake': 500,
        'Chicken Biryani': 700,
        'Chapati with Paneer Sabzi': 450,
        'Daliya (Broken Wheat) Porridge': 250,
        'Vegetable Upma': 300,
        'Dal Tadka with Roti': 400
    };

    return calories[mealName] || 0;
}


function getExercisePlan(goal) {
    let exercises = {
        weight_loss: ['Jogging - 30 min', 'Jump Rope - 15 min', 'Cycling - 40 min'],
        muscle_gain: ['Weight Lifting - 15 min', 'Push-ups - 3 sets', 'Pull-ups - 3 sets'],
        maintenance: ['Yoga - 30 min', 'Walking - 45 min', 'Stretching - 15 min']
    };

    return exercises[goal] || [];
}