
fnLoad();

function fnLoad() {
    var oW = document.getElementById("welcome");
    setTimeout(function() {
        removeClass(oW,'pageShow');

		// 图片轮播
		imgTab();
		fnScore();
    },2000);
}

// 图片轮播
function imgTab(){
	var oTab=document.getElementById("tabPic");
	var oList=document.getElementById("picList");
	var aNav=oTab.getElementsByTagName("nav")[0].children;

	var iNow = 0;									//当前选中元素。
	var iX = 0;										//记录translateX
	var iW = view().w;
	var oTimer = null;
	var iStartX = 0;

	handTab();

	/* 手指滑动图片 */
	function handTab() {
		bind(oTab,"touchstart",fnStart);
		bind(oTab,"touchmove",fnMove);
		bind(oTab,"touchend",fnEnd);

		function fnStart(ev) {
			clearInterval(oTimer);					//滑屏触摸的时候先清除interval函数
			oList.style.transition = "none";		//去除transition处理。防止卡顿.
			ev = ev.changedTouches[0];				//手指按下，手指的列表。
			iStartTouchX = ev.pageX;				//记录手指位置，
			iStartX = iX;							//记录第一次偏移量，移动端额时候回修改偏移值

		}
		function fnMove(ev) {
			ev = ev.changedTouches[0];
			var iDis = ev.pageX - iStartTouchX;		//计算差值。就是手指移动的距离
			iX = iStartX +iDis;						//计算偏移量。
			// 改变图片的偏移值
			oList.style.WebkitTransform =oList.style.transform= "translateX("+iX+"px)";
		}
		function fnEnd(ev) {
			/*iNow = Math.abs(iX/iW);//判断走了多远了。
			iNow = Math.round(iNow);*/

			// iX为负值
			iNow = iX/iW;
			iNow = -Math.round(iNow);

			// 判断极限情况
			if(iNow<0){
				iNow =0;
			}
			if (iNow>aNav.length-1) {
				iNow = aNav.length-1;
			}

			iNow = iNow%aNav.length;				//过界处理
			tab();
			auto();

		}
	}

	/* 图片自动轮播 */
	auto();
	function auto() {
		oTimer=setInterval(function(){
			iNow++;
		// 利用取余进行计算iNow
			iNow=iNow%aNav.length;
			tab();
		},2000);
	}

	function tab() {
		iX=-iNow*iW;
		oList.style.transition="0.5s";
		/* 使用Css3进行偏移 */
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
		for(var i=0;i<aNav.length;i++)
		{
			removeClass(aNav[i],"active");
		}
		addClass(aNav[iNow],"active");
	}
}

// 获取评分数据
function fnScore() {

	// 获取评分数据
	var oScore=document.getElementById("score");
	var aLi=oScore.getElementsByTagName("li");
	var arr=["好失望","没有想象的那么差","很一般","良好","棒极了"];
	for(var i=0;i<aLi.length;i++)
	{
		fn(aLi[i]);
	}

	function fn(oLi) {
		var aNav=oLi.getElementsByTagName("a");
		var oInput=oLi.getElementsByTagName("input")[0];
		for(var i=0;i<aNav.length;i++)
		{
			aNav[i].index=i;
			bind(aNav[i],"touchstart",function(){
				for(var i=0;i<aNav.length;i++)
				{
					if(i<=this.index)
					{
						addClass(aNav[i],"active");
					}
					else
					{
						removeClass(aNav[i],"active");
					}
				}
				oInput.value=arr[this.index];
			});
		}
	}

	// 检查评分是否全部填写
	fnIndex();
}

// 检查评分是否全部填写
function fnIndex() {
	var oIndex=document.getElementById("index");
	var oBtn=oIndex.getElementsByClassName("btn")[0];
	var oInfo=oIndex.getElementsByClassName("info")[0];

	bind(oBtn,"touchend",fnEnd);
	function fnEnd() {
		if(fnScoreChecked())
		{
			if(fnTag())
			{
				fnMask();
			}
			else
			{
				fnInfo(oInfo,"给景区添加标签");
			}
		}
		else
		{
			fnInfo(oInfo,"给景区评分");
		}
	}

	// 检查星级的评价都提交没有
	function fnScoreChecked() {
		var oScore=document.getElementById("score");
		var aInput=oScore.getElementsByTagName("input");
		for(var i=0;i<aInput.length;i++)
		{
			if(aInput[i].value==0) {
				return false;
			}
		}
		return true;
	}
	// 检查标签添加没有
	function fnTag() {
		var oTag=document.getElementById("indexTag");
		var aInput=oTag.getElementsByTagName("input");
		for(var i=0;i<aInput.length;i++)
		{
			if(aInput[i].checked)
			{
				return true;
			}
		}
		return false;
	}
}

// 显示提示语
function fnInfo(oInfo,sInfo) {
	oInfo.innerHTML=sInfo;
	oInfo.style.WebkitTransform="scale(1)";
	oInfo.style.opacity=1;
	setTimeout(function(){
		oInfo.style.WebkitTransform="scale(0)";
		oInfo.style.opacity=0;
	},1000);
}

// 显示蒙版，开始第二页
function fnMask() {
	var oMask=document.getElementById("mask");
	var oIndex=document.getElementById("index");
	var oNew=document.getElementById("news");
	addClass(oMask,"pageShow");

	// 显示背景的动画
	setTimeout(function(){
		oMask.style.opacity=1;
	},14);
	setTimeout(function(){
		oNew.style.transition="0.5s";
		oMask.style.opacity=0;
		oNew.style.opacity=1;
		removeClass(oIndex,'pageShow');
		removeClass(oMask,"pageShow");
		addClass(oNew,'pageShow');
	},2000);

	fnNews();
}

// 新闻页
function fnNews() {
	var oNews=document.getElementById("news");
	var oInfo=oNews.getElementsByClassName("info")[0];
	var aInput=oNews.getElementsByTagName("input");
	aInput[0].onchange=function() {
		if(this.files[0].type.split("/")[0]=="video")
		{
			fnNewsOut();
			this.value="";
		}
		else
		{
			fnInfo(oInfo,"请上传视频");
		}
	};
	aInput[1].onchange=function() {
		if(this.files[0].type.split("/")[0]=="image")
		{
			fnNewsOut();
			this.value="";
		}
		else
		{
			fnInfo(oInfo,"请上传图片");
		}
	};
}
function fnNewsOut() {
	var oNews=document.getElementById("news");
	var oForm=document.getElementById("form");
	addClass(oForm,"pageShow");
	removeClass(oNews,"pageShow");
	formIn();
}

// 提交页
function formIn() {
	var oForm=document.getElementById("form");
	var oOver=document.getElementById("over");
	var aFormTag=document.getElementById("formTag").getElementsByTagName("label");
	var oBtn=oForm.getElementsByClassName("btn")[0];
	var bOff=false;
	for(var i=0;i<aFormTag.length;i++)
	{
		// 选中任何一个标签都可以触发提交按钮
		bind(aFormTag[i],"touchend",function(){
			bOff=true;
			addClass(oBtn,"submit");
		});
	}
	bind(oBtn,"touchend",function(){
		if(bOff)
		{
			// 清空提交页面
			for(var i=0;i<aFormTag.length;i++)
			{
				aFormTag[i].getElementsByTagName("input")[0].checked=false;
			}
			bOff=false;
			addClass(oOver,"pageShow");
			removeClass(oForm,"pageShow");
			removeClass(oBtn,"submit");
			over();
		}
	});
}
// 重新提交页面
function over() {
	var oOver=document.getElementById("over");
	var oBtn=oOver.getElementsByClassName("btn")[0];
	var oIndex = document.getElementById('index');
	bind(oBtn,"touchend",function()
	{
		removeClass(oOver,"pageShow");
		addClass(oIndex,'pageShow');
	});
}

