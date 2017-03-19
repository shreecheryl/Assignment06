function init() {
    "use strict";
    var selection = document.getElementById("addressType");
    selection.addEventListener("change", function () {
        if (document.getElementById("other").selected) {
            var other = document.getElementById("addressType2");
            other.setAttribute("class", "form-group");
            document.getElementById("otherAddressType").focus();
        }     
    });
    
} // end of init

window.addEventListener("load", init);