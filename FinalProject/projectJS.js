const mealDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const mealTypes = ["Breakfast", "Snack 1", "Lunch", "Snack 2", "Dinner"];

function generateMealInputs() {
    const mealInputsContainer = document.getElementById("mealInputs");

    mealDays.forEach(day => {
        const daySection = document.createElement('div');
        daySection.innerHTML = `<h4>${day}</h4>`;

        mealTypes.forEach(meal => {
            const mealLabel = document.createElement('label');
            mealLabel.setAttribute('for', `${day.toLowerCase()}${meal.replace(' ', '')}`);
            mealLabel.textContent = `${meal}:`;
            const mealInput = document.createElement('input');
            mealInput.type = 'text';
            mealInput.id = `${day.toLowerCase()}${meal.replace(' ', '')}`;
            mealInput.placeholder = `${meal} for ${day}`;

            daySection.appendChild(mealLabel);
            daySection.appendChild(mealInput);
            daySection.appendChild(document.createElement('br'));
        });

        mealInputsContainer.appendChild(daySection);
    });
}

generateMealInputs();

document.getElementById("generateMealPlan").addEventListener('click', generateMealPlan);

document.getElementById("clearPlanner").addEventListener('click', clearPlanner);

document.getElementById("printPlanner").addEventListener('click', printPlanner);

document.getElementById("downloadPlanner").addEventListener('click', downloadPlanner);

function generateMealPlan() {
    const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("email").value;
    const userGoal = document.getElementById("goal").value;

    if (!userEmail || !validateEmail(userEmail)) {
        alert("Please enter a valid email address.");
        return;
    }

    const meals = {};
    mealDays.forEach(day => {
        meals[day] = {};
        mealTypes.forEach(meal => {
            meals[day][meal] = document.getElementById(`${day.toLowerCase()}${meal.replace(' ', '')}`).value;
        });
    });

    let myText = "<html>\n<head>\n<title>Your Meal Plan</title>\n</head>\n<body style='font-family: monospace;'>\n";
    myText += `<h1>${userName}'s Meal Plan</h1>\n`;
    myText += `<p><strong>Email:</strong> ${userEmail}</p>\n`;
    myText += `<p><strong>Goal for the week:</strong> ${userGoal}</p>\n`;
    myText += "<h2>Meal Plan</h2>\n";

    mealDays.forEach(day => {
        myText += `<h3>${day}:</h3>\n`;
        mealTypes.forEach(meal => {
            myText += `<p><strong>${meal}:</strong> ${meals[day][meal]}</p>\n`;
        });
    });

    myText += "</body>\n</html>";

    let flyWindow = window.open('about:blank', 'mealPlanWindow', 'width=600,height=600,left=100,top=100');
    flyWindow.document.write(myText);
}

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}


function clearPlanner() {
    document.getElementById("userName").value = '';
    document.getElementById("email").value = '';
    document.getElementById("goal").value = '';

    mealDays.forEach(day => {
        mealTypes.forEach(meal => {
            document.getElementById(`${day.toLowerCase()}${meal.replace(' ', '')}`).value = '';
        });
    });
}

function printPlanner() {
    const mealPlanWindow = window.open('', '_blank');
    mealPlanWindow.document.write('<html><head><title>Meal Plan</title></head><body style="font-family: monospace;">');

    const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("email").value;
    const userGoal = document.getElementById("goal").value;

    mealPlanWindow.document.write(`<h1>${userName}'s Meal Plan</h1>`);
    mealPlanWindow.document.write(`<p><strong>Email:</strong> ${userEmail}</p>`);
    mealPlanWindow.document.write(`<p><strong>Goal for the week:</strong> ${userGoal}</p>`);
    mealPlanWindow.document.write('<h2>Meal Plan</h2>');

    mealDays.forEach(day => {
        mealPlanWindow.document.write(`<h3>${day}:</h3>`);
        mealTypes.forEach(meal => {
            const mealValue = document.getElementById(`${day.toLowerCase()}${meal.replace(' ', '')}`).value;
            mealPlanWindow.document.write(`<p><strong>${meal}:</strong> ${mealValue}</p>`);
        });
    });

    mealPlanWindow.document.write('</body></html>');
    mealPlanWindow.document.close();
    mealPlanWindow.print();
}

function downloadPlanner() {
    const mealPlanContent = generateMealPlanHTML();

    const blob = new Blob([mealPlanContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'meal_plan.html';
    link.click();
}

function generateMealPlanHTML() {
    const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("email").value;
    const userGoal = document.getElementById("goal").value;

    let myText = "<html>\n<head>\n<title>Your Meal Plan</title>\n</head>\n<body style='font-family: monospace;'>\n";
    myText += `<h1>${userName}'s Meal Plan</h1>\n`;
    myText += `<p><strong>Email:</strong> ${userEmail}</p>\n`;
    myText += `<p><strong>Goal for the week:</strong> ${userGoal}</p>\n`;
    myText += "<h2>Meal Plan</h2>\n";

    mealDays.forEach(day => {
        myText += `<h3>${day}:</h3>\n`;
        mealTypes.forEach(meal => {
            const mealValue = document.getElementById(`${day.toLowerCase()}${meal.replace(' ', '')}`).value;
            myText += `<p><strong>${meal}:</strong> ${mealValue}</p>\n`;
        });
    });

    myText += "</body>\n</html>";
    return myText;
}


