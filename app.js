
document.onreadystatechange = () => {
    // document ready
    if (document.readyState === 'complete') {
        const brandName = document.querySelector("#brand");
        const modelName = document.querySelector("#model");
        const fuelType = document.querySelector("#fuel");
        const cars = getCars();

        //Clear duplicate brands to show brand list without duplicates
        let noDuplicates = clearDuplicateBrands(cars)
        showBrands(noDuplicates, brandName);



        console.log(filterBrand(cars, "vauxhall"));

        let filteredBrands = filterBrand(cars, "vauxhall");
        console.log(filterModels(filteredBrands, "108 Top!"));



    }
};


function bindUser() {
    console.log("aa");
}



function getCars() {
    return [
        {
            "short_name": "108",
            "brand": "peugeot",
            "fuel_types": [
                "Petrol"
            ]
        },
        {
            "short_name": "108 Top!",
            "brand": "vauxhall",
            "fuel_types": [
                "Petrol"
            ]
        },
        {
            "short_name": "104 TopStar!",
            "brand": "vauxhall",
            "fuel_types": [
                "Petrol",
                "Diesel"
            ]
        },
        {
            "short_name": "3008 SUV",
            "brand": "ds",
            "fuel_types": [
                "Petrol",
                "Diesel"
            ]
        },
    ];
}




// Returns objects only with the given brand
function filterBrand(carsArray, brand) {

    const filtered = carsArray.filter(car => {
        if (car.brand == brand) {
            return car.short_name;
        }
    });

    return filtered;
}

// Returns a single object with the given model
function filterModels(carsArray, model) {

    const filtered = carsArray.filter(car => {
        if (car.short_name == model) {
            return car.fuel_types;
        }
    });

    return filtered;
}


//Clears selections for the dropdown depending on the input to the function
function clearSelections(clearOption) {

    if (clearOption == "model" || clearOption == "all") {
        // Remove all previous model options every time there is a change
        let modelOptions = document.getElementsByClassName('model selection');
        while (modelOptions[0]) {
            modelOptions[0].parentNode.removeChild(modelOptions[0]);
        }
    }

    if (clearOption == "fuel" || clearOption == "all") {
        // Remove all previous fuel options every time there is a change
        let fuelOptions = document.getElementsByClassName('fuel selection');
        while (fuelOptions[0]) {
            fuelOptions[0].parentNode.removeChild(fuelOptions[0]);
        }
    }
}

function radioCheck(value, isChecked) {
    const brandName = document.querySelector("#brand");
    const modelName = document.querySelector("#model");
    const fuelType = document.querySelector("#fuel");

    const usedBrandName = document.querySelector("#usedBrand");
    const usedModelName = document.querySelector("#usedModel");
    const usedFuelType = document.querySelector("#usedFuel");

    if (isChecked && value == "used") {

        brandName.style.display = "none";
        modelName.style.display = "none";
        fuelType.style.display = "none";

        usedBrandName.style.display = "block";
        usedModelName.style.display = "block";
        usedFuelType.style.display = "block";


    }

    if (isChecked && value == "new") {

        brandName.style.display = "block";
        modelName.style.display = "block";
        fuelType.style.display = "block";

        usedBrandName.style.display = "none";
        usedModelName.style.display = "none";
        usedFuelType.style.display = "none";

    }
}



// Clears duplicate brands for the showBrands function
function clearDuplicateBrands(arr) {


    var filtered = arr.filter((arr, index, self) =>
        index === self.findIndex((t) => (t.brand === arr.brand)))

    return filtered;
}

//Displays brand options in the drop down slection
function showBrands(cars, brandName) {
    let option;
    for (let i = 0; i < cars.length; i++) {
        option = document.createElement("option");
        option.text = cars[i].brand;
        brandName.add(option);
        option.setAttribute("class", "brand selection")
    }
    option = document.createElement("option");
    option.text = "other";
    brandName.add(option);
    option.setAttribute("class", "brand selection")
}



//Updates the dropdown list of models depending on the brand selection
function showModels(brand) {

    clearSelections("all");

    // Clear previous data on every change
    let modelsForBrand = [];
    let cars = [];
    let option;
    const modelName = document.querySelector("#model");

    // Get the full list and filter out only for the selected brand from the dropdown
    cars = getCars();
    modelsForBrand = filterBrand(cars, brand)

    //Update models for selected brand
    for (let i = 0; i < modelsForBrand.length; i++) {
        option = document.createElement("option");
        option.text = modelsForBrand[i].short_name;
        modelName.add(option);
        option.setAttribute("class", "model selection")
    }
}



//Updates the dropdown list of fuel types depending on the model selection
function showFuels(model) {

    clearSelections("fuel");

    // Clear previous data on every change
    let fuelForModel = [];
    let cars = [];
    let option;
    const fuelType = document.querySelector("#fuel");

    // Get the full list and filter out only for the selected model fuel types from the dropdown
    cars = getCars();
    fuelForModel = filterModels(cars, model)
    console.log(fuelForModel[0].fuel_types + "  FUEL MODEL 1");
    //Update fuel types for selected brand
    for (let i = 0; i < fuelForModel[0].fuel_types.length; i++) {
        option = document.createElement("option");
        console.log(fuelForModel[0].fuel_types[i]);
        option.text = fuelForModel[0].fuel_types[i];
        fuelType.add(option);
        option.setAttribute("class", "fuel selection")
    }
}



// // Get auth token
// const data = new FormData();
// const authXHR = new XMLHttpRequest();
// data.append("grant_type", "password");
// data.append("client_id", "xxx");
// data.append("client_secret", "xxx");
// data.append("username", "xxx");
// data.append("password", "xxx");
// data.append("scope", "");

// authXHR.withCredentials = false;

// authXHR.addEventListener("readystatechange", function () {
//     if (this.readyState === this.DONE) {
//       console.log(this.responseText);
//       const token = this.responseText.access_token;
//       getCarModels(token);
//     }
//   });

// authXHR.open("POST", "https://api-preprod.robinsandday.co.uk/oauth/token");
// // authXHR.setRequestHeader("Access-Control-Allow-Headers","Origin, Content-Type, X-Auth-Token, Authorization");
// // authXHR.setRequestHeader("Access-Control-Allow-Origin","*");
//  //authXHR.setRequestHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
// authXHR.send(data);

// function getCarModels(token){
// // Get car details
// var data = null;

// var modelGet = new XMLHttpRequest();
// modelGet.withCredentials = false;

// modelGet.addEventListener("readystatechange", function () {
//   if (this.readyState === this.DONE) {
//     console.log(this.responseText);
//   }
// });

// modelGet.open("GET", "https://api-preprod.robinsandday.co.uk/api/used/available-options");
// // modelGet.setRequestHeader("Access-Control-Allow-Headers","Origin, Content-Type, X-Auth-Token, Authorization");
// // modelGet.setRequestHeader("Access-Control-Allow-Origin","*");
//  modelGet.setRequestHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");

// modelGet.setRequestHeader("Authorization", "Bearer "+ token);

// modelGet.send(data);
// }

