const path = require('path');

module.exports = {
    entry: './src/view.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: "eval-source-map",
    mode: 'development',
    watch: true,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.js'
      }
    }
};