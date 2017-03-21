function init() {
    "use strict";
    
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