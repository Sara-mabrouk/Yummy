// APIs:
// - search by name: https://www.themealdb.com/api/json/v1/1/search.php?s=
// - search by first letter: https://www.themealdb.com/api/json/v1/1/search.php?f=
// - search by Id: https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}
// - search by Category: https://www.themealdb.com/api/json/v1/1/categories.php
//^ =============================================================================
let dataContainer = document.getElementById("dataContainer");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;
//^ =============================================================================

// Loading =======>>
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500);
        $("body").css("overflow", "visible");
    });
});

// side nav close and open ==>>
function openSideNav() {
    $(".side-nav-menu").animate(
        {
            left: 0,
        },
        500
    );
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".links li")
            .eq(i)
            .animate(
                {
                    top: 0,
                },
                (i + 5) * 100
            );
    }
}
function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
    $(".side-nav-menu").animate(
        {
            left: -boxWidth,
        },
        500
    );
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".links li").animate(
        {
            top: 300,
        },
        500
    );
}
closeSideNav();
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav();
    } else {
        openSideNav();
    }
});

//^ =============================================================================
//! Getting Data From API ===>>
async function getMeals() {
    let mealAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let mealsData = await mealAPI.json();
    meals = mealsData.meals;
    displayMeals(meals);
}
getMeals();
function displayMeals(meals) {
    let boxMeals = "";
    for (let i = 0; i < meals.length; i++) {
        boxMeals += `
        <div onclick="getMealDetails('${meals[i].idMeal}')"
        class="moveUp col-lg-3 col-md-6">
        <div class="position-relative rounded-4 overflow-hidden">
            <div class="slideUp bg-light bg-opacity-50 w-100 h-100 position-absolute top-0 start-0 d-flex justify-content-center align-items-center textShadow">
            <p class="fs-4 fw-bold text-center">${meals[i].strMeal}</p>
            <span class="visually-hidden">${meals[i].idMeal}</span>
            </div>
            <img class="w-100" src="${meals[i].strMealThumb}" alt="">
</div>
        </div>
    `;
    }
    $("#dataContainer").html(boxMeals);
}
// getCategories
//^ =============================================================================

async function getCategories() {
    dataContainer.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    response = await response.json();
    displayCategories(response.categories);
    $(".inner-loading-screen").fadeOut(300);
}

function displayCategories(data) {
    let boxMeals = "";
    for (let i = 0; i < data.length; i++) {
        boxMeals += `
<div class="col-md-3">
        <div onclick="getCategoryMeals('${data[i].strCategory
            }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${data[i].strCategoryThumb
            }" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>${data[i].strCategory}</h3>
                <p>${data[i].strCategoryDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}</p>
            </div>
        </div>
</div>
`;
    }
    dataContainer.innerHTML = boxMeals;
}

//^ =============================================================================

// Get Area ================>>

async function getArea() {

    dataContainer.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";
    let respone = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    respone = await respone.json();
    console.log(respone.meals);
    displayArea(respone.meals);
    $(".inner-loading-screen").fadeOut(300);
}

function displayArea(data) {
    let boxMeals = "";
    for (let i = 0; i < data.length; i++) {
        boxMeals += `
    <div  onclick="getAreaMeals('${data[i].strArea}')" class="moveUp col-lg-2 col-md-6 ">
                <div class="position-relative rounded-4 overflow-hidden">
                    <div 
                        class="slideUp text-dark bg-light bg-opacity-50 w-100 h-100  position-absolute top-0 start-0 d-flex flex-column justify-content-center align-items-center textShadow">
                        <span class="fs-4 fw-bold mt-1 mb-0"> ${data[i].strArea}</span>
                    </div>
                    <img class="w-100" src="/image/area/${data[i].strArea}.jpg" alt="">
                </div>
            </div>

`;
    }
    dataContainer.innerHTML = boxMeals;
}

// getIngredients ================>>

async function getIngredients() {
    dataContainer.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";
    let respone = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    respone = await respone.json();
    console.log(respone.meals);
    displayIngredients(respone.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
}
function displayIngredients(data) {
    let boxMeals = "";
    for (let i = 0; i < data.length; i++) {
        boxMeals += `
    <div
    onclick="getIngredientsMeals('${data[i].strIngredient
            }')"
    class="moveUp col-lg-2 col-md-6 ">
                <div class="position-relative rounded-4 overflow-hidden">
                    <div
                        class="slideUp text-dark bg-light bg-opacity-50 w-100 h-100  position-absolute top-0 start-0 d-flex flex-column justify-content-center align-items-center textShadow">
                        <span class="fs-4 fw-bold mt-1 mb-0"> ${data[i].strIngredient}</span>
                    </div>
                    <img class="w-100" src="/image/ingredient/${data[i].strIngredient}.jpg" alt="">
                </div>
            </div>

`;
    }
    dataContainer.innerHTML = boxMeals;
}


//Meals getCategory
// Meals getArea
// Meals getIngredients


async function getCategoryMeals(category) {

    // console.log("hiii");
    dataContainer.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();
    displayMeals(response.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
}

async function getAreaMeals(area) {
    dataContainer.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    response = await response.json();
    displayMeals(response.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
}

async function getIngredientsMeals(ingredients) {
    dataContainer.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
    );
    response = await response.json();
    displayMeals(response.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
}


// Meal Details

async function getMealDetails(mealID) {
    closeSideNav();
    dataContainer.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";
    let respone = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    );
    respone = await respone.json();
    displayMealDetails(respone.meals[0]);
    $(".inner-loading-screen").fadeOut(300);
}


function displayMealDetails(meal) {
    searchContainer.innerHTML = "";
    let ingredients = ``;
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]
                } ${meal[`strIngredient${i}`]}</li>`;
        }
    }
    let tags = meal.strTags?.split(",");
    if (!tags) tags = [];
    let tagsStr = "";
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
    }

    let boxMeals = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

    dataContainer.innerHTML = boxMeals;
}



// Search & searchByFiltter

function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
    <div class="col-md-6">
    <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
    </div>
    </div>`;
    dataContainer.innerHTML = "";
}



async function searchByName(term) {
    closeSideNav();
    dataContainer.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    response = await response.json();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $(".inner-loading-screen").fadeOut(300);
}

async function searchByFLetter(term) {
    closeSideNav();
    dataContainer.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    term == "" ? (term = "a") : "";
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
    );
    response = await response.json();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $(".inner-loading-screen").fadeOut(300);
}

//*========================= validation ======================*\\
 // Contact form display
function showContacts() {
    dataContainer.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")
    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })
    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })
    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })
    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })
    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })
    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;
function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")
        }
    }
    if (emailInputTouched) {
        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")
        }
    }
    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
        }
    }
    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")
        }
    }
    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
        }
    }
    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}
function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}
function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}
function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}
function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}
function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}