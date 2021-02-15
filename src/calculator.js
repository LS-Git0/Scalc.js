/**
 * Basic calculator
 *
 * @author     Sambrax
 * @copyright  2021 Sambrax
 * @license    MIT License
 */
function calculator() {
    $(function () {
        var shadow = {
                "box-shadow": "inset rgba(0,0,0,0.5) 0px 2px 8px",
                "background-image": "-moz-linear-gradient(top, #2f2f2f 0%, #363636 100%)",
                "background-image": "-webkit-linear-gradient(top, #2f2f2f 0%, #363636 100%)",
                "background-image": "linear-gradient(top, #2f2f2f 0%, #363636 100%)"};
        $("#calculator").html('<div class="container"><div class="calculator"><div class="screen"></div><input type="hidden" value=""><ul><li><a href="c">C</a></li><li><a href="%">&#37;</a></li><li><a href="/">&#247;</a></li><li><a href="*">&#215;</a></li><li><a href="7">7</a></li><li><a href="8">8</a></li><li><a href="9">9</a></li><li><a href="-">-</a></li><li><a href="4">4</a></li><li><a href="5">5</a></li><li><a href="6">6</a></li><li><a href="+">+</a></li><li><a href="1">1</a></li><li><a href="2">2</a></li><li><a href="3">3</a></li><li><a href="=" class="equal tall">=</a></li><li><a href="0" class="wide shift">0</a></li><li><a href="." class="shift">.</a></li></ul></div></div>');
        $(this).keypress(function (e) {
            var char = "";
            var key  = (e.which) ? e.which : e.keyCode;
            char = String.fromCharCode(key);
            $('#calculator a[href="' + char + '"]').css(shadow);
            char = char.replace(/[^0-9\/\*\-\+\.\%]/g, ""); // Allowed characters 0-9 / * - + . %
            if (char) {
                if (char === "/") {
                    $("#calculator .screen").append("&divide;");
                } else {
                    $("#calculator .screen").append(char);
                }
                $('#calculator input[type="hidden"]').val($('#calculator input[type="hidden"]').val() + char);
                char = "";
            } else if (key === 13) { // Enter
                $('#calculator input[type="hidden"]').val(eval($('#calculator input[type="hidden"]').val()));
                $("#calculator .screen").html(eval($('#calculator input[type="hidden"]').val()));
            }
        });
        $("#calculator a").click(function (e) {
            e.preventDefault();
            var a = $(this).attr("href");
            var s = a;
            if (a === "=") { // Enter
                $('#calculator input[type="hidden"]').val(eval($('#calculator input[type="hidden"]').val()));
                $("#calculator .screen").html(eval($('#calculator input[type="hidden"]').val()));
            } else if (a === "c") { // Esc
                $('#calculator input[type="hidden"]').val("");
                $("#calculator .screen").html("");
            } else {
                if (a === "/") {
                    s = "&divide;";
                }
                $("#calculator .screen").append(s);
                $('#calculator input[type="hidden"]').val($('#calculator input[type="hidden"]').val() + a);
            }
        });
        $(this).keydown(function (e) {
            var key = (e.which) ? e.which : e.keyCode;
            if (key === 27) { // Esc
                $('#calculator a[href="c"]').css(shadow);
            } else if (key === 13) { // Enter
                $('#calculator a[href="="]').css(shadow);
            }
        });
        $(this).keyup(function (e) {
            $("#calculator li a").css({"box-shadow": "", "background-image": ""});
            var key = (e.which) ? e.which : e.keyCode;
            if (key === 27) { // Esc
                $('#calculator input[type="hidden"]').val("");
                $("#calculator .screen").html("");
            } else if (key === 8) { // Tab
                var char = $("#calculator .screen").html();
                char = char.substr(0, char.length - 1);
                $("#calculator .screen").html(char);
                $('#calculator input[type="hidden"]').val(char);
            }
        });
    });
}
