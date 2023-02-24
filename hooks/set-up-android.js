var sourceFile = "google-services.json";
var targetFileName = "google-services.json";

const fs = require('fs');
const path = require('path');

module.exports = function (ctx) {
  // Make sure android platform is part of build
  if (!ctx.opts.platforms.includes('android')) return;

  const platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/');

  if (fs.existsSync(sourceFile)) {
    fs.copyFile(sourceFile, platformRoot + targetFileName, (err) => {
      if(err) console.log(err);
    });
  }

  const gradleProps = "\ncdvMinSdkVersion=23\ncdvSdkVersion=31"

  fs.appendFile(platformRoot+"gradle.properties", gradleProps, (err) => {
    // if(err) console.log(err);
    if(err) throw err;
  });
};
