

define(['jquery'],function($) {

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
                var $contentBox = $(this).siblings('.panel-content').eq(0);
                var that = $(this);

                if(ikey) {
                    scroll = $(window).scrollTop();
                    str = $contentBox.html();
                    // 加载对应文章
                    $.get('js/'+$contentBox.attr('data-main')+'.txt',function(data) {
                        $contentBox.html(data);
                        // this指向ajax对象
                        that.html('已阅');

                        // 给浮动按钮添加定位
                        that.addClass('back-top');
                        var left = $contentBox.offset().left + $contentBox.outerWidth() - that.outerWidth() -10;
                        that.css({
                            'left':left
                         });
                        ikey = false;
                    });
                }else {
                    $contentBox.html(str);
                    that.html('阅读全文');
                    ikey = true;
                    that.removeClass('back-top');
                    $(window).scrollTop(scroll);
                }
            });
        }
    });
    return TabRead;
});