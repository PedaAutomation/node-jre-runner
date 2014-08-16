var spawn = require('child_process').spawn,
    os    = require('os'),
    fs    = require('fs');

var JAVA_PATHS = {
  "win32": {
    "ia32": "win32/bin/javaw.exe",
    "x64" : "win64/bin/javaw.exe"
  },
  "darwin": {
    "ia32": "osx/bin/java",
    "x64" : "osx/bin/java"
  },
  "linux": {
    "ia32": "linux32/bin/java",
    "x64" : "linux64/bin/java",
    "arm" : "linuxarm/bin/java"
  }
}


var javaPath = __dirname + "/jre/" + JAVA_PATHS[os.platform()][os.arch()];

fs.chmodSync(javaPath, '777');

module.exports.runJava = function(args) {
  return spawn(javaPath, args);
}
