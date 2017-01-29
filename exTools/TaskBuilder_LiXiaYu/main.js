let Template={
    addTaskNull:function(){
        var fs = require("fs");
        var path = require('path');

        var tasksfile = fs.readFileSync("../../js/plugins/Tasks_Task_LiXiaYu.js", "utf8");

        var re = /..tip for taskbuilder add/g

        var re2 = /\{[^}][^]*?end[^]*?\}\s*\}/g
        var tasksString = tasksfile.match(re2);


        ///////////////////////////////
        var newTaskString = '{\r\n        id:1,\r\n        title:"test Task",\r\n        description:"It\'s a test Task, made by TaskBuilder.",\r\n\r\n        init:function(self){\r\n\r\n        },\r\n        \r\n        begin:function(self){\r\n\r\n        },\r\n\r\n        ifFinish:function(self){\r\n            return false;\r\n        },\r\n\r\n        end:function(self){\r\n\r\n        }\r\n    }';

        newTaskString = newTaskString.replace(/id:[0-9]*?,/g, "id:" + (tasksString.length + 1) + ",");
        ///////////////////////////////
        tasksfile = tasksfile.replace(re, ",\r\n" + newTaskString + "//tip for taskbuilder add");

        tasksString = tasksfile.match(re2);

        fs.writeFileSync("../../js/plugins/Tasks_Task_LiXiaYu.js", tasksfile, "utf8");

    },
    addTaskKillEnemyNumber:function(taskTitle, taskDescription, enemyId, enemyTotalNumber){
        var fs = require("fs");
        var path = require('path');

        var tasksfile = fs.readFileSync("../../js/plugins/Tasks_Task_LiXiaYu.js", "utf8");

        var re = /..tip for taskbuilder add/g;

        var re2 = /\{[^}][^]*?end[^]*?\}\s*\}/g;
        var tasksString = tasksfile.match(re2);

        //如果已经存在同名任务，则放弃添加
        var reee=new RegExp('"title:"' + taskTitle + '"',"g");
        if(reee.test(tasksString)===true)
        {
            return;
        }
        ////////////////////////////
        var newTaskString = '{\r\n        id:' + (tasksString.length + 1) + ',\r\n        title:"' + taskTitle + '",\r\n        description:"' + taskDescription + '",\r\n\r\n        init:function(self){\r\n            self.setVariables("KillEnemyTotalNumber",' + enemyTotalNumber + ');\r\n            self.setVariables("KillEnemyNumber",0);\r\n            self.setVariables("KillEnemyId",' + enemyId + ');\r\n        },\r\n\r\n        begin:function(self){\r\n\r\n            Task.Module.KillEnemyNumberTask.BMpvFunctions.push(function(){\r\n                for(var i=0;i<$gameTroop._enemies.length;i++)\r\n                {\r\n                    if($gameTroop._enemies[i]._enemyId===self.getVariables("KillEnemyId"))\r\n                    {\r\n                        self.setVariables("KillEnemyNumber",self.getVariables("KillEnemyNumber")+1);\r\n                    }\r\n                }\r\n            });\r\n\r\n        },\r\n\r\n        ifFinish:function(self){\r\n            //如果杀掉的敌人 数大于要求的敌人总数\r\n            if(self.getVariables("KillEnemyNumber")>=self.getVariables("KillEnemyTotalNumber"))\r\n            {\r\n                return true;\r\n            }\r\n        },\r\n\r\n        end:function(self){\r\n            //给队伍第一个人加经验\r\n            $gameActors.actor(1).changeExp($gameActors.actor(1).currentExp() + 500,false);\r\n            //将任务设置为不可接受，虽然默认设置过，但为了保险，再手动来一遍\r\n            Task.manager.setAvaliable(2,false);\r\n            //self.setVariables("avaliable",false);\r\n        }\r\n    }';

        tasksfile = tasksfile.replace(re, ",\r\n" + newTaskString + "//tip for taskbuilder add");
        //////////////////////////////
        tasksString = tasksfile.match(re2);

        fs.writeFileSync("../../js/plugins/Tasks_Task_LiXiaYu.js", tasksfile, "utf8");

    }

};

let PluginCommandList={
    Add:function(attributes,parameters){
        if(attributes["type"]==="Null")
        {
            Template.addTaskNull();
        }
        else if(attributes["type"]==="KillEnemyNumber")
        {
            Template.addTaskKillEnemyNumber(parameters["taskTitle"],parameters["taskDescription"],parameters["enemyId"],parameters["enemyTotalNumber"]);
        }
    }
};

let main = function () {

    var fs = require("fs");
    var path = require('path');

    var tasksfile = fs.readFileSync("../../js/plugins/Tasks_Task_LiXiaYu.js", "utf8");

    var re = /..tip for taskbuilder add/g

    var re2 = /\{[^}][^]*?end[^]*?\}\s*\}/g
    var tasksString = tasksfile.match(re2);

    Template.addTaskNull = function () {
        var fs = require("fs");
        var path = require('path');

        var tasksfile = fs.readFileSync("../../js/plugins/Tasks_Task_LiXiaYu.js", "utf8");

        var re = /..tip for taskbuilder add/g

        var re2 = /\{[^}][^]*?end[^]*?\}\s*\}/g
        var tasksString = tasksfile.match(re2);
////////////////////////////////////////////////////
        var newTaskString = '{\r\n        id:1,\r\n        title:"test Task",\r\n        description:"It\'s a test Task, made by TaskBuilder.",\r\n\r\n        init:function(self){\r\n\r\n        },\r\n        \r\n        begin:function(self){\r\n\r\n        },\r\n\r\n        ifFinish:function(self){\r\n            return false;\r\n        },\r\n\r\n        end:function(self){\r\n\r\n        }\r\n    }';

        newTaskString = newTaskString.replace(/id:[0-9]*?,/g, "id:" + (tasksString.length + 1) + ",");
///////////////////////////////////////////////////
        tasksfile = tasksfile.replace(re, ",\r\n" + newTaskString + "//tip for taskbuilder add");

        tasksString = tasksfile.match(re2);

        fs.writeFileSync("../../js/plugins/Tasks_Task_LiXiaYu.js", tasksfile, "utf8");
    };
    Template.addTaskKillEnemyNumber = function (taskTitle, taskDescription, enemyId, enemyTotalNumber) {
        var newTaskString = '{\r\n        id:' + (tasksString.length + 1) + ',\r\n        title:"' + taskTitle + '",\r\n        description:"' + taskDescription + '",\r\n\r\n        init:function(self){\r\n            self.setVariables("KillEnemyTotalNumber",' + enemyTotalNumber + ');\r\n            self.setVariables("KillEnemyNumber",0);\r\n            self.setVariables("KillEnemyId",' + enemyId + ');\r\n        },\r\n\r\n        begin:function(self){\r\n\r\n            Task.Module.KillEnemyNumberTask.BMpvFunctions.push(function(){\r\n                for(var i=0;i<$gameTroop._enemies.length;i++)\r\n                {\r\n                    if($gameTroop._enemies[i]._enemyId===self.getVariables("KillEnemyId"))\r\n                    {\r\n                        self.setVariables("KillEnemyNumber",self.getVariables("KillEnemyNumber")+1);\r\n                    }\r\n                }\r\n            });\r\n\r\n        },\r\n\r\n        ifFinish:function(self){\r\n            //如果杀掉的敌人 数大于要求的敌人总数\r\n            if(self.getVariables("KillEnemyNumber")>=self.getVariables("KillEnemyTotalNumber"))\r\n            {\r\n                return true;\r\n            }\r\n        },\r\n\r\n        end:function(self){\r\n            //给队伍第一个人加经验\r\n            $gameActors.actor(1).changeExp($gameActors.actor(1).currentExp() + 500,false);\r\n            //将任务设置为不可接受，虽然默认设置过，但为了保险，再手动来一遍\r\n            Task.manager.setAvaliable(2,false);\r\n            //self.setVariables("avaliable",false);\r\n        }\r\n    }';

        tasksfile = tasksfile.replace(re, ",\r\n" + newTaskString + "//tip for taskbuilder add");
    };
    //Template.addTaskNull();

    //console.log(tasksfile);
    tasksString = tasksfile.match(re2);

    fs.writeFileSync("../../js/plugins/Tasks_Task_LiXiaYu.js", tasksfile, "utf8");
};

module.exports.PluginCommandList = PluginCommandList;