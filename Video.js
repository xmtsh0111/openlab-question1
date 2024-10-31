//获取相应的标签
	var playBtn=document.getElementById("start");
	var video=document.getElementById("vd");
	var pg=document.getElementById("pb");
	var currenttime=document.getElementById("crtime");
 	var totaltime=document.getElementById("tttime");
	var go=document.getElementById("go");
	var back=document.getElementById("back");
	var mute=document.getElementById("mute");
	var sc=document.getElementById("select");
	var volume=document.getElementById("vl");
	var ok=document.getElementById("ok"); 
	var text=document.getElementById("text");
	var download=document.getElementById("download");
	var a=document.createElement("a");



//当start按钮被点击时发挥作用
	playBtn.addEventListener("click", function()
	{
//如果视频在暂停状态，则播放视频
		if(video.paused){
		   	video.play();
			playBtn.innerHTML=";"
		}
//如果视频在播放状态，则停止播放
		else{
			video.pause();
			playBtn.innerHTML="4"
		}
	}
);




//点击快进键视频向前五秒
	go.addEventListener("click",function()
		{video.currentTime=video.currentTime+5
	}
);




//点击后退键视频向后五秒
	back.addEventListener("click",function()
		{video.currentTime=video.currentTime-5
	}
);

	



//设置音量的打开与关闭
mute.addEventListener("click",function()
		{
		if(video.muted){
		   	video.muted=false;
			mute.innerHTML="U";
		}
		else{
			video.muted=true;
			mute.innerHTML="V";
		}
		}
);
   
	
	
//设置本地视频文件的选择，同时若在播放视频时选择新视频，选择完成后改变播放按钮状态	
sc.addEventListener('change', function() {  
		var file = this.files[0];  
		if (file) {  
			var reader = new FileReader();  
			reader.onload = function() {   
				var url = URL.createObjectURL(file);  
				video.src = url;  
				};  
		reader.readAsDataURL(file);  
		}
		playBtn.innerHTML="4"
});

//实现进度条进度与视频进度的契合
pg.addEventListener('input', function(e) {
  		video.currentTime = video.duration * (e.target.value / 100);
});
//选择视频播放后进度条自动回到开头
video.addEventListener("loadedmetadata", function () {
       pg.value = 0;
   });
//随着时间更新进度条也随之变化
video.addEventListener("timeupdate", function () {
		var progress= (video.currentTime / video.duration) * 100;
       	pg.value = progress; 	       
});
	

	
//实现拖动进度条来完成对音量的控制
volume.addEventListener('input', function () {
  video.volume = this.value;
});



//将视频的当前时长在进度条前显示出来
video.addEventListener('timeupdate', function () {
  	let currentTime = formatTime(video.currentTime);
    currenttime.textContent = currentTime;
   });
//将视频的总时长在进度条前显示出来
   video.addEventListener('loadedmetadata', function () {
       let totalTime = formatTime(video.duration);
       totaltime.textContent = totalTime;
   });
//视频时长的默认单位为秒，完成秒与分钟和小时的转化
   function formatTime(time) {
	   let hours=Math.floor(time/3600)
       let minutes = Math.floor((time%3600)/60);
       let seconds = Math.floor(time%60);
       return hours+':'+minutes + ':' + (seconds < 10? '0' + seconds : seconds);
   }

	//实现倍速
	ok.addEventListener("click", function() {
		video.playbackRate=text.value;
	});

//视频下载
download.addEventListener("click",function(){
	var videosrc=video.src;
	fetch(videosrc)
		.then (response=>response.blob())
		.then (blob=>{
			var url1 = URL.createObjectURL(blob);
			a.href = url1;
            a.download = "download.mp4";
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url1);
		});
});











