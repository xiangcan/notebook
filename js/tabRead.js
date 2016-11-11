

define(['jquery'],function() {

    function TabRead(id) {
        if($('.'+id)) {
            $btn = $('.'+id);
            this.init();

        }
    }

    $.extend(TabRead.prototype,{
        init: function() {
            var ikey = true;
            var str,scroll;

            $btn.on('click',function() {
                var contentBox = $(this).siblings('p').eq(0);

                if(ikey) {
                    scroll = $(window).scrollTop();
                    str = contentBox.html();
                    // 加载对应文章
                    contentBox.load('../article/'+contentBox.attr('data-main')+'.html');
                    $(this).html('已阅');

                    // 给浮动按钮添加定位
                    $(this).addClass('back-top');
                    var left = contentBox.offset().left + contentBox.outerWidth()-$(this).outerWidth()-10;
                    $(this).css({
                        'left':left,
                     });

                    ikey = false;
                }else {
                    contentBox.html(str);
                    $(this).html('阅读全文');
                    ikey = true;
                    $(this).removeClass('back-top');

                    $(window).scrollTop(scroll);
                }
                return false;
            });
        }
    });
    return TabRead;
});