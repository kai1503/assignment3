window.yx={
	g:function(name){
		return document.querySelector(name);
	},
	ga:function(name){
		return document.querySelectorAll(name);
	},
	addEvent:function(obj,ev,fn){
		if(obj.addEventListener){
			obj.addEventListener(ev,fn);
		}else{
			obj.attachEvent('on'+ev,fn);
		}
	},
	removeEvent:function(obj,ev,fn){
		if(obj.removeEventListener){
			obj.removeEventListener(ev,fn);
		}else{
			obj.detachEvent('on'+ev,fn);
		}
	},
	getTopValue:function(obj){		//获取元素离html的距离
		var top=0;
		while(obj.offsetParent){
			top+=obj.offsetTop;
			obj=obj.offsetParent;
		}
		
		return top;
	},
	cutTime:function(target){	//倒计时
		var currentDate=new Date();
		var v=Math.abs(target-currentDate);
		
		return {
			d:parseInt(v/(24*3600000)),
			h:parseInt(v%(24*3600000)/3600000),
			m:parseInt(v%(24*3600000)%3600000/60000),
			s:parseInt(v%(24*3600000)%3600000%60000/1000)
		};
	},
	format:function(v){		
		return v<10?'0'+v:v;
	},
	formatDate:function(time){
		var d=new Date(time);
		return d.getFullYear()+'-'+yx.format(d.getMonth()+1)+'-'+yx.format(d.getDate())+' '+yx.format(d.getHours())+':'+yx.format(d.getMinutes());
	},
	parseUrl:function(url){		
		var reg=/(\w+)=(\w+)/ig;
		var result={};
		
		url.replace(reg,function(a,b,c){
			result[b]=c;
		});
		
		return result;
	},
	public:{
		navFn:function(){		
			var nav=yx.g('.nav');
			var lis=yx.ga('.navBar li');
			var subNav=yx.g('.subNav');
			var uls=yx.ga('.subNav ul');
			var newLis=[];			
			for(var i=1;i<lis.length-3;i++){
				newLis.push(lis[i]);
			}
			
			for(var i=0;i<newLis.length;i++){
				newLis[i].index=uls[i].index=i;
				newLis[i].onmouseenter=uls[i].onmouseenter=function(){
					newLis[this.index].className='active';
					subNav.style.opacity=1;
					uls[this.index].style.display='block';
				};
				newLis[i].onmouseleave=uls[i].onmouseleave=function(){
					newLis[this.index].className='';
					subNav.style.opacity=0;
					uls[this.index].style.display='none';
				};
			}
			
			yx.addEvent(window,'scroll',setNavPos);
			setNavPos();
			var top=nav.offsetTop;		
			function setNavPos(){
				//nav.id=window.pageYOffset>nav.offsetTop?'navFix':'';
				nav.id=window.pageYOffset>top?'navFix':'';
			}
		},
		
		lazyImgFn:function(){		
			yx.addEvent(window,'scroll',delayImg);
			delayImg();
			function delayImg(){
				var originals=yx.ga('.original');		
				var scrollTop=window.innerHeight+window.pageYOffset;		
				
				for(var i=0;i<originals.length;i++){
		
					if(yx.getTopValue(originals[i])<scrollTop){
						originals[i].src=originals[i].getAttribute('data-original');
						originals[i].removeAttribute('class');	
					}
				}
				
				if(originals[originals.length-1].getAttribute('src')!='images/empty.gif'){
					
					yx.removeEvent(window,'scroll',delayImg);
				}
			}
		},
		backUpFn:function(){		
			var back=yx.g('.back');
			var timer;
			back.onclick=function(){
				var top=window.pageYOffset;
				
				timer=setInterval(function(){
					top-=150;
					if(top<=0){
						top=0;
						clearInterval(timer);
					}
					
					window.scrollTo(0,top);
				},16);
			};
		}
	}
}
