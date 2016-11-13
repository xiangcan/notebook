

define(['jquery'],function($) {

    function TabRead(id) {
        if($('.'+id)) {
            $btn = $('.'+id);
            this.init();

        }
    }

    $.extend(TabRead.prototype,{
        init: function() {
            var scroll;

            $btn.on('click',function() {
                var $contentBox = $(this).siblings('.panel-content').eq(0);
                var that = $(this);

                // 如果pre为空执行
                if(!this.pre) {
                    scroll = $(window).scrollTop();
                    this.pre = $contentBox.html();
                    // 加载对应文章
                    $.get('article/'+$contentBox.attr('data-main')+'.txt',function(data) {
                        $contentBox.html(data);
                        // this指向ajax对象
                        that.html('已阅');

                        // 给浮动按钮添加定位
                        that.addClass('back-top');
                        var left = $contentBox.offset().left + $contentBox.outerWidth() - that.outerWidth() -10;
                        that.css({
                            'left':left,
                         });
                        ikey = false;
                    });
                }else {
                    $contentBox.html(this.pre);
                    that.html('阅读全文');
                    ikey = true;
                    that.removeClass('back-top');
                    $(window).scrollTop(scroll);
                    this.pre = '';
                }
            return false;
            });
        }
    });
    return TabRead;
});