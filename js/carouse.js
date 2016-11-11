

define(['jquery'],function($) {

    function Carouse(id) {
        this.oList = $('#'+id);
        this.aLi = this.oList.children();

        this.init();

    }

    var i =0;
    $.extend(Carouse.prototype,{
        init: function() {
            var This = this;
            // 只能传函数名，而不是调用，所以this作为构造函数变量
            setInterval(function() {
                This.play();
            },5000);
        },
        play: function() {
            // 被定时器调用，注意this指向
            if(i == 3) {
                i=0;
            }
            this.aLi.eq(i).fadeIn(2000).siblings().fadeOut(2000);
            i++;
        },
    });

    return {
        Carouse:Carouse
    };
}

);