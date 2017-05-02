// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y) {
    this.x = x;
	this.y = y;
    this.sprite = 'images/enemy-bug.png';
	//给每次实例出的敌人对象初始化一个随机速度
	this.speed = Math.random()*400+50;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
	this.x += dt * this.speed ;
	//敌人穿过屏幕后循环出现
	if(this.x >= 505) this.x = -101;
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//碰撞函数，通过检测敌人和玩家的距离让玩家复位。
var checkCollisions = function(){
	allEnemies.forEach(function(enemy) {
        var x_dis = Math.abs(enemy.x - player.x);
		var y_dis = Math.abs(enemy.y - player.y);
			if (x_dis < 43 && y_dis < 43) {
			player.x = 204;
			player.y = 390;
			}
    });
};
	

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x, y){
	this.x = x;
	this.y = y;
	this.sprite = 'images/char-horn-girl.png';
};

//定义一个全局变量进行计时，确保让玩家到达对面河岸后片刻才弹出胜利提示，随后马上复位
var count = 0;
Player.prototype.update = function(){
	if (player.y < 58) {
		count++;
		if (count%4 ===2){
	    alert("Congratulation! You win!");
		player.x = 204;
		player.y = 390;
		count = 0;
		}
	}
	//玩家移动不能超出左、右和底部边缘。
	if (player.x < 0) player.x += 101;
	if (player.x >= 507) player.x -= 101;
	if (player.y > 390) player.y -= 83;
};

//玩家的渲染函数，用来在屏幕上画出玩家
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//接收键盘点击事件返回的关键数字，玩家进行相应的移动
Player.prototype.handleInput = function(movement){
	switch(movement){
		case 'left': this.x -= 101; break;
		case 'up': this.y -= 83; break;
		case 'right': this.x += 101; break;
		case 'down': this.y += 83; break;
	}
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
//实例出3个敌人对象，分别在三行，在x轴的初始位置一样，移动速度不同
var allEnemies = [];
for (var i=0; i<3; i++){
	var EnemyBugs = new Enemy(-101, 60 + 83*i);
	allEnemies.push(EnemyBugs);
}

//实例化一个玩家在画布正中间底部
var player = new Player(204, 390);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
