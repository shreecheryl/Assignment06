function init() {
    "use strict";
    document.pizzaOrder.name.focus();
    
    function required(event) {
        if (event.target.value === "") {
            event.target.nextElementSibling.innerHTML = " Required field";
            event.target.focus();
        } else {
            event.target.nextElementSibling.innerHTML = "";
        }
    }
    
    function onlyLetters(event) {
        var str = event.target.value, patt = /[0-9]/g;
        if (patt.test(str)) {
            event.target.nextElementSibling.innerHTML = " This field can only contain letters";
            event.target.focus();
        }
    }
    
    function stateCheck(event) {
        var state = event.target.value, patt = /^[A-Z]{2}$/i;
        if (!patt.test(state)) {
            event.target.nextElementSibling.innerHTML = " Invalid entry";
            event.target.value = "";
            event.target.focus();
        } else {
            event.target.value = event.target.value.toUpperCase();
            event.target.nextElementSibling.innerHTML = "";
        }
    }
    
    function checkAddressType() {
        var addressType = document.pizzaOrder.addressType.value;
        if (addressType === "select") {
            event.target.nextElementSibling.innerHTML = " Please select an option";
            event.target.focus();
        } else if (addressType === "other") {
            event.target.nextElementSibling.innerHTML = "";
            document.pizzaOrder.otherAddressType.focus();
        } else {
            event.target.nextElementSibling.innerHTML = "";
            document.pizzaOrder.address.focus();
        }
    }
    
    function checkEntry(event) {
        var patt;
        switch (event.target.name) {
        case "zipCode":
            patt = /^[0-9]{5}(?:-[0-9]{4})?$/;
            break;
        case "billingZipCode":
            patt = /^[0-9]{5}(?:-[0-9]{4})?$/;
            break;
        case "phone":
            patt = /((\(\d{3}\)?)|(\d{3}-))?\d{3}-\d{4}/;
            break;
        case "email":
            patt = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            break;
        }
        if (!patt.test(event.target.value)) {
            event.target.nextElementSibling.innerHTML = " Invalid entry";
            event.target.value = "";
            event.target.focus();
        } else {
            event.target.nextElementSibling.innerHTML = "";
        }
    }
    
    // Check Name Entry
    
    var customerName = document.pizzaOrder.name;
    customerName.addEventListener("blur", required);
    customerName.addEventListener("blur", onlyLetters);
    
    // Check Address Type
    
    var addressType = document.pizzaOrder.addressType;
    addressType.addEventListener("blur", checkAddressType);
    addressType.addEventListener("change", checkAddressType);
    
    // Display input field if they select "other" for Address Type
    
    var selection = document.pizzaOrder.addressType;
    selection.addEventListener("change", function () {
        var other = document.getElementById("addressType2");
        if (document.getElementById("other").selected) {
            other.setAttribute("class", "form-group indent");
            document.pizzaOrder.otherAddressType.focus();
        } else {
            other.setAttribute("class", "form-group hidden");
        }    
    });
    
    // Check Specify Address Type Entry
    
    var otherAddressType = document.pizzaOrder.otherAddressType;
    otherAddressType.addEventListener("blur", required);
    
    // Check Address Entry
    
    var address = document.pizzaOrder.address;
    address.addEventListener("blur", required);
    
    // Check City Entry
    
    var city = document.pizzaOrder.city;
    city.addEventListener("blur", required);
    
    // Check State Entry
    
    var state = document.pizzaOrder.state;
    state.addEventListener("blur", stateCheck);
    
    // Check Zip Code Entry
    
    var zip = document.pizzaOrder.zipCode;
    zip.addEventListener("blur", checkEntry);           
    
    // Check Phone Number Entry
    
    var phone = document.pizzaOrder.phone;
    phone.addEventListener("blur", checkEntry);
                
    // Check Email Entry
    
    var email = document.pizzaOrder.email;
    email.addEventListener("blur", checkEntry);
    
    // Alert if they have not chosen Dough
    
    function checkDough() {
        if (document.getElementById("size").childNodes.length < 2) {
            document.getElementById("sizeLabel").nextElementSibling.innerHTML = " Choose a Dough Option First";
            document.getElementById("firstDoughOption").focus();
        } else {
            document.getElementById("sizeLabel").nextElementSibling.innerHTML = "";
        } 
    }
    
    document.getElementById("size").addEventListener("focus", checkDough);
    
    // Size & Price Options
    
    var handTossed = {
        Small: 9.99,
        Medium: 12.99,
        Large: 14.99
    };
    
    var thinCrust = {
        Medium: 11.99,
        Large: 13.99
    };
    
    var newYorkStyle = {
        Large: 16.99,
        ExtraLarge: 19.99
    };
    
    var glutenFree = {
        Small: 10.99
    };
    
    function removeOptions() {
        var sizeElement = document.getElementById("size");
        while (sizeElement.childNodes.length > 1) {
            sizeElement.removeChild(sizeElement.childNodes[1]);
        }
    }
    
    function createSizeOptions(event) {
        document.getElementById("doughLabel").nextElementSibling.innerHTML = "";
        document.getElementById("sizeLabel").nextElementSibling.innerHTML = " *";
        
        var sizes;
        var size;
        
        switch (event.target.value) {
        case "handTossed":
            sizes = handTossed;
            break;
        case "thinCrust":
            sizes = thinCrust;
            break;
        case "newYorkStyle":
            sizes = newYorkStyle;
            break;
        case "glutenFree":
            sizes = glutenFree;
            break;
        }
        for (size in sizes) {
            var node = document.createElement("option");
            node.setAttribute("value", sizes[size]);
            var textnode = document.createTextNode(size + " $" + sizes[size]);
            node.appendChild(textnode);
            document.pizzaOrder.size.appendChild(node);
        }
        
        document.pizzaOrder.size.focus();
    }
    
    var dough = document.getElementById("dough");
    dough.addEventListener("change", removeOptions);
    dough.addEventListener("change", createSizeOptions);
    
    // Enable Cheese and Sauce Options
    
    function enableOptions() {
        var size = document.getElementById("size");
        if (size.value != 0) {
            document.pizzaOrder.cheese.removeAttribute("disabled");
            document.pizzaOrder.sauce.removeAttribute("disabled");
            document.getElementById("sizeLabel").nextElementSibling.innerHTML = "";
        } else if (size.value == 0) {
            document.pizzaOrder.cheese.setAttribute("disabled", "true");
            document.pizzaOrder.sauce.setAttribute("disabled", "true");
            document.getElementById("sizeLabel").nextElementSibling.innerHTML = " Choose a Size";
        }
    }
    
    document.pizzaOrder.size.addEventListener("change", enableOptions);
    
    // Keep Running Total
    
    function calculateTotal() {
        var total = document.getElementById("total");
        var sizeCost = Number(document.getElementById("size").value);
        var cheeseCost = Number(document.getElementById("cheese").value);
        var sauceCost = Number(document.getElementById("sauce").value);
        var toppingsList = document.getElementsByClassName("topping");
        var count = 0, i, toppingsCost;
        for (i = 0; i < toppingsList.length; i += 1) {
            if (toppingsList[i].checked) {
                count += 1;
            }
            toppingsCost = Number((count * 0.99));
        }
        total.innerHTML = (sizeCost + cheeseCost + sauceCost + toppingsCost).toFixed(2);
        if (isNaN(total.innerHTML)) {
            total.innerHTML = "Total";
        }
    }

    document.getElementById("prices").addEventListener("change", calculateTotal);
    
    // Confirm Finished Building Pizza
    
    var finished = document.getElementById("finished");
    
    finished.addEventListener("click", function () {
        var orderStatus = window.confirm("Are you sure you are finished with building your pizza?");
        if (orderStatus) {
            document.getElementById("billing").removeAttribute("class");
            document.getElementById("sameAsDelivery").focus();
        }
    });
    
    // Populate Billing Info with Delivery Info
    
    function populateBillingInfo() {
        if (document.getElementById("sameAsDelivery").checked) {
            document.pizzaOrder.billingName.value = document.pizzaOrder.name.value;
            document.pizzaOrder.billingName.nextElementSibling.innerHTML = "";
            document.pizzaOrder.billingAddress.value = document.pizzaOrder.address.value;
            document.pizzaOrder.billingAddress.nextElementSibling.innerHTML = "";
            document.pizzaOrder.billingAptNumber.value = document.pizzaOrder.aptNumber.value;
            document.pizzaOrder.billingCity.value = document.pizzaOrder.city.value;
            document.pizzaOrder.billingCity.nextElementSibling.innerHTML = "";
            document.pizzaOrder.billingState.value = document.pizzaOrder.state.value;
            document.pizzaOrder.billingState.nextElementSibling.innerHTML = "";
            document.pizzaOrder.billingZipCode.value = document.pizzaOrder.zipCode.value;
            document.pizzaOrder.billingZipCode.nextElementSibling.innerHTML = "";
        } else {
            document.pizzaOrder.billingName.value = "";
            document.pizzaOrder.billingName.nextElementSibling.innerHTML = " *";
            document.pizzaOrder.billingAddress.value = "";
            document.pizzaOrder.billingAddress.nextElementSibling.innerHTML = " *";
            document.pizzaOrder.billingAptNumber.value = "";
            document.pizzaOrder.billingCity.value = "";
            document.pizzaOrder.billingCity.nextElementSibling.innerHTML = " *";
            document.pizzaOrder.billingState.value = "";
            document.pizzaOrder.billingState.nextElementSibling.innerHTML = " *";
            document.pizzaOrder.billingZipCode.value = "";
            document.pizzaOrder.billingZipCode.nextElementSibling.innerHTML = " *";
        }
    }
    
    document.getElementById("sameAsDelivery").addEventListener("change", populateBillingInfo);
    
    // Validate Billing Info
    
    var billingname = document.pizzaOrder.billingName;
    billingname.addEventListener("blur", required);
    billingname.addEventListener("blur", onlyLetters);
    
    var billingaddress = document.pizzaOrder.billingAddress;
    billingaddress.addEventListener("blur", required);
    
    var billingcity = document.pizzaOrder.billingCity;
    billingcity.addEventListener("blur", required);
    
    var billingstate = document.pizzaOrder.billingState;
    billingstate.addEventListener("blur", stateCheck);
    
    var billingzip = document.pizzaOrder.billingZipCode;
    billingzip.addEventListener("blur", checkEntry);

    // Validate Credit Card Number



    // Check Expiration Date

    function checkExpDate() {
        var theDate = new Date();
        var theMonth = theDate.getMonth();
        var theYear = theDate.getFullYear();
        var expMo = document.pizzaOrder.expMonth;
        var expYr = document.pizzaOrder.expYear;
        if (expYr.value == "select") {
            expYr.focus();
        } else if (expMo.value >= theMonth || (expMo.value <= theMonth && expYr.value > theYear) || (expMo.value <= theMonth && expYr.value > theYear)) {
            document.getElementById("submitOrder").removeAttribute("disabled");
            document.getElementById("submitOrder").focus();
            expMo.nextElementSibling.innerHTML = "";   
        } else {
            expMo.nextElementSibling.innerHTML = " Invalid Expiration Date";
            document.getElementById("submitOrder").setAttribute("disabled", true);
            expMo.focus();
        }
    }

    document.pizzaOrder.expYear.addEventListener("change", checkExpDate);
    document.pizzaOrder.expMonth.addEventListener("change", checkExpDate);
    
} // end of init

window.addEventListener("load", init);