/**
 * Scalc.js - Basic calculator
 *
 * @author     Sambrax
 * @copyright  2021 Sambrax
 * @license    MIT License
 */
function scalc(options = {}) {
    /*
    | -------------------------------------------------------------------------
    | Calculator options
    | -------------------------------------------------------------------------
    |
    | calculator({
    |   draggable: false
    | });
    | -------------------------------------------------------------------------
    */
    window.onload = function () {
        var calculator = document.getElementById("calculator");
        /*
        | ---------------------------------------------------------------------
        | Calculator structure
        | ---------------------------------------------------------------------
        */
        calculator.innerHTML = `
          <div id="container">
            <div id="draggable">
              <div id="window">
                <div id="display"></div>
                <ul>
                  <li><a href="Escape">C</a></li>
                  <li><a href="%">%</a></li>
                  <li><a href="/">/</a></li>
                  <li><a href="*">*</a></li>
                  <li><a href="7">7</a></li>
                  <li><a href="8">8</a></li>
                  <li><a href="9">9</a></li>
                  <li><a href="-">-</a></li>
                  <li><a href="4">4</a></li>
                  <li><a href="5">5</a></li>
                  <li><a href="6">6</a></li>
                  <li><a href="+">+</a></li>
                  <li><a href="1">1</a></li>
                  <li><a href="2">2</a></li>
                  <li><a href="3">3</a></li>
                  <li><a href="Enter" class="equal">=</a></li>
                  <li><a href="0" class="zero">0</a></li>
                  <li><a href="." class="dot">.</a></li>
                </ul>
              </div>
            </div>
          </div>`;
        /*
        | ---------------------------------------------------------------------
        | Options
        | ---------------------------------------------------------------------
        */
        if (options.draggable !== false) {
            var $draggable = function () {
                var container = calculator.querySelector("#container");
                return {
                    resize : function () {
                        var width = window.innerWidth ||
                               document.documentElement.clientWidth ||
                               document.body.clientWidth ||
                               document.body.offsetWidth;
                        var height = window.innerHeight ||
                               document.documentElement.clientHeight ||
                               document.body.clientHeight ||
                               document.body.offsetHeight;
                        container.style.width  = width  + "px";
                        container.style.height = height + "px";
                    },
                    move : function (divid, xpos, ypos) {
                        divid.style.left = xpos + "px";
                        divid.style.top  = ypos + "px";
                    },
                    startMoving : function (divid, evt) {
                        container.style.cursor = "url('cursor/move.svg'),auto";
                        evt = evt || window.event;
                        var posX     = evt.clientX,
                            posY     = evt.clientY,
                            divTop   = divid.style.top,
                            divLeft  = divid.style.left,
                            eWi      = parseInt(divid.style.width),
                            eHe      = parseInt(divid.style.height),
                            cWi      = parseInt(container.style.width),
                            cHe      = parseInt(container.style.height);
                            divTop   = divTop.replace("px", "");
                            divLeft  = divLeft.replace("px", "");
                        var diffX    = posX - divLeft,
                            diffY    = posY - divTop;
                        document.onmousemove = function (evt) {
                            evt = evt || window.event;
                            var posX = evt.clientX,
                                posY = evt.clientY,
                                aX   = posX - diffX,
                                aY   = posY - diffY;
                            if (aX < 0) aX = 0;
                            if (aY < 0) aY = 0;
                            if (aX + eWi > cWi) aX = cWi - eWi;
                            if (aY + eHe > cHe) aY = cHe - eHe;
                            $draggable.move(divid, aX, aY);
                        }
                    },
                    stopMoving : function () {
                        var a = document.createElement("script");
                        container.style.cursor = "default";
                        document.onmousemove = function () {};
                    },
                    init : function () {
                        $draggable.resize();
                        window.onresize = function () {
                            $draggable.resize();
                        };
                        var element = calculator.querySelector("#draggable");
                        element.onmousedown = function (e) {
                            // Proportional to the size of the #window div
                            this.style.width  = "480px";
                            this.style.height = "560px";
                            $draggable.startMoving(this, e);
                        };
                        document.onmouseup = function () {
                            $draggable.stopMoving();
                        };
                    }
                }
            }();
            $draggable.init();
        }
        /*
        | ---------------------------------------------------------------------
        | Add/Remove Classes
        | ---------------------------------------------------------------------
        */
        var css_class = "button-pressed";
        var hasClass  = function (el, className) {
            if (el.classList) {
                return el.classList.contains(className);
            } else {
                var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
                return !!el.className.match(reg);
            }
        };
        var addClass = function (el, className) {
            if (el.classList) {
                el.classList.add(className);
            } else if (!hasClass(el, className)) {
                el.className += " " + className;
            }
        };
        var removeClass = function (el, className) {
            if (el.classList) {
                el.classList.remove(className);
            } else if (hasClass(el, className)) {
                var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
                el.className=el.className.replace(reg, " ");
            }
        };
        /*
        | ---------------------------------------------------------------------
        | Calculation memory and display screen
        | ---------------------------------------------------------------------
        */
        var display = calculator.querySelector("#display");
        var memory  = "";
        /*
        | ---------------------------------------------------------------------
        | Clean the screen
        | ---------------------------------------------------------------------
        */
        var reset = function () {
            memory = "";
            display.innerHTML = "";
        };
        /*
        | ---------------------------------------------------------------------
        | Insert a character on the screen
        | ---------------------------------------------------------------------
        */
        var insert = function (char) {
            if (char === "/") {
                display.innerHTML += "&divide;";
            } else {
                display.innerHTML += char;
            }
            memory += char;
        };
        /*
        | ---------------------------------------------------------------------
        | Triggers the operation
        | ---------------------------------------------------------------------
        */
        var total = function () {
            memory = eval(memory) || 0;
            display.innerHTML = memory || "";
        };
        /*
        | ---------------------------------------------------------------------
        | Selects the button specified by the "href" attribute
        | ---------------------------------------------------------------------
        */
        var button = function (key) {
            return calculator.querySelector('a[href="' + key + '"]');
        };
        /*
        | ---------------------------------------------------------------------
        | Mouse events
        | ---------------------------------------------------------------------
        */
        var tag = calculator.getElementsByTagName("a");
        for (var i=0; i < tag.length; i++) {
            button(tag[i].getAttribute("href")).onclick = function (e) {
                e.preventDefault();
                var key = this.getAttribute("href");
                if (key === "Enter") {
                    total();
                } else if (key === "Escape") {
                    reset();
                } else {
                    insert(key);
                }
            };
            button(tag[i].getAttribute("href")).onmousedown = function (e) {
                e.preventDefault();
                addClass(this, css_class);
            };
            button(tag[i].getAttribute("href")).onmouseup = function (e) {
                e.preventDefault();
                removeClass(this, css_class);
            };
        }
        /*
        | ---------------------------------------------------------------------
        | Keyboard events
        | ---------------------------------------------------------------------
        */
        var $key = function (e) {
            if (e.key) {
                return e.key;
            } else {
                return String.fromCharCode(e.which || e.keyCode);
            }
        };
        document.body.onkeypress = function (e) {
            e.preventDefault();
            // Allowed characters 0-9 / * - + . %
            var char = $key(e).replace(/[^0-9\/\*\-\+\.\%]/g, "");
            if (char) {
                insert(char);
            }
        };
        document.body.onkeydown = function (e) {
            var key = $key(e);
            var el  = button(key);
            if (el) {
                addClass(el, css_class);
            }
            if (key === "Enter") {
                total();
            } else if (key === "Escape") {
                reset();
            }
        };
        document.body.onkeyup = function (e) {
            var key = $key(e);
            var el  = button(key);
            if (el) {
                removeClass(el, css_class);
            }
            if (key === "Backspace") {
                var char = display.innerHTML;
                char = char.substr(0, char.length - 1);
                display.innerHTML = char;
                memory = char;
            }
        }
    };
}
