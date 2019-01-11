/* eslint no-console: 0 */
import colors from 'colors';
import webpack from 'webpack';
import config from '../../webpack.config.prod';

process.env.NODE_ENV = 'production';

console.log(colors.blue('Generating minified bundle for production via webpack'));

webpack(config).run((err, stats) => {
  if (err) {
    console.log(colors.bold.red(err));
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(colors.red(error)));
  }

  if (jsonStats.hasWarnings) {
    return jsonStats.errors.map(warning => console.log(colors.yellow(warning)));
  }

  console.log(`Webpack status: ${stats}`);
  console.log(colors.green('Build completed!'));
  return 0;
});
