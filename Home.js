let products = []; //create an empty array to store products

function fetchData() {                   //fetchData():- etch products from the API
    fetch('https://dummyjson.com/products') // to get products from the dummy API
        .then((res) => res.json()) //convert the response into JSON
        .then((val) => {
            products = val.products; //saves the product list from the API into the products array.
            localStorage.setItem("products", JSON.stringify(products)); //Saves products to browser storage so other pages can access it.
            fetchProduct(products); // Calls the fetchProduct() function to display products on the page.
        })
        
}

function fetchProduct(product) { //A function to display all the products on the homepage
    console.log(product) //Prints all the products to the browser console (for checking).
    let output = ""; //Create an empty string to hold HTML code for each product.
        product.map((v) => { //Loop through each product in the list.
         let price=Math.ceil((v.price)); //Rounds the price up to the nearest whole number (just for display).
        //  console.log(price)
        let rate=Math.round(v.rating); // Rounds the rating to the nearest whole number
        // console.log(rate)

        output += `<main>
        <div id="prodImage">
        <img src="${v.thumbnail}">
        </div>
        <p id="title">${v.title}</p>
        <div id="pricebox">
        <div class="price"><strong>Price:</strong> ₹${price * 80}</div>
        <div><button id="view" onClick="viewMore(${v.id})">View More</button></div>
        </div>
        </main>
        `;
    });

    document.getElementById("productItem").innerHTML = output; // Puts all the product cards inside the #productItem container in the HTML.
}

//! To filter the search item using title or category
document.getElementById("searchProduct").addEventListener("input",function searchItem(event){ //When the user types in the search box, this function runs.
    // console.log(event)
    let searchTerm=event.target.value.toLowerCase(); //Takes the typed word and converts it to lowercase for easy matching.
    let filterProduct=products.filter((val)=>{
        return (
            val.title.toLowerCase().includes(searchTerm) || val.category.toLowerCase().includes(searchTerm) 
        );
    }); //Filters products by checking if their title or category includes the search term.
    fetchProduct(filterProduct); //Shows only the filtered (searched) products on the screen.
})

//! To get the viewMore items
function viewMore(productId){
    localStorage.setItem("productId",productId)
    window.location.href="./viewMore.html"
}//When the "View More" button is clicked:
//Saves the selected product ID to localStorage.
//Opens the viewMore.html page to show full product details.

fetchData(); //!Calls the fetchData() function as soon as the page loads. This shows all products initially.