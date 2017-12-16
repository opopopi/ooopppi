import Vue from 'vue';  // 路径不加./与../, 那么就会去node_modules里面找

import AppComponent from './component/App.vue'; // 导入根组件

// 使用了es6模块导入vue的方式后, 我们就不能在视图中写模版了, 同时new Vue的时候也不能写template
// 因为在这种模式下, 导入进来的vue, 不会在浏览器中编译模版
// 只会在我们打包的时候编译, 且打包的时候只能编译vue文件中的模版
new Vue({
    el: '#app',
    render(createElement) {
        return createElement(AppComponent)
        // render: c => c(AppComponent)
    }
});
