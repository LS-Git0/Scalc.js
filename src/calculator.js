$(document).ready(function (){

    $(function(){ // Do not remove this function

        $("body").on("keypress", function(e){

            var str = '';
            var key = '';

            if( e.keyCode ){
                key = e.keyCode;
            }
            else
            {
                key = e.which;
            }

            str = String.fromCharCode(key);

            $(".btn" + key).css({
                "box-shadow": "inset rgba(0,0,0,0.5) 0px 2px 8px",
                "background-image": "-moz-linear-gradient(top, #2f2f2f 0%, #363636 100%)",
                "background-image": "-webkit-linear-gradient(top, #2f2f2f 0%, #363636 100%)",
                "background-image": "linear-gradient(top, #2f2f2f 0%, #363636 100%)"
            });

            var str_0_9 = str.replace(/[^0-9]/g,'');

            if( str == ',' ){
                str = '.';
            }

            if( str_0_9 || str == '/' || str == '*' || str == '-' || str == '+' || str == '.' || str == '%' ){

                if( str == '/' ){
                    $(".screen").append('&divide;');
                }
                else
                {
                    $(".screen").append(str);
                }

                $(".outcome").val($(".outcome").val() + str);

                str = '';
            }
            else

            // Tab
            if( key == '8' ){
                str = $(".screen").html();
                str = str.substr(0, str.length - 1);
                $(".screen").html(str);
                $(".outcome").val(str);
            }
            else

            // Enter
            if( key == '13' ){
                $(".outcome").val(eval($(".outcome").val()));
                $(".screen").html(eval($(".outcome").val()));
            }
            else

            // Esc
            if( key == '27' ){
                $(".outcome").val("");
                $(".screen").html("");
            }
        });

        $(".val").click(function(e){

            e.preventDefault();
            var a = $(this).attr("href");
            var s = a;
            if( a == '/' ){
                s = '&divide;';
            }

            $(".screen").append(s);
            $(".outcome").val($(".outcome").val() + a);
        });

        $(".equal").click(function(){
            $(".outcome").val(eval($(".outcome").val()));
            $(".screen").html(eval($(".outcome").val()));
        });

        $(".clear").click(function(){
            $(".outcome").val("");
            $(".screen").html("");
        });
    });

    $(document).keyup(function(e) {
        $("li a").css({"box-shadow": "", "background-image": ""});
    });
});
