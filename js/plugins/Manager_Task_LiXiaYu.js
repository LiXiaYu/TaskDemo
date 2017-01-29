//=============================================================================
// Task_LiXiaYu.js
//=============================================================================
//"use strict";//严格模式，node.js的es6？？？

Task.Manager=function(){
    var tasks=[null];
    this.TasksList=function(){
        return tasks;
    }

    this.loadTaskFile=function(){
        tasks=[null];
        for(var i=1;i<Task.Tasks.length;i++)
        {
            var rtask=new Task.Task();
            rtask.createByData(Task.Tasks[i]);
            tasks.push(rtask);
            tasks[tasks.length-1].setVariables("state","Unrecive");
            tasks[tasks.length-1].setVariables("avaliable",true);
            tasks[tasks.length-1].Init();
        }
    }
    this.getState=function(id){
        if(id<tasks.length)
        {
            return tasks[id].getState();
        }
    }
    this.setState=function(id,state){
        if(id<tasks.length)
        {
            tasks[id].setState(state);
        }
    }
    this.getAvaliable=function(id){
        if(id<tasks.length)
        {
            return tasks[id].getAvaliable();
        }
    }
    this.setAvaliable=function(id,avaliable){
        if(id<tasks.length)
        {
            tasks[id].setAvaliable(avaliable);
        }
    }
    this.CheckIfFinish=function(){
        for(var i=1;i<tasks.length;i++)
        {
            if(this.getState(i)==="Ongoing")
            {
                if(tasks[i].IfFinish())
                {
                    this.setState(i,"Submitable");
                }
            }
        }
    }
    this.Recive=function(id){
        if(this.getState(id)==="Unrecive"&&this.getAvaliable(id)===true)
        {
            tasks[id].setVariables("avaliable",false);
            tasks[id].Begin();
            this.setState(id,"Ongoing");
        }
    }
    this.Submit=function(id){
        if(this.getState(id)==="Submitable")
        {
            this.setState(id,"Finished");
            tasks[id].End();
        }
    }
};
//Task.Manager.prototype.constructor=Task.Manager;



//窗口，监视用
Task.Manager._Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function (){
    Task.Manager._Scene_Map_createAllWindows.call(this);
    this.addChild(new Task.Manager.Window());
};

//创建窗口
Task.Manager.Window = function (){
    //创建构造函数
    this.initialize.apply(this, arguments);
};

//继承Window_Base所有属性
Task.Manager.Window.prototype = Object.create(Window_Base.prototype);
Task.Manager.Window.prototype.constructor = Task.Manager.Window;

//窗口中初始化的数据
Task.Manager.Window.prototype.initialize = function (){
    var x = this.posX();
    var y = this.posY();
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.opacity = this.windowOpacity();
};
//窗口位置X
Task.Manager.Window.prototype.posX = function (){
    return 50;
};
//窗口位置Y
Task.Manager.Window.prototype.posY = function (){
    return 50;
};
//窗口宽度
Task.Manager.Window.prototype.windowWidth = function (){
    return 650;
};
//窗口高度
Task.Manager.Window.prototype.windowHeight = function (){
    return 100;
};
//窗口不透明度
Task.Manager.Window.prototype.windowOpacity = function (){
    return 100;
};
//需要刷新的内容
Task.Manager.Window.prototype.update = function (){
    if (this.needUpdate())
    {
        this.contents.clear();
        //Task.manager.CheckIfFinish();
        this.show();
    };
};

Task.Manager.Window.prototype.show = function (){
    this.contents.fontSize = 24;
    this.contents.clear();
    var y=4;
    this.drawText("Task", 4, y, 40, 40, 1);
    y+=20;
    for(var i=1;i<Task.manager.TasksList().length;i++)
    {
        if(Task.manager.getState(i)!=="Unrecive")
        {
            this.drawText(Task.manager.TasksList()[i].Title()+" : "+Task.manager.TasksList()[i].getState(),4,y,400,40,1);
            y+=20;
        }
    }
};

Task.Manager.Window.prototype.needUpdate = function (){
    return true;
};

//监视者，监视任务的变化，对Scene_Base的update做了改变
Task.Manager.Monitor={};
/*//继承Window的写法，弃用  
    Task.Manager.Monitor=function(){
        this.initialize.apply(this, arguments);
    };
    Task.Manager.Monitor.prototype=Object.create(Window.prototype);
    Task.Manager.Monitor.prototype.initialize = function(x, y, width, height) {
        Window.prototype.initialize.call(this);
        //this.loadWindowskin();
        //this.move(x, y, width, height);
        //this.updatePadding();
        //this.updateBackOpacity();
        //this.updateTone();
        //this.createContents();
        //this._opening = false;
        //this._closing = false;
        //this._dimmerSprite = null;
    };
*/
Task.Manager.Monitor.update=Scene_Base.prototype.update;
Scene_Base.prototype.update=function(){
    var result=Task.Manager.Monitor.update.call(this);

    if(Task.manager!==null)
    {
        Task.manager.CheckIfFinish();
    }

    return result; 
};

////    //存档 读档
    Task.Manager.SaveGame = DataManager.saveGame;
    DataManager.saveGame = function(savefileId) {
        Task.Manager.onSave();
        ///以上 存档前

        var result=Task.Manager.SaveGame.call(this, savefileId);

        return result;
    };

    Task.Manager.LoadGame = DataManager.loadGame;
    DataManager.loadGame = function(savefileId) {
        var result=Task.Manager.LoadGame.call(this, savefileId);

        ///以下 读档后
        Task.Manager.onLoad();

        return result;
    };

    Task.Manager.onSave=function(){
        var tasks=Task.manager.TasksList();
        var objtasks={};
        for(var i=1;i<tasks.length;i++)
        {
            objtasks["task"+i]={};
            var vs=tasks[i].Variables();
            for(var value in vs)
            {
                objtasks["task"+i][value]=vs[value];
            }
        }
        var str = JSON.stringify(objtasks);
        console.log(str);
        $gameVariables.setValue(20,str);
    };
    Task.Manager.onLoad=function(){
        var str=$gameVariables.value(20);
        var objtasks;
        if(str!=""&&str!=null)
        {
            objtasks= JSON.parse(str);  
        }
        var tasks=Task.manager.TasksList();
        for(var i=1;i<tasks.length;i++)
        {
            var vs=tasks[i].Variables();
            for(var value in objtasks["task"+i])
            {
                vs[value]=objtasks["task"+i][value];
            }
        }
        //deepCompareCopy(objtasks,Task.manager.TasksList());
    };
////
////    //深拷贝
var deepCompareCopy= function(source,target) { 
    if(source instanceof Array)
    {
        for(var i=0;i<source.length;i++)
        {
            if(i>=target.length)
            {
                target.push(source[i]);
            }
            console.log(source);
            console.log(i);
            if(typeof source[i]==="object")
            {
                    deepCompareCopy(source[i],target[i]);
            }
            else
            {
                target[i]=source[i];
            }
        }
    }
    else
    {
        for (var key in source) {
            if(source[key]===null)
            {
                continue;
            }
            if(typeof source[key]==="object")
            {
                    deepCompareCopy(source[key],target[key]);
            }
            else
            {
                target[key]=source[key];
            }
        } 
    }
    
};
////
Task.manager=new Task.Manager();
Task.manager.loadTaskFile();