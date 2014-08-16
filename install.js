var os          = require('os'),
    fs          = require('fs'),
    request     = require('request'),
    progress    = require('request-progress'),
    ProgressBar = require('progress'),
    unzip       = require('unzip');
    

var DOWNLOADS = {
  "win32": {
    "ia32": "https://bitbucket.org/bigteddy/node-jre-runner/downloads/win32.zip",
    "x64" : "https://bitbucket.org/bigteddy/node-jre-runner/downloads/win64.zip"
  },
  "darwin": {
    "ia32": "https://bitbucket.org/bigteddy/node-jre-runner/downloads/osx.zip",
    "x64" : "https://bitbucket.org/bigteddy/node-jre-runner/downloads/osx.zip"
  },
  "linux": {
    "ia32": "https://bitbucket.org/bigteddy/node-jre-runner/downloads/linux32.zip",
    "x64" : "https://bitbucket.org/bigteddy/node-jre-runner/downloads/linux64.zip",
    "arm" : "https://bitbucket.org/bigteddy/node-jre-runner/downloads/linuxarm.zip"
  }
}

var downloadUrl = DOWNLOADS[os.platform()][os.arch()];

var targetPath = os.tmpdir() + "/jdk.zip";

console.log("Downloading JRE from " + downloadUrl);

var bar = null;

progress(request(downloadUrl))
.on("progress", function(state) {
  if(!bar) {
    bar = new ProgressBar(" downloading [:bar] :percent :etas", {
      total: state.total
    });
  }
  bar.tick(state.received);
})
.on("error", function(err) {
  console.log("There was an error downloading the file!", err);
})
.pipe(fs.createWriteStream(targetPath))
.on("error", function(err) {
  console.log("There was an error saving the file!", err);
})
.on("close", function(err) {
  console.log("File downloaded.");
  extractJdk(targetPath);
});

function extractJdk(targetPath) {
  var file = fs.createReadStream(targetPath);
  var targetDir = __dirname + "/jre/";

  var extract = file.pipe(unzip.Extract({ path: targetDir }));
  extract.on("close", function(err) {
    console.log("JRE extracted!");
  });
  extract.on("error", function(err) {
    console.log("Could not extract the JRE!", err);
  });
}
