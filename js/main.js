

require.config({
    paths : {
        "jquery" : ["jquery-1.10.2.min"]
    }
});


require(['jquery','carouse','type','tabRead'],function($,Carouse,Autotype,TabRead) {

    // 轮播图
    new Carouse.Carouse('listBg');
    // code直播图
    new Autotype('codeBox');
    // 点击阅读图
    new TabRead('btnRead');

    // 搜索框
    var btnInp = $('#btnInput');
    var btnResult = $('#btnResult');
    btnInp.on('click',function() {
        btnResult.toggle();
        return false;
    });
    $(document).on('click',function() {
        btnResult.hide();
    });

    // 获取时间
    var iTime;
    setInterval(function() {
        var nTime = new Date();
        var iYear = nTime.getFullYear();
        var iMoth = nTime.getMonth()+1;
        var iDay = nTime.getDate();
        var week = nTime.getDay();
        iDay<9?'0'+iDay:iDay;

        if(week ==0) week="星期日";
        if(week ==1) week="星期一";
        if(week ==2) week="星期二";
        if(week ==3) week="星期三";
        if(week ==4) week="星期四";
        if(week ==5) week="星期五";
        if(week ==6) week="星期六";       ;

        iTime = iYear+'年'+iMoth+'月'+iDay+'日 '+week;
        $('#navTime').html(iTime);
        console.log(1);
    },1000);


});