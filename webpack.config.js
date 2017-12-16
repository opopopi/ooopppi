// 这个配置文件使用node的语法来编写, 因为webpack工具自身是用node开发出来的
// 该配置文件, webpack要求我们对外暴漏一个配置对象
const path = require('path');
const htmlWP = require('html-webpack-plugin');

module.exports = {

    //配置打包入口
    entry: path.resolve(__dirname, './src/main.js'),

    //配置输出
    output: {
        path: path.resolve(__dirname, './dist'),//打包后文件目录
        filename: 'bundle.js'//打包后文件名
    },

    //插件配置
    plugins: [
        //html处理
        new htmlWP({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],

    //模块配置
    module: {
        //这里配置loader
        rules: [
            //添加css模块处理，css-loader的作用是打包css，style-loader的作用是执行css
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },

            //添加less模块的处理
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },

            //添加静态资源
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                //use:['url-loader']
                use: [
                    {
                        loader: 'url-loader',
                        //小于10kb的文件转换为base64打包，大的文件不打包，可以通过name属性设起新的名字
                        options: {
                            limit: 10240, name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            },

            //添加js模块的处理，把js转换为es5
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude:/node_modules/
            },
            
            // vue模块
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },

    // webpack-dev-server的配置
    devServer: {
        open: true,         // 服务启动后自动打开浏览器
        port: 8888,         // 服务端口
        contentBase: 'dist' // 开启服务的目录
    }
}