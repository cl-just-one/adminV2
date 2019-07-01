React16+React-Router4 企业级电商后台管理系统(使用手册)
======
1. 首先，需安装Node@8.11.4、Vue@2.9.3、yarn1.16.0、Webpack@3.10.0
2. 项目需连接网络，因有CDN文件引入，执行 yarn add, 安装依赖包
3. 然后执行yarn run dev, 打开页面http://localhost:8089/
------
# 学习笔记
#### 页面加载过程
1、浏览器查找域名对应的IP地址
2、浏览器根据IP地址与服务器建立socket连接
3、浏览器与服务器通信：浏览器请求，服务器处理请求和响应
4、浏览器与服务器断开连接
#### let和var区别
let、var定义变量，const定义常量。
1、let不存在变量提示
2、let有块级作用域
3、let不能重复声明
#### cookie、localStorage和sessionStorage区别
1、cookie在浏览器请求中每次都会附加请求头中发送给服务器。用户代理(一般值浏览器)所实现的大小最少要到达4096字节(感谢@lulianqi15的指正)
2、localStorage保存数据会一直保存没有过期时间，不会随浏览器发送给服务器。大小5M或更大
3、sessionStorage仅当前页面有效一旦关闭就会被释放。也不会随浏览器发送给服务器。大小5M或更大
