const path = require('path');

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader',
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [
                  require("autoprefixer")()
                ],
              },
            },
            'sass-loader',
          ],
        include: [
          path.resolve(__dirname, "node_modules/bootstrap/dist/css/bootstrap.min.css") // Inclure le dossier Bootstrap
        ]
      }
    ]
  },
  // ...
};
