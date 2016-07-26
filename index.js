var jsonpointer = require('jsonpointer');

function transform(json, pointer, log, indent) {
  if (typeof indent === 'undefined') {
    indent = '  ';
  }

  // Parse JSON
  var obj = JSON.parse(json);

  // Get value
  if (pointer) {
    obj = jsonpointer.get(obj, pointer);
  }

  // Format object
  return log ? obj : JSON.stringify(obj, null, indent);
}

function example(json, pointer, options) {
  options = options || {};
  var pre = options.pre || '  ';
  var out = transform(json, pointer, options.log, options.indent);
  if (!options.log && out) {
    out = out.split('\n').join('\n' + pre);
  }
  console.log(
    pre + '$ echo ' + json + ' | jp ' +
    (options.log ? '--log ' : '') + (pointer || '""') +
    (typeof indent !== 'undefined' ? ' "' + options.indent + '"' : ''));
  process.stdout.write(pre);
  console.log(typeof out !== 'undefined' ? out : '');
  if (options.newline !== false) {
    console.log();
  }
}

function help() {
  console.log('usage: jsonpointer [options] <pointer> [<indent>]');
  console.log('                jp [options] <pointer> [<indent>]');
  console.log();
  console.log('options:');
  console.log('  -l --log     Output console.log format instead of JSON');
  console.log();
  console.log('examples:');
  example('{"name": "jsonpointer-cli", "version": "1.0.0"}', '/name');
  example('{"name": "jsonpointer-cli", "version": "1.0.0"}', '/version', { log: true });
  example('{"data": ["a", {"b": 2}, "c"]}', '/data/1');
  example('{"data": ["a", {"b": 2}, "c"]}', '', { log: true });
  example('{"data": ["a", {"b": 2}, "c"]}', '/data', { indent: true });
  example('{}', '', { newline: false });
}

function run(argv) {
  var args = argv || process.argv.slice(2);

  // Check for pointer argument
  if (args.length <= 0) {
    help();
    return 2;
  }

  // Check for options
  var log = false;
  if (args[0] === '-l' || args[0] === '--log') {
    log = true;
    args = args.slice(1);
  } else if (args[0][0] === '-') {
    console.log('Unknown option:', args[0]);
    return 2;
  }

  // Get positional arguments
  var pointer = args[0];
  var indent = args[1];

  // Read full JSON document into memory
  var stdin = process.stdin;
  var chunks = [];
  stdin.setEncoding('utf8');
  stdin.on('readable', function () {
    var chunk = process.stdin.read();
    if (chunk !== null) {
      chunks.push(chunk);
    }
  });

  // Parse, filter, and write resulting JSON
  stdin.on('end', function () {
    var out = transform(chunks.join(''), pointer, log, indent);
    console.log(typeof out !== 'undefined' ? out : '');
  });
}

module.exports = {
  transform: transform,
  help: help,
  run: run
};
