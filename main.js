$(document).ready(function () {

    // Form validation on submit
    $(".btn-submit").click(function (event) {
      event.preventDefault(); // Prevent the form from submitting
  
      // Retrieve input values
      var firstName = $("#first-name").val().trim();
      var lastName = $("#last-name").val().trim();
      var email = $("#email").val().trim();
      var password = $("#password").val().trim();
      var phone = $("#phone").val().trim();
  
      // Initialize validation flag and message
      var isValid = true;
      var message = "";
  
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
  
    // Function to handle adding items to the cart
    $(".card button").click(function () {
      const productCard = $(this).closest(".card");
      const productName = productCard.find("h3").text();
      const productPrice = productCard.find(".price").text();
      const productImage = productCard.find("img").attr("src");
  
      const product = {
        name: productName,
        price: productPrice,
        image: productImage
      };
  
      var cart = JSON.parse(localStorage.getItem("cart")) || [];
      const isInCart = cart.some((item) => item.name === productName);
      
      if (isInCart) {
        alert(`${productName} is already in your cart!`);
        return;
      }
  
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
  
      $(this).text("Already in Cart").css({
        backgroundColor: "green",
        color: "white",
        cursor: "not-allowed",
      }).prop("disabled", true);
  
      alert(`${productName} has been added to your cart!`);
    });
  
    // Update the cart items on the "My Cart" page
    if ($(".cart-items").length > 0) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        $(".cart-items").html("<p>Your cart is empty.</p>");
      } else {
        cart.forEach((product) => {
          const cartItemHTML = `
            <div class="cart-item">
              <img src="${product.image}" alt="${product.name}" style="width:100px; height:auto;">
              <div class="cart-item-details">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button class="remove-item">Remove</button>
              </div>
            </div>
            <hr>
          `;
          $(".cart-items").append(cartItemHTML);
        });
      }
    }
  
    // Update the button states on the index page for items already in the cart
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
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
  
    // Handle search input field
    $(".search-container input[name='search']").on("input", function () {
      const query = $(this).val().toLowerCase();
      $(".card").each(function () {
        const productName = $(this).find("h3").text().toLowerCase();
        if (productName.includes(query)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
      if (query === "") {
        $(".card").show();
      }
    });
  
    // Function to filter products based on category selection
    $("#category").change(function () {
      const selectedCategory = $(this).val();
      if (selectedCategory === "all") {
        $(".card").show();
      } else {
        $(".card").each(function () {
          const productCategory = $(this).data("category");
          if (productCategory === selectedCategory) {
            $(this).show();
          } else {
            $(this).hide();
          }
        });
      }
    });
  
    // Local Storage Integration for adding items to the cart (Revised)
    $(".add-to-cart").click(function () {
      const productName = $(this).closest(".product").find(".product-name").text();
      const productPrice = $(this).closest(".product").find(".product-price").text();
      const productImage = $(this).closest(".product").find("img").attr("src");
  
      const product = {
        name: productName,
        price: productPrice,
        image: productImage
      };
  
      var cart = JSON.parse(localStorage.getItem("cart")) || [];
      const isInCart = cart.some((item) => item.name === productName);
      
      if (isInCart) {
        alert(`${productName} is already in your cart!`);
        return;
      }
  
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
  
      alert(`${productName} has been added to your cart!`);
    });
  
    // Handle cart items retrieval
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      $(".cart-items").html("<p>Your cart is empty.</p>");
    } else {
      cart.forEach((product) => {
        const cartItemHTML = `
          <div class="cart-item">
            <img src="${product.image}" alt="${product.name}" style="width:100px; height:auto;">
            <div class="cart-item-details">
              <h3>${product.name}</h3>
              <p>${product.price}</p>
              <button class="remove-item">Remove</button>
            </div>
          </div>
          <hr>
        `;
        $(".cart-items").append(cartItemHTML);
      });
    }
  
    // Remove item from cart
    $(".cart-items").on("click", ".remove-item", function () {
      const productName = $(this).closest(".cart-item").find("h3").text();
      var cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.filter(item => item.name !== productName);
      localStorage.setItem("cart", JSON.stringify(cart));
      $(this).closest(".cart-item").remove();
      $(".cart-count").text(cart.length); // Update cart count
    });
  
    // Clear the cart
    $(".clear-cart").click(function () {
      localStorage.removeItem("cart");
      $(".cart-items").html("<p>Your cart is now empty.</p>");
      $(".cart-count").text(0); // Update cart count
    });
  
    // Update cart icon with the number of items in the cart
    $(".cart-count").text(cart.length);
  
  });
  