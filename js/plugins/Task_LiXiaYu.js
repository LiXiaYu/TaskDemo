//=============================================================================
// Task_LiXiaYu.js
//=============================================================================
//"use strict";//严格模式，node.js的es6？？？

var Task=window.Task||{};

Task.Task=function(){
    var id=0;
    var title="";
    var description="";
    var variables={};

    var init=function(self){

    };

    var begin=function(self){

    };

    var ifFinish=function(self){return false;};

    var end=function(self){

    };

    this.createByData=function(taskData){
        id=taskData.id;
        title=taskData.title;
        description=taskData.description;
        
        init=taskData.init;
        begin=taskData.begin;
        ifFinish=taskData.ifFinish;
        end=taskData.end;
    };


    this.Init=function(){
        return init(this);
    }
    this.Begin=function(){
        return begin(this);
    }
    this.IfFinish=function(){
        return ifFinish(this);
    }
    this.End=function(){
        return end(this);
    }


    this.Id=function(id){
        if(id!==null)
        {
            id=id;   
        }
        return id;
    }
    this.Title=function(){
        return title;
    }
    this.Description=function(description){
        if(description!==null)
        {
            description=description;   
        }
        return description;
    }


    this.getVariables=function(key){
        return variables[key];
    }
    this.setVariables=function(key, value){
        variables[key]=value;
    }
    this.Variables=function(){
        return variables;
    }


    this.getState=function(){
        return this.getVariables("state");
    }
    this.setState=function(state){
        return this.setVariables("state",state);
    }
    this.getAvaliable=function(){
        return this.getVariables("avaliable");
    }
    this.setAvaliable=function(avaliable){
        return this.setVariables("avaliable",avaliable);
    }

}
//Task.Task.prototype.constructor=Task.Task;
