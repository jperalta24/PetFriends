
// pet finder api SDK
const client = new petfinder.Client({ apiKey: "tYjMHZupQz0KErvq5ks2tmbgVeeNjmcIcWNxdXWDZB214NzP4I", secret: "DjUBiCURqrNwtRv9GZcuT8CUb6tHWMua1EIlqthR" });
// random dog pic api
const dogApi = ('https://dog.ceo/api/breeds/image/random');
// global variables
let animalContainer = document.querySelector('#animal-container');
let doggoBtn = document.querySelector('#doggoBtn');
let randomDog = document.querySelector('#randomDog');
let searchBtn = document.querySelector('#search-submit');
var dogSearchEl = document.querySelector("#dogSearch")
var histContainer = $(".history");
let historyButtonEl = document.querySelector("#historyButton")


//    random dog picture api call
function doggo(){
fetch(dogApi)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    randomDogs = data.message
    randomDog.setAttribute('src', randomDogs);
    console.log(randomDogs);
});
}


// petfinder api call with parameters
async function showAnimals(animalType, searchBreed, postalCode) {
    let page = 1;
    apiResult = await client.animal.search({
        type: animalType,
        breed: searchBreed,
        location: postalCode,
        page: 1,
        limit: 20,
    });
    let dogIdx = (page = 1) * 100;
    apiResult.data.animals.forEach(function (animal) {
        let results = `  ${++dogIdx}: ${animal.name} url: ${animal.url} breed: ${animal.breeds.primary} postcode: ${animal.contact.address} photo: ${animal.photos[0]} description: ${animal.description}`;

        displayAnimal(animal)

    });
    
    page++;

}

// uses user search criteria for petfinder api call
function dogData() {

    clearEl(animalContainer);
    
    let dogBreeds = document.querySelector('#dogSearch').value;
    let zips = document.querySelector('#zipSearch').value;
    console.log(dogBreeds + "  : "+ zips);
    let animalType = 'Dog'
   
    dogs(animalType,dogBreeds,zips);
}

// function to pass parameters to show animals function
    function dogs(animalType,dogBreeds,zips) {
    showAnimals(animalType,dogBreeds,zips);
   
}


// clears search results 
let clearEl = function (element) {
    element.innerHTML = "";
};

// function displays search results
function displayAnimal(animal){
    
    // assigns div element to div variable
    const div = document.createElement('div')
    // adds classes to div element
    div.classList.add('tile', "is-child", "box", "my-2");
    // appends div to animal container id
    div.innerHTML = "<strong>" + animal.name + "</strong>" + "</br> " + animal.description + ".</br> " + "<a href='"+animal.url+"'>Link to their WebPage</a>" + "</br> " + animal.breeds.primary + ".</br> " + animal.contact.address.city + ", " + animal.contact.address.country + " " + animal.contact.address.postcode;
    document.querySelector("#animal-container").appendChild(div)
    // creates a new anchor element
    let newA = document.createElement("a");
    newA.setAttribute("href", animal.url)
    // appends new to div
    div.appendChild(newA);
    if (animal.description == null) {
        return div.innerHTML = div.innerHTML = "<strong>" + animal.name + "</strong>" + ".</br> " + "<a href='"+animal.url+"'>Link to their WebPage</a>" + "</br> " + animal.breeds.primary + ".</br> " + animal.contact.address.city + ", " + animal.contact.address.country + " " + animal.contact.address.postcode;
    }
    let animalImg = document.createElement("img");
    animalImg.classList.add("image", "is-128x128");
    if (animal.photos[0]) {
    animalImg.setAttribute("src", animal.photos[0].full)
    div.appendChild(animalImg)
    }

    
 
}
// local storage
var localAnimals = function () {
    var searchStorage = JSON.parse(localStorage.getItem("searchStorage"));
    if (searchStorage == null) {
      searchStorage = ["Husky", "Corgi", "Artois Hound", "Beagle", "Bernese Mountain Dog", "Dachshund", "Golden Retriever", "Great Dane"];
      localStorage.setItem("searchStorage", JSON.stringify(searchStorage));
    }
    var histContainer = $(".history");
    histContainer.html("");
    for (i in searchStorage) {
      var buttonEl = $("<button1>")
      .addClass("list-group-item is-link m-2 button is-fullwidth search-history")
      .attr ("id", "dogSearchList")
      .attr("type", "button")
      .text(searchStorage[i]);
      histContainer.append(buttonEl);
    }
  };
  
  // get items from localStorage
  var updateHistory = function(animal) {
    var searchStorage = JSON.parse(localStorage.getItem("searchStorage"));
    searchStorage.unshift(animal);
    searchStorage.pop();
    localStorage.setItem("searchStorage", JSON.stringify(searchStorage));
  
    var listItems = $(".list-group-item");
  
    for (l in listItems) {
  
    listItems[l].textContent = searchStorage[l];
    }
  }
  var submitHandler1 = function(event) {
    histContainer.html(); 
    clearEl(animalContainer)   

  target = $(event.target);
  targetId = target.attr("id");

  if (targetId === "dogSearchList") {
    var animal = target.text();

} else if (targetId === "search-submit") {
    var animal = $("#dogSearch").val();
};

if (animal) {
    updateHistory(animal)
}
}

var submitHandler = function(event) {
    histContainer.html(); 
    clearEl(animalContainer)   


  target = $(event.target);
  targetId = target.attr("id");

  if (targetId === "dogSearchList") {
    var animal = target.text();

} else if (targetId === "search-submit") {
    var animal = $("#dogSearch").val();
}

if (animal) {
    updateHistory(animal)
}
}

localAnimals()


doggoBtn.addEventListener("click", doggo);


searchBtn.addEventListener('click', dogData);


$("button1").click(submitHandler1);
$("button").click(submitHandler);








