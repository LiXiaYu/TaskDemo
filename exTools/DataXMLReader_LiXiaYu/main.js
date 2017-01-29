let fs=require("fs");
let path = require('path'); 
let DOMParser = require('xmldom').DOMParser;

let loadXML = function(xmlString){
    let domParser;
    let xmlDoc;
    try{
        /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
         * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
         * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
         * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
         */
        domParser = new DOMParser();
        xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
    }catch(e)
    {
        console.log(e);
    }

    return xmlDoc;

};

let redreg=/<DataXMLReader[^]*<\/DataXMLReader>/g;
let testFile=fs.readFileSync("test.json","utf8");


let PluginsList={"Task":"../TaskBuilder_LiXiaYu/main.js"};


let xmlDoc=loadXML("<?xml version='1.0' encoding='utf-8' ?>"+testFile.match(redreg)[0]);
let plugins=xmlDoc.getElementsByTagName("Plugin");




//对每个插件分别解析
for(let i=0;i<plugins.length;i++)
{
    //获取插件的名字
    let name=plugins[i].getAttribute('name');
    let pluginJS=require(PluginsList[name]);

    for(let j=0;j<plugins[i].childNodes.length;j++)
    {
        let command=plugins[i].childNodes[j].nodeName;

        for(let k=0;k<plugins[i].childNodes[j].childNodes.length;k++)
        {
            let attributes={};
            for(let l=0;l<plugins[i].childNodes[j].childNodes[k].attributes.length;l++)
            {
                console.log(attributes);
                console.log(plugins[i].childNodes[j].childNodes[k].attributes[l].nodeValue);
                attributes[plugins[i].childNodes[j].childNodes[k].attributes[l].nodeName]=plugins[i].childNodes[j].childNodes[k].attributes[l].nodeValue;
            }
            let paraments={};
            for(let l=0;l<plugins[i].childNodes[j].childNodes[k].childNodes.length;l++)
            {
                paraments[plugins[i].childNodes[j].childNodes[k].childNodes[l].nodeName]=plugins[i].childNodes[j].childNodes[k].childNodes[l].childNodes[0].nodeValue;
            }

            pluginJS.PluginCommandList[command](attributes,paraments);
        }
        //console.log(command);
        //pluginJS.PluginCommandList[command]({},{});
    }
}