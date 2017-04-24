import path from 'path';

const config = {
  entry: {
    js: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'src', 'static', 'js'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, 'src'),
        use: {
          loader: 'babel-loader',

            query: {
                cacheDirectory: 'babel_cache',
                presets: ['react', 'es2015','stage-2']
            },

          // options: 'cacheDirectory=.babel_cache',
        },
      },
        {test: /\.json$/, loader: "json-loader"},
        { test: /\.css$/, loader: "style-loader!css-loader?importLoaders=1" },
        { test: /\.woff(2)?(\?v=[0-9]+\.[0-9]+\.[0-9]+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]+\.[0-9]+\.[0-9]+)?$/, loader: "file-loader" },
        { test: /\.(png|jpg|jpeg)(\?v=[0-9]+\.[0-9]+\.[0-9]+)?$/, loader: "file-loader" }
    ],
  },
  plugins: [],
};

export default config;
