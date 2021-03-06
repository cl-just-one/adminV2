React16+React-Router4 企业级电商后台管理系统(使用手册)
======
1. 首先，需安装Node@8.11.4、Vue@2.9.3、yarn1.16.0、Webpack@3.10.0
2. 项目需连接网络，因有CDN文件引入，执行 yarn add, 安装依赖包
3. 然后执行yarn run dev, 打开页面http://localhost:8089/
------
# 学习笔记
### 页面加载过程
1、浏览器查找域名对应的IP地址<br/>
2、浏览器根据IP地址与服务器建立socket连接<br/>
3、浏览器与服务器通信：浏览器请求，服务器处理请求和响应<br/>
4、浏览器与服务器断开连接
### let和var区别
let、var定义变量，const定义常量。<br/>
1、let不存在变量提示<br/>
2、let有块级作用域<br/>
3、let不能重复声明<br/>
### cookie、localStorage和sessionStorage区别
1、cookie在浏览器请求中每次都会附加请求头中发送给服务器。用户代理(一般值浏览器)所实现的大小最少要到达4096字节(感谢@lulianqi15的指正)<br/>
2、localStorage保存数据会一直保存没有过期时间，不会随浏览器发送给服务器。大小5M或更大<br/>
3、sessionStorage仅当前页面有效一旦关闭就会被释放。也不会随浏览器发送给服务器。大小5M或更大<br/>
### 路由：页面路由/Hash路由/H5路由
1、页面路由<br/>
  ```
  window.location.href = 'http://www.baidu.com';
  history.back();
  ```
2、Hash 路由<br/>
  ```
  window.location = '#hash';
  window.onhashchange = function(){
      console.log('current hash:', window.location.hash);
  }
  ```
3、H5 路由
  ```
  // 推进一个状态
  history.pushState('name', 'title', '/path');
  // 替换一个状态
  history.replaceState('name', 'title', '/path');
  // popstate
  window.onpopstate = function(){
      console.log(window.location.href);
      console.log(window.location.pathname);
      console.log(window.location.hash);
      console.log(window.location.search);
  }
  ```
### React-Router属性之exact
exact是Route下的一个属性，react路由会匹配到所有能匹配到的路由组件，<br/>exact能够使得路由的匹配更严格一些。<br/>
exact的值为bool型，为true时表示严格匹配，为false时为正常匹配。
例子如下：<br/>
```
<Route path='/' component={Home} />
<Route path='/page' component={Page}>
//这种情况下，如果匹配路由path='/page'，那么会把Home也会展示出来。
//既路由path='/page'会匹配路由path='/'和路由path='/page'
```
所以我们常常会添加exact来解决上述问题。
```
<Route exact path='/' component={Home} />
<Route path='/page' component={Page} />
//这样匹配路由path='/page'，只会匹配到Page组件
```
### encodeURI()和encodeURIComponent()区别
1、encodeURI()<br/>
它着眼于对整个URL进行编码，因此除了常见的符号以外，对其他一些在网址中有特殊含义的符号“; / ? : @ & = + $ , ' #”，也不进行编码。编码后，它输出符号的utf-8形式，并且在每个字节前加上%。<br/>
2、encodeURIComponent()<br/>
该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。<br/>
其他字符（比如 ：;/?:@&=+$,# 这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的。
