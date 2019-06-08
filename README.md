# toast
一个js原生的toast,可能对ie6以下不友好
#可以传入3个参数，内容，类型，存在的时间
## 内容：3-7个字最好
## 类型：警告:warn;成功:successful;失败：fail;默认：default;（默认没有图标哦）
## 存在时间：Number，如果不设置就是2000ms
## 使用方法：
## var totast = new Toast("发送到","fail",1000)//实例化
## //提供了两个回调函数，分别是show的时候，和hidden时候，hidden可以省略
'totast.show(function(){
      console.log("开始了");
     })
   totast.hidden(function(){
       console.log("结束了");
     })'
