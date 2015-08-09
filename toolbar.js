
/**
 * Because the createToolbar method might already exist we can use a namespace
 * Javascript does't support the namespace concept but we can use a generic object 
 * so this generic object we will call oojs
 * 
 * We must also verify if the oojs doesn't already exist
 * If exist, we must append our functionality to it or if it doesn't we must return a new object
 * with those functionalities
 */

var oojs = (function(oojs) {

    // Create single element in Toolbar
    // @itemElement a single "span"
    var ToolbarItem = function (itemElement) {
        Object.defineProperty(this, "__el", {
            value : itemElement
        });
    };

    // Define properties of single element
    // Here we extend the the ToolbarItem Constructor
    Object.defineProperties(ToolbarItem.prototype, {
        toggleActiveState : {
            value : function () {
                this.activated = ! this.activated;
            },
            enumerable : true
        },
        enabled : {
            get : function () {
                return ! this.__el.classList.contains("disabled");
            },
            set : function (value) {
                if (value) {
                    this.__el.classList.remove("disabled");
                } else {
                    this.__el.classList.add("disabled");
                }
            },
            enumerable : true
        },
        activated : {
            get : function () {
                return this.__el.classList.contains("active");
            },
            set : function (value) {
                if (value) {
                    this.__el.classList.add("active");
                } else {
                    this.__el.classList.remove("active");
                }
            },
            enumerable : true
        }
    });


    // Define collection of toolbar element
    // @itemElements collection of "span"
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


            /**
             * The item object is the object generated for every element in items array
             */


            var item = new ToolbarItem(el);

            items.push(item);
        });

        return items;
    };

    // Define Toolbar
    // @toolbarElement a single "div"
    var Toolbar = function (toolbarElement) {

        var items = toolbarElement.querySelectorAll(".toolbar-item");

        Object.defineProperties(this, {
            __el : {
                value : toolbarElement
            },
            items : {
                value : createToolbarItems(items),
                enumerable : true
            }
        });
    };

    // Define properties of Toolbar
    Object.defineProperties(Toolbar.prototype, {
        add : {
            value : function (options) {
                var span = document.createElement("SPAN");
                span.className = "toolbar-item";

                this.__el.appendChild(span);

                var item = new ToolbarItem(span);

                this.items.push(item);
            },
            enumerable: true
        },
        remove : {
            value : function (index) {
                var len = this.items.length;

                if (index > len || index < 0) {
                    throw new Error("Index is out of range");
                }

                var item = this.items[index];
                this.items.splice(index, 1);

                this.__el.removeChild(item.__el);

                item = null;
            },
            enumerable : true
        },
        appendTo : {
            value : function (parentElement) {
                parentElement.appendChild(this.__el);
            },
            enumerable : true
        }
    });

    // Define Toolbar.
    oojs.createToolbar = function(elementId) {
        var element = document.getElementById(elementId);

        if (! element) {
            element = document.createElement("DIV");
            element.id = elementId;
            element.className = "toolbar";
        }

        return new Toolbar(element);
    };

    return oojs;

})(oojs || {});

/**
 * Pseudocode
 *
 * var toolbar = oojs.createToolbar("myToolbar");
 * var toolbarItem = toolbar.items[0];
 *
 * Approach 1
 *
 * Here to achieve the same functionality we have to declare two methods for the toolbarItem object
 * toolbarItem.setEnabled(true); // or false
 * toolbarItem.getEnabled();
 *
 * Approach 2 (better)
 *
 * Here we have to declare just one property for the object to achieve same result
 * We use less memory space and is more easy to read and mantain the code
 * toolbarItem.enabled = true; // or false
 * var enabled = toolbarItem.enabled;
 * /

/**
 * How to test at browser console
 *
 * var toolbar = oojs.createToolbar("myToolbar");
 * toolbar.appendTo(document.body);
 * toolbar.add();
 * toolbar.add();
 * toolbar.add();
 * toolbar.remove(1);
 * toolbar.items[0].enabled = false;
 * toolbar.items[0].enabled = true;
 * toolbar.items[0].activated = true;
 * toolbar.items[0].activated = false;
 * toolbar.items[0].toggleActiveState();
 */
