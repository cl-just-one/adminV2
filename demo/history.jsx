// 页面路由
window.location.href = "path"

// hash路由
window.location = "#hash"

// 监听hash的改变
window.onhashchange = function (e) {
  console.log(window.location.hash);
  
}

// H5路由 放入历史记录
history.pushState('name', 'Title', 'path')

// H5路由 不放入历史记录
history.replaceState('name', 'Title', 'path')

window.onpopstate = function (e) {
  console.log(e.state);
  console.log(window.location.hash);
  console.log(window.location.pathname);
  console.log(window.location.search);
}