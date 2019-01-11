/* eslint no-console: 0 */
import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import colors from 'colors';

fs.readFile(path.join(__dirname, '../index.html'), 'utf8', (err, markup) => {
  if (err) {
    return console.log(colors.red(`write index.html error: ${err}`));
  }

  const $ = cheerio.load(markup);

  $('head').prepend('<link rel="preload" href="style.css" as="style" />');
  $('head').prepend('<link rel="stylesheet" href="style.css">');

  fs.writeFile(path.join(__dirname, '../../dist/index.html'), $.html(), 'utf8', (e) => {
    if (e) {
      return console.log(e);
    }
    console.log(colors.green('index.html written to dist'));
    return 0;
  });

  return 0;
});
