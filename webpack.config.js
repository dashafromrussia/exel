const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports =(env, argv)=>{
  console.log(argv.mode) // опред режим сборки
  const isProd = argv.mode === 'production'
  const isDev = !isProd

  const filename = (ext) =>
  isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`
  const plugins =()=>{
    const base=[new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })]
    if (isDev) {
      base.push(new ESLintPlugin())
    }
    return base
  }

  return {
    target: 'web', // для автоматич перезагрузки стр..без него не раб
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: './index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: filename('js'),
      clean: true // для чистки папки дист,чтобы не было захламленности
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src', 'core'),
      }
    },
    devServer: {
      port: '3000',
    // open:true, //браузер будет открыв автоматом// watchContentBase:true,
    // для автоматич перезагрузки ,когда сделаны изменения
    // hot:true //но не обновл штмл..все остальное обновляется
    },
    plugins: plugins(),
    devtool: isDev ? 'source-map':false,
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/, // не переводит эту папку на ecs5
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    }
  }
}
/* const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports={
    context:path.resolve(__dirname, "src"), //полный путь до папки src
    entry:{
      main:"./index.js" //точка входа..находимся в папке src
    },
    output:{ //выходн файл
      path: path.resolve(__dirname,"dist"), //куда будет генерироваться
      filename: '[name].bundle.js'
      // name будет подставл автоматич,если будет несколько точек входа,
      // то и будет неск бандлов
      // когда запстим сборку будет main.bundle.js
    },
    resolve:{
        //path/file.js
        //path/file
        extensions:['.js','.json'] //для удобного импорта
    },
    alias:{ //Для того чтобы не писать длинный путь, а попадать сразу в срс
    "@": path.resolve(__dirname, 'src'),
    "@core": path.resolve(__dirname, 'src', 'core')
    },
    plugins: [new HtmlWebpackPlugin({
        template: './index.html'
    }),
    new CopyPlugin({
        patterns: [
          { from:path.resolve(__dirname,"src",'favicon.ico'),
          to:path.resolve(__dirname, 'dist') },
          //откуда куда копируем при запуске
        ],
      }),
      new MiniCssExtractPlugin({
          filename:"[name].bundle.css"
/* Этот плагин извлекает CSS в отдельные файлы.
Он создает файл CSS для каждого файла JS, который содержит CSS.*/
/* })
],
module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
            MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
}*/
