# javascript概述

## 程序语言

* 基础逻辑处理部分
  * 变量 数据类型  (数据存储)
  * 分支和循环运算符     (逻辑操作)
for(变量=初始值;变量<=结束值;变化值){
	
}

  * 函数(对语言的扩展)
```javascript
var vr=1;      //Number
var vr='123';  //string
var vr=true;   //Boolean
var vr=[1,2,3] //Array
var vr={a:1,b:2}//Object
var vr=function(){} //Function
var vr=undefined 
var vr=null

### 运算符
+ - * / %
=== !== > < >= <=
&& || !


### 分支语句

```javascript
if()
if()else
if()else if()else if()
switch(x){
	case 1;
	break;
	case 2;
	break;
	default:
	break
}

### 循环语句

```javascript
for(var i=0,k=12;i<100;i++){
	
}
while(){
	
}
do{
	
}while()

### 函数

```javascript
function xx(){
	
}
var fn=function(){
	// arguments
}
fn(a,b)
```

//数组的常用方法
//字符串中的常用方法
//函数对象中的方法 bind apply call
//对象的增删改查 原型链
//数字对象身上的方法 toFixed()
//Math对象身上的方法

function A(){
	this.x=c;
}
A.prototype.console=function(){
	console.log(this.x);
}
var obj=new A(2);
obj.console();

```

## 针对特定用途的部分
  > 当js来浏览器运行的那一刻
  > 浏览器会创建一个window对象
  > window对象中很多属性和方法
  > 这些属性和方法不用加 window. 就可以使用

dom对象 dom集合

### 选取元素
* var el=document.getElementById()
* var el=document.getElementsByTagName()
* var el=document.getElementsByClassName()
* var el=document.getElementsByTagName("*")
* var el=document.getElementsByName()

### 筛选元素
* el.nextSibling
* el.previousSibling

### 操作样式
* el.sytle.color='red';

### 获取位置信息
* 

### 操作属性
* el.className
* el.id
* el.
### 节点操作
* el.parentNode;          //获取父节点的引用
* el.childNodes;          //获取子节点的引用
* el.createElement()      //创建元素节点
* 
### 其他

* 针对特定用途的部分
* 
* 

```javascript
var a=23;
var c=function(){
	console.log(3)
}
```javascript
var num=2;
