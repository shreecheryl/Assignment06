function init() {
    "use strict";
    document.pizzaOrder.name.focus();
    
    function required(event) {
        if (event.target.value === "") {
            event.target.nextElementSibling.firstChild.nodeValue = "Required field";
            event.target.focus();
        } else {
            event.target.nextElementSibling.firstChild.nodeValue = "";
        }
    }
    
    function onlyLetters(event) {
        var str = event.target.value, patt = /[0-9]/g;
        if (patt.test(str)) {
            event.target.nextElementSibling.firstChild.nodeValue = "This field can only contain letters";
            event.target.focus();
        }
    }
    
    function stateCheck(event) {
        var state = event.target.value, patt = /[A-Z]{2}/i;
        if (!patt.test(state)) {
            event.target.nextElementSibling.firstChild.nodeValue = "Invalid entry";
            event.target.value = "";
            event.target.focus();
        } else {
            event.target.value = event.target.value.toUpperCase();
            event.target.nextElementSibling.firstChild.nodeValue = "";
        }
    }
    
    function checkAddressType() {
        var chosenOption = document.pizzaOrder.addressType.selectedIndex;
        var addressType = document.pizzaOrder.addressType.options[chosenOption].value;
        if (addressType === "select") {
            event.target.nextElementSibling.firstChild.nodeValue = "Please select an option";
            event.target.focus();  
        } else if (addressType === "other") {
            event.target.nextElementSibling.firstChild.nodeValue = "";
            document.pizzaOrder.otherAddressType.focus();
        } else {
            event.target.nextElementSibling.firstChild.nodeValue = "";
            document.pizzaOrder.address.focus();
        }
    }
    
    function checkEntry(event) {
        var patt;
        switch (event.target.name) {
        case "zipCode":
            patt = /^[0-9]{5}(?:-[0-9]{4})?$/;
            break;
        case "phone":
            patt = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/;
            break;
        case "email":
            patt = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            break;
        }
        if (!patt.test(event.target.value)) {
            event.target.nextElementSibling.firstChild.nodeValue = "Invalid entry";
            event.target.value = "";
            event.target.focus();
        } else {
            event.target.nextElementSibling.firstChild.nodeValue = "";
        }
    }
    
    // Check Name Entry
    
    //var customerName = document.pizzaOrder.name;
//    customerName.addEventListener("blur", required);
//    customerName.addEventListener("blur", onlyLetters);
//    
//    // Check Address Type
//    //var addressType = document.pizzaOrder.addressType;
//    addressType.addEventListener("blur", checkAddressType);
//    addressType.addEventListener("change", checkAddressType);
//    
//    // Display input field if they select "other" for Address Type
//    
//    //var selection = document.pizzaOrder.addressType; // alternative syntax to document.getElementById("addressType") using form name attribute
//    selection.addEventListener("change", function () {
//        var other = document.getElementById("addressType2");
//        if (document.getElementById("other").selected) {
//            other.setAttribute("class", "form-group indent");
//            document.pizzaOrder.otherAddressType.focus();
//        } else {
//            other.setAttribute("class", "form-group hidden");
//        }    
//    });
//    
//    // Check Specify Address Type Entry
//    //var otherAddressType = document.pizzaOrder.otherAddressType;
//    otherAddressType.addEventListener("blur", required);
//    
//    // Check Address Entry
//    
//    //var address = document.pizzaOrder.address;
//    address.addEventListener("blur", required);
//    
//    // Check City Entry
//    
//    //var city = document.pizzaOrder.city;
//    city.addEventListener("blur", required);
//    
//    // Check State Entry
//    
//    //var state = document.pizzaOrder.state;
//    state.addEventListener("blur", stateCheck);
//    
//    // Check Zip Code Entry
//    
//    //var zip = document.pizzaOrder.zipCode;
//    zip.addEventListener("blur", checkEntry);           
//    
//    // Check Phone Number Entry
//    
//    //var phone = document.pizzaOrder.phone;
//    phone.addEventListener("blur", checkEntry);
//                
//    // Check Email Entry
//    
//    //var email = document.pizzaOrder.email;
//    email.addEventListener("blur", checkEntry);
    
    // Size & Price Options
    
    var handTossed = {
        Small: 9.99,
        Medium: 12.99,
        Large: 14.99  
    };
    
    var thinCrust = {
        Medium: 11.99,
        Large: 13.99,   
    };
    
    var newYorkStyle = {
        Large: 16.99,
        ExtraLarge: 19.99
    };
    
    var glutenFree = {
        Small: 10.99
    };
    
    function removeOptions() {
        while (document.getElementById("size").childNodes.length > 1) {
            document.getElementById("size").removeChild(document.getElementById("size").childNodes[1]);
        }
    }
    
    function createSizeOptions(event) {
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
            var textnode = document.createTextNode(size + " $" + sizes[size]);
            node.appendChild(textnode);
            document.pizzaOrder.size.appendChild(node); 
        }
    }
    
    var dough = document.getElementById("dough");
    dough.addEventListener("change", removeOptions);
    dough.addEventListener("change", createSizeOptions);
    
                
} // end of init

window.addEventListener("load", init);