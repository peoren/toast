;(function(){
    /*
    *   
    *   @param (string) content 内容 可选
    *   @param (string) type 种类 可选 successfull fail warn default
    *   @param (string) time 持续时间 可选 manual
    *   函数思路是通过异步队列比同步队列靠后，完成hidden和show的回调函数接收，再通过await保证hidden的函数最后执行，这里也可以用回调完成
    *   不过为了看起来更容易理解用await完成
    *   by Peoren Email:hjw_ready@163.com
    */
    var hiddenCallBack;
    var showCallBack;
    var timer;
    function Toast(content = "这是toast",type = 'default',time = 2000){
        this.time = time
        this.type = type
        // 创建容器
        this.container = document.createElement("div")
        this.container.setAttribute("id","toast")
        // 放置内容  
        this.container.innerHTML =`<span id="${type}_img"></span><span id="toast_main">${content}</span>` 
        // 设为隐藏
        this.container.style.opacity = 0;
        // 设置种类
        switch(this.type){
            case "successful":
                this.container.style.backgroundColor = "#a1df46"
                break;
            case "fail":
                this.container.style.backgroundColor = "#c20505"
                break;
            case "warn":
                this.container.style.backgroundColor = "#dbc603"
                break;
            default:        
                this.container.style.backgroundColor = "#000"
        }
        document.getElementsByTagName("body")[0].appendChild(this.container)

    }
    // show方法,传入回调函数，并且将回调函数放入showCallBack方便调用
    //调用doIt进行整个过程
    Toast.prototype.show = function(callBack = function(){}){
        showCallBack = callBack
        doIt.apply(this)

    }
     // hidden方法,传入回调函数，并且将回调函数放入showCallBack方便调用
    Toast.prototype.hidden =function(callBack = function(){}){

            hiddenCallBack = callBack

    }
    
    // 完成整个的显现和隐藏
    function showAndHidden(){
       if(timer != undefined){
           clearTimeout(timer)
       } 
        // 显示这个弹窗
        this.container.style.opacity = 1

      return new Promise((resolve)=>{
          //必须要传入resolve，因为await是等待一个promise状态执行完成
        timer=setTimeout(function(){
        this.container.style.opacity = 0
                   resolve()
                }.bind(this),(this.time))/* 这里需要改变this的指向*/
                
      })
    }
    //为了完成开始和结束的回调所以需要统一控制状态，所以用await来控制
    async function doIt(){
            showCallBack()
      await showAndHidden.apply(this)/* 这里需要改变this的指向,并且自行执行一次*/
            hiddenCallBack() 
    }
    // 挂到window上去
    window.Toast = Toast
})()
