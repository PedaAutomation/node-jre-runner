node-jre-runner
===============
A utility which automatically downloads a jre to execute programs.

# Usage

```shell
npm install jre-runner --save
```

```js
var jre = require('jre-runner');

jre.runJava(['-cp', 'peda.jar', 'com.peda.Rolfing']); // returns a child_process.spawn device.

```
