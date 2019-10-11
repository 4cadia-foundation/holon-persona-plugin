require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');


module.exports = (watch = false) => {
  const module = {
    mode: 'development',
    entry: './app/src/index.js',
    devtool: 'inline-source-map',
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty',
      fs: 'empty',
      path: 'empty',
      child_process: 'empty',
    },
    output: {
      filename: 'main.bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new CopyPlugin([
        { from: path.resolve(__dirname, 'app/src/index.html'), to: path.resolve(__dirname, 'dist') },
      ]),
    ],
    module: {
      rules: [
        // {
        //   enforce: 'pre',
        //   test: path.resolve(__dirname, 'src'),
        //   exclude: [/node_modules/, path.resolve(__dirname, 'config'),
        //  path.resolve(__dirname, 'scripts'), path.resolve('test')],
        //   loader: 'eslint-loader',
        // },
        {
          test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)|\.png($|\?)|\.jpg($|\?)/,
          loader: 'url-loader',
        },
        {
          test: /\.css$/,
          loader: 'style-loader',
        },
        {
          test: /\.css$/,
          loader: 'css-loader',
        },
        {
          test: /\.js$/,
          include: [path.resolve(__dirname, 'app')],
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
            },
          }],
        },
      ],
    },
  };

  if (watch) {
    module.watch = true;
    module.plugins.push(new LiveReloadPlugin());
  }

  return module;
};
