/*:
 * @plugindesc 一个消息推送小脚本
 * @author 季寒
 *
 * @help
 * ======================================================================
 * Msgpush 推送消息
 * $gameTemp.msgpush(text,color);
 * ======================================================================
 */

// ======================================================================
// * Scene_Base
// ======================================================================
Scene_Base.prototype.JH_Msgpush_old_updateChildren = Scene_Base.prototype.updateChildren;
Scene_Base.prototype.updateChildren = function() {
    this.JH_Msgpush_old_updateChildren();
    if($gameTemp!==null)
	{
		$gameTemp.updatemsgpush();
	}
};
// ======================================================================
// * JH_Msgpush
// ======================================================================
function JH_Msgpush() {this.initialize.apply(this, arguments);}
JH_Msgpush.prototype.initialize = function(text, color) {
	this.time = 0;
	this.movey = 0;
	this._Sprite = new Sprite();//放文字
	this._Sprite.x = 0;
	this._Sprite.y = 170;
	this._Sprite2 = new Sprite();//放背景图片
	this._Sprite2.x = 0;
	this._Sprite2.y = 170;
    this._Sprite2.bitmap = Bitmap.load("js/plugins/msgbg.png");
	this._Sprite.bitmap=new Bitmap(Graphics.boxWidth, 36);
	this._Sprite.bitmap.textColor = color;
	this._Sprite.bitmap.fontSize = 14;
	var width = this._Sprite.bitmap.measureTextWidth(text) + 12;
	// this._Sprite.bitmap.fillRect(0, 170, 300, 36, 'rgba(0, 0, 0, 0.4)');
	//this._Sprite.bitmap.fillRect(0, 170, 300, 36, color);
	this._Sprite.bitmap.drawText(text, 0, 0, width, 24, 'center');
	SceneManager._scene.addChild(this._Sprite2);
	SceneManager._scene.addChild(this._Sprite);
};
JH_Msgpush.prototype.up = function() {
	this.movey += 36;
};
JH_Msgpush.prototype.update = function() {
	this.time ++;
	if(this.time >= 120){
		this._Sprite.alpha -= 1/120;
		this._Sprite2.alpha -= 1/120;
	}
	if(this.movey > 0){
		this.movey --;
		this._Sprite.y ++;
		this._Sprite2.y ++;
	}
};
JH_Msgpush.prototype.finish = function() {
	return (this.time >= 520 + 150);
};
// ======================================================================
// * Game_Temp
// ======================================================================
Game_Temp.prototype.JH_Msgpush_old_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    this.JH_Msgpush_old_initialize();
    this._msgpushlist = [];
};
Game_Temp.prototype.msgpush = function(text, color) {
    this.allmsgpushmove();
    this._msgpushlist.push(new JH_Msgpush(text, color));
};
Game_Temp.prototype.allmsgpushmove = function() {
    for(var i = 0;i < this._msgpushlist.length;i++){
		this._msgpushlist[i].up();
	}
};
Game_Temp.prototype.updatemsgpush = function() {
    for(var i = 0;i < this._msgpushlist.length;i++){
		this._msgpushlist[i].update();
		if(this._msgpushlist[i].finish()){
			this._msgpushlist.splice(i,1);
			i--;
		}
	}
};