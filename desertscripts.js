// function to load text from another file into a DOM element
function loadFileInto(fromFile, whereTo) {

    // initiate the fetch promise
    let remoteData = fetch(fromFile)
        .then( function(response) { 
            // if OK, convert response into text, otherwise trigger the Promise error
            if (response.ok) return response.text();
            else return Promise.reject(response); // trigger error
        } )
        .then( function(responseResult) {
            // update the page
            document.querySelector(whereTo).innerHTML = responseResult;

            // report success
            console.log("Loaded " + fromFile + " into " + whereTo);

        } )
        .catch( function(error){
            // report any errors
            console.log( ("Could not load " + fromFile + " into " + whereTo + ". Specific error: "), error);
        } );
    
}

//define a recipe object constructor
function Recipe(a, b, c, d, e) {

    //set object properties
    this.name = a;
    this.descriptionFile = b; // file name to the HTML snippet containing this recipe's ingredients list
    this.ingredientsFile = c; //file name to the HTML snippet containing this recipe's directions list 
    this.directionsFile = d; //file name to the HTML snippent containing this recipe's description
    this.imageSource = e; // URL or file name to teh recipe photo


    //update the display with the content for this recipe
    this.display = function() {
        document.querySelector("#hero h1").innerHTML = this.name;
        loadFileInto(this.descriptionFile, "#columns #des");
        loadFileInto(this.ingredientsFile, "#columns #ing");
        loadFileInto(this.directionsFile, "#columns #dir");
        document.querySelector("#hero").style.backgroundImage = "url(" + this.imageSource + ")";
        document.title = "Recipe: " + this.name;
    }// end of .display() method

    // add this recipe to the #navbar ul as a new li tag that is clickable
    this.addToNav = function() {

        //create new element for the navbar
        let newNavLI = document.createElement("li");
        newNavLI.innerHTML = this.name;
        document.querySelector("#navbar ul").appendChild(newNavLI);
        
        //preserve recipe self "this" in a different variable to use within the event listener
        let recipeSelf = this;
        newNavLI.addEventListener("click", function() {
            recipeSelf.display();
        })
    }// end of .addToNav() method
}

let dDesert = new Recipe( "Drake's Coffee Jelly",
                            "d/dDesertDes.html",
                            "d/dDesertIng.html", 
                            "d/dDesertDir.html", 
                            "https://elnazarov.reclaim.hosting/shelter/ddesert.png");

let eDesert = new Recipe( "Ernie's Raspberry Key-Lime Cheesecake Bites",
                            "e/eDesertDes.html",
                            "e/eDesertIng.html", 
                            "e/eDesertDir.html", 
                            "https://elnazarov.reclaim.hosting/shelter/edesert.png");

let aDesert = new Recipe(  "Aspen's Lemon Poppy Scones",
                            "a/aDesertDes.html",
                            "a/aDesertIng.html", 
                            "a/aDesertDir.html", 
                            "https://elnazarov.reclaim.hosting/shelter/adesert.png");

let bDesert = new Recipe(  "Barbie's No-Bake Cookies",
                            "b/bDesertDes.html",
                            "b/bDesertIng.html", 
                            "b/bDesertDir.html", 
                            "https://elnazarov.reclaim.hosting/shelter/bdesert.png");

let cDesert = new Recipe(  "Colleen's Berry Cobbler",
                            "c/cDesertDes.html",
                            "c/cDesertIng.html", 
                            "c/cDesertDir.html", 
                            "https://www.cookingmamas.com/wp-content/uploads/2012/03/Blackberry-Cobbler-1024x793.jpg");

// don't do anything until the DOM loads
document.addEventListener("DOMContentLoaded", function() {
    
    dDesert.addToNav();
    eDesert.addToNav();
    aDesert.addToNav();
    bDesert.addToNav();
    cDesert.addToNav();

});
