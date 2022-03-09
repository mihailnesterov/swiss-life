const path = require('path'); 
const miniCss = require('mini-css-extract-plugin');
const dotEnv = require('dotenv-webpack')


module.exports = {
    mode: 'production', // production / development
    entry: {
        scripts: path.join(__dirname, 'src', 'index.js'),
    }, 
    output: {        
        path: path.join(__dirname, 'assets'),        
        filename: 'js/investor.min.js'
    },    
    module: {        
        rules: [
            {            
                test: /\.js$/,            
                loader: 'babel-loader',            
                exclude: '/node_modules/'     
            },
            {            
                test:/\.(s*)css$/,
                use: [
                    miniCss.loader,
                    'css-loader',
                    'sass-loader'
                ]      
            }
        ]
    },
    plugins: [
        new miniCss({
            filename: 'css/style.min.css',
        }),
        new dotEnv()
    ]
};