
/*
 * Because the createToolbar method might already exist we can use a namespace
 * Javascript does't support the namespace concept but we can use a generic object 
 * so this generic object we will call oojs
 * 
 * We must also verify if the oojs doesn't already exist
 * If exist, we must append our functionality to it or if it doesn't we must return a new object
 * with those functionalities
 */

var oojs = (function (oojs) {

    var createToolbarItems = function (itemElements) {
        var items = [];
	
	
	
        /**
         * itemElements is the context
         * It is just a node list. It is not an array
         * In pseudocode, the logic is this way: 
         * 
         * itemElements.foreach(function(element, index, array){
         * 
         * });
         * 
         * element is the resulted element from iteration
         * index is the index that occupies in the items array (items array is the mapped array over the itemElements)
         * array is the array that is being traversed (iterated)
         */
	

        [].forEach.call(itemElements, function (el, index, array) {
            
	  
	  /*
	   * The item object is the object generated for every element in items array
	   */
	  
            var item = {
                toggleActiveState: function () {
                    this.activated = !this.activated;
                }
            };

            Object.defineProperties(item, {
                el: {
                    value: el
                },
                enabled: {
                    get: function () {
                        return !this.el.classList.contains("disabled");
                    },
                    set: function (value) {
                        if (value) {
                            this.el.classList.remove("disabled");
                        } else {
                            this.el.classList.add("disabled");
                        }
                    }
                },
                activated: {
                    get: function () {
                        return this.el.classList.contains("active");
                    },
                    set: function (value) {
                        if (value) {
                            this.el.classList.add("active");
                        } else {
                            this.el.classList.remove("active");
                        }
                    }
                }

            });


            items.push(item);

        });


        return items;
    };

    oojs.createToolbar = function (elementId) {
        var element = document.getElementById(elementId);
        var items = element.querySelectorAll(".toolbar-item");

        return {
            items: createToolbarItems(items)
        };
        
    };

    return oojs;
}(oojs || {}));




/*

// Pseudocode

var toolbar = oojs.createToolbar("myToolbar");

var toolbarItem = toolbar.items[0];


// Here to achieve the same functionality we have to declare two methods for the toolbarItem object

toolbarItem.setEnabled(true); // or false
toolbarItem.getEnabled();

// Here we have to declare just one property for the object to achieve same result
// We use less memory space and is more easy to read and mantain the code

toolbarItem.enabled = true; // or false
var enabled = toolbarItem.enabled;

*/