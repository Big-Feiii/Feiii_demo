window.onload = function() {
	var container = document.getElementById('container');
	var list = document.getElementById('list');
	var buttons = document.getElementById('buttons').getElementsByTagName('span');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	//	用来存放当前显示的是第几张图片,或者说是显示第几个小圆点
	var index = 1;
	var animated = false;
	var timer; //定义定时器
	function showBtn() {
		for (var i = 0; i < buttons.length; i++) {
			if (buttons[i].className == 'on') {
				buttons[i].className = '';
				break;
			}
		}
		buttons[index - 1].className = 'on';
	}
	//箭头切换
	function animate(offset) {
		animated = true;
		var newLeft = parseInt(list.style.left) + offset;
		var time = 300; //位移走总时间
		var interval = 10; //位移间隔时间
		var speed = offset / (time / interval); //每次位移量
		function go() {
			if ((speed < 0 && parseInt(list.style.left) > newLeft) || (speed > 0 && parseInt(list.style.left) < newLeft)) { //如果小于0，向左移动，left是不是大于目标值newLeft
				list.style.left = parseInt(list.style.left) + speed + 'px';
				setTimeout(go, interval); //interval秒以后，运行go函数
			} else {
				animated = false;
				list.style.left = newLeft + 'px';
				//		判断
				if (newLeft > -600) {
					list.style.left = -3000 + 'px';
				}
				if (newLeft < -3000) {
					list.style.left = -600 + 'px';
				}
			}
		}
		go();
	}
	//		设置自动播放
	function play() {
		timer = setInterval(function() {
			next.onclick()
		}, 3000);
	};
	//清除自动播放
	function stop() {
		clearInterval(timer);
	}
	//	    添加一个事件绑定箭头
	next.onclick = function() {
		if (index == 5) {
			index = 1;
		} else {
			index += 1;
		}
		//     	取到left值,点击右箭头图片向左移动
		index + 1;
		showBtn();
		if (!animated) {
			animate(-600);
		}
	};
	prev.onclick = function() {
		if (index == 1) {
			index = 5;
		} else {
			index -= 1;
		}
		//     	取到left值,点击右箭头图片向右移动
		index - 1;
		showBtn();
		if (!animated) {
			animate(600);
		}
	};
	//	为原点加事件
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = function() {
			//      		当在当前页点击当前按钮的时候，不会执行函数
			if (this.className == 'on') {
				return;
			}
			var myIndex = parseInt(this.getAttribute('index'));
			//      		算出每次点击小圆点的偏移量
			var offset = -600 * (myIndex - index);
			if (!animated) {
				animate(offset);
			}
			index = myIndex;
			showBtn();
		}
	}
	container.onmouseover = stop;
	container.onmouseout = play;
};