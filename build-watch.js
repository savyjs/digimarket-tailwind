const build = require('./build');
const chokidar = require('chokidar');

const watcher = chokidar.watch(__dirname + '/src', {
    ignored: __dirname + '/src/all.css', // ignore dotfiles
    persistent: true,
});
build();
const log = console.log.bind(console);
// Add event listeners.
watcher
    .on('change', path => {
        log(`File ${path} has been changed`);
        build();
    })
    .on('unlink', path => {
        log(`File ${path} has been removed`);
        build();
    });
