$(document).ready(function () {
    $(".btn-submit").click(function (event) {
      event.preventDefault(); // Prevent the form from submitting

      // Retrieve input values
      let firstName = $("#first-name").val().trim();
      let lastName = $("#last-name").val().trim();
      let email = $("#email").val().trim();
      let password = $("#password").val().trim();
      let phone = $("#phone").val().trim();

      // Initialize validation flag and message
      let isValid = true;
      let message = "";

      // Reset borders
      $("input").css("border", "1px solid #ccc");

      // Check required fields
      if (!firstName) {
        isValid = false;
        $("#first-name").css("border", "1px solid red");
      }
      if (!lastName) {
        isValid = false;
        $("#last-name").css("border", "1px solid red");
      }
      if (!email) {
        isValid = false;
        $("#email").css("border", "1px solid red");
      }
      if (!password) {
        isValid = false;
        $("#password").css("border", "1px solid red");
      }

      // Determine the message based on validation
      if (!firstName && !lastName && !email && !password) {
        message = "Please fill in the form.";
      } else if (!firstName || !lastName) {
        message = "Please fill in the name.";
      } else if (!email) {
        message = "Please fill in the email.";
      } else if (!password) {
        message = "Please fill in the password.";
      } else {
        message = "You are now connected. <a href='index.html'>Return to the main page</a>";
      }

     
      $(".form-message").html(message).css("color", message.includes("connected") ? "green" : "red");
    });
  });
  /* card */
  $(document).ready(function () {
    // Function to handle adding items to the cart
    $(".card button").click(function () {
      // Get the product details
      const productCard = $(this).closest(".card");
      const productName = productCard.find("h3").text();
      const productPrice = productCard.find(".price").text();
      const productImage = productCard.find("img").attr("src");
  
      // Create an object to store the product details
      const product = {
        name: productName,
        price: productPrice,
        image: productImage,
      };
  
      // Retrieve existing cart data from localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      // Check if the product is already in the cart
      const isInCart = cart.some((item) => item.name === productName);
      if (isInCart) {
        alert(`${productName} is already in your cart!`);
        return;
      }
  
      // Add the product to the cart
      cart.push(product);
  
      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
  
      // Change button appearance
      $(this).text("Already in Cart").css({
        backgroundColor: "green",
        color: "white",
        cursor: "not-allowed",
      }).prop("disabled", true);
  
      // Notify the user
      alert(`${productName} has been added to your cart!`);
    });
  
    // Update the cart items on the "My Cart" page
    if ($(".cart-items").length > 0) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      // Check if the cart is empty
      if (cart.length === 0) {
        $(".cart-items").html("<p>Your cart is empty.</p>");
      } else {
        // Generate cart items dynamically
        cart.forEach((product) => {
          const cartItemHTML = `
            <div class="cart-item">
              <img src="${product.image}" alt="${product.name}" style="width:100px; height:auto;">
              <div class="cart-item-details">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
              </div>
            </div>
            <hr>
          `;
          $(".cart-items").append(cartItemHTML);
        });
      }
    }
  
    // Update the button states on the index page for items already in the cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    $(".card").each(function () {
      const productName = $(this).find("h3").text();
      if (cart.some((item) => item.name === productName)) {
        $(this).find("button").text("Already in Cart").css({
          backgroundColor: "green",
          color: "white",
          cursor: "not-allowed",
        }).prop("disabled", true);
      }
    });
  });
  $(document).ready(function () {
    // When the user types in the search input field
    $(".search-container input[name='search']").on("input", function () {
      // Get the search query and convert it to lowercase
      const query = $(this).val().toLowerCase();
  
      // Iterate over all the product cards
      $(".card").each(function () {
        const productName = $(this).find("h3").text().toLowerCase();
  
        // Check if the product name includes the search query
        if (productName.includes(query)) {
          $(this).show(); // Show matching products
        } else {
          $(this).hide(); // Hide non-matching products
        }
      });
  
      // If the search query is empty, show all products
      if (query === "") {
        $(".card").show();
      }
    });
  });
  $(document).ready(function () {
    // Function to filter products based on category selection
    $("#category").change(function () {
      const selectedCategory = $(this).val(); // Get selected category
      
      // Show all products if 'All Categories' is selected
      if (selectedCategory === "all") {
        $(".card").show(); // Show all cards
      } else {
        // Filter products by selected category
        $(".card").each(function () {
          const productCategory = $(this).data("category"); // Get the category of the current product
          
          if (productCategory === selectedCategory) {
            $(this).show(); // Show matching category
          } else {
            $(this).hide(); // Hide non-matching categories
          }
        });
      }
    });
  });
  /*Local Storage Integration*/
  $(document).ready(function () {
    $(".add-to-cart").click(function () {
      // Get product details
      const productName = $(this).closest(".product").find(".product-name").text();
      const productPrice = $(this).closest(".product").find(".product-price").text();
      const productImage = $(this).closest(".product").find("img").attr("src");
  
      // Create a product object
      const product = {
        name: productName,
        price: productPrice,
        image: productImage
      };
  
      // Get existing cart data from localStorage or initialize it as an empty array
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      // Add the new product to the cart
      cart.push(product);
  
      // Save the updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
  
      // Optionally, show a notification to the user
      alert(`${productName} has been added to your cart!`);
    });
  });
  $(document).ready(function () {
    // Retrieve the cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Check if the cart is empty
    if (cart.length === 0) {
      $(".cart-items").html("<p>Your cart is empty.</p>");
      return;
    }
  
    // Generate cart items dynamically
    cart.forEach((product) => {
      const cartItemHTML = `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.name}" style="width:100px; height:auto;">
          <div class="cart-item-details">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
          </div>
        </div>
        <hr>
      `;
      $(".cart-items").append(cartItemHTML);
    });
  });
  $(document).ready(function () {
    $(".remove-item").click(function () {
      const productName = $(this).closest(".cart-item").find("h3").text();
  
      // Get the cart from localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      // Filter out the item to be removed
      cart = cart.filter(item => item.name !== productName);
  
      // Save the updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
  
      // Remove the item from the DOM
      $(this).closest(".cart-item").remove();
    });
  });
  $(document).ready(function () {
    $(".clear-cart").click(function () {
      // Clear the cart in localStorage
      localStorage.removeItem("cart");
  
      // Optionally, update the UI
      $(".cart-items").html("<p>Your cart is now empty.</p>");
    });
  });
  $(document).ready(function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Update the cart icon with the number of items in the cart
    $(".cart-count").text(cart.length);
  });
  