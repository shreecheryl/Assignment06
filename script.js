function init() {
    "use strict";
    document.deliveryLocation.name.focus();
    
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
        var chosenOption = document.deliveryLocation.addressType.selectedIndex;
        var addressType = document.deliveryLocation.addressType.options[chosenOption].value;
        if (addressType === "select") {
            event.target.nextElementSibling.firstChild.nodeValue = "Please select an option";
            event.target.focus();  
        } else if (addressType === "other") {
            event.target.nextElementSibling.firstChild.nodeValue = "";
            document.deliveryLocation.otherAddressType.focus();
        } else {
            event.target.nextElementSibling.firstChild.nodeValue = "";
            document.deliveryLocation.address.focus();
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
            console.log(event.target);
        }
    }
    
    // Check Name Entry
    
    var customerName = document.deliveryLocation.name;
    customerName.addEventListener("blur", required);
    customerName.addEventListener("blur", onlyLetters);
    
    // Check Address Type
    var addressType = document.deliveryLocation.addressType;
    addressType.addEventListener("blur", checkAddressType);
    addressType.addEventListener("change", checkAddressType);
    
    // Display input field if they select "other" for Address Type
    
    var selection = document.deliveryLocation.addressType; // alternative syntax to document.getElementById("addressType") using form name attribute
    selection.addEventListener("change", function () {
        if (document.getElementById("other").selected) {
            var other = document.getElementById("addressType2");
            other.setAttribute("class", "form-group indent");
            document.deliveryLocation.otherAddressType.focus();
        }     
    });
    
    // Check Specify Address Type Entry
    var otherAddressType = document.deliveryLocation.otherAddressType;
    otherAddressType.addEventListener("blur", required);
    
    // Check Address Entry
    
    var address = document.deliveryLocation.address;
    address.addEventListener("blur", required);
    
    // Check City Entry
    
    var city = document.deliveryLocation.city;
    city.addEventListener("blur", required);
    
    // Check State Entry
    
    var state = document.deliveryLocation.state;
    state.addEventListener("blur", stateCheck);
    
    // Check Zip Code Entry
    
    var zip = document.deliveryLocation.zipCode;
    zip.addEventListener("blur", checkEntry);           
    
    // Check Phone Number Entry
    
    var phone = document.deliveryLocation.phone;
    phone.addEventListener("blur", checkEntry);
                
    // Check Email Entry
    
    var email = document.deliveryLocation.email;
    email.addEventListener("blur", checkEntry); 
                
} // end of init

window.addEventListener("load", init);