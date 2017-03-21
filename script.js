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
    
    // Check name entry
    
    var customerName = document.deliveryLocation.name;
    customerName.addEventListener("blur", required);
    customerName.addEventListener("blur", onlyLetters);
    
    // Display input field if they select "other" for Address Type
    
    var selection = document.deliveryLocation.addressType; // alternative syntax to document.getElementById("addressType") using form name attribute
    selection.addEventListener("change", function () {
        if (document.getElementById("other").selected) {
            var other = document.getElementById("addressType2");
            other.setAttribute("class", "form-group indent");
            document.deliveryLocation.otherAddressType.focus();
        }     
    });
      
} // end of init

window.addEventListener("load", init);