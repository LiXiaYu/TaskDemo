//=============================================================================
// Tasks_Task_LiXiaYu.js
//=============================================================================
//"use strict";//严格模式，node.js的es6？？？

//=============================================================================
//第一项：null
//其他项：
//  id: 主键（key） 按顺序往下写，调用一般也用它
//  title：标题
//  description：描述
//上面的两个只是字符串，并没有实际功能
//
//下面的是功能函数，当然你也可以不写在这里，而在事件里设置具体实现，但我一般只把对话写在事件里面。
//  init：用于初始化，在系统加载的时候运行
//
//  begin：在接受任务时运行的函数
//
//  ifFinish：判断任务是否可以完成，即是否可以提交
//      返回值
//          true：将会使状态变为Submitable
//          false:将仍然是Ongoing
//
//  end：在任务完成后运行的函数
//
//其中用到了Task里面的variables：实际上是一个空空的{}（对象）
//  使用了setVariables()函数设置变量，这里面的变量都会储存起来（实际上是对象的属性）
//  使用了getVariables()读取变量
//
//默认设置了两个变量"state"和"avaliable"
//  "state":"Unrecive","Ongoing","Submitable","Finished"
//      用于判断任务所处的状态：未接受，进行中，可提交，已完成
//  "avaliable":true,false
//      用于判断任务十分可用，即是否可以接受
//
//  在接受任务后应当将avaliable设置为false
//  在任务结束后如果将avaliable仍旧设置为false，则任务将不可重复
//=============================================================================

Task.Tasks=[
    null,
    {
        id:1,
        title:"test Task",
        description:"It's a test Task, in Tasks which is a task list saved by file.",

        init:function(self){

        },
        
        begin:function(self){

        },

        ifFinish:function(self){
            return false;
        },

        end:function(self){

        }
    },
    {
        id:2,
        title:"How to buy a weapon",
        description:"This is a setp of totural, you need go to shop and buy a Sword.",

        init:function(self){
            //如果要设置要用的变量，最好在init里面加新的，就用set就行
            //Task.manager.setState(2,"Unrecive");
            //Task.manager.setAvaliable(2,true);
            //self.setVariables("state","Unrecive");
            //self.setVariables("avaliable",true);
        },

        begin:function(self){
            //Task.manager.setAvaliable(2,false);
            //self.setVariables("avaliable",false);
            //开始的时候送给主角500块
            $gameParty.gainGold(500);
            
        },

        ifFinish:function(self){
            //如果有了第一个武器（就是sword）
            if($gameParty.hasItem($dataWeapons[1])===true)
            {
                return true;
            }
            else
            {
                return false;
            }
        },

        end:function(self){
            //给队伍第一个人加经验
            $gameActors.actor(1).changeExp($gameActors.actor(1).currentExp() + 500,false);
            //将任务设置为不可接受，虽然默认设置过，但为了保险，再手动来一遍
            Task.manager.setAvaliable(2,false);
            //self.setVariables("avaliable",false);
        }
    }
]