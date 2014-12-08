var net = net || {};
net.khasegawa = net.khasegawa || {};
net.khasegawa.SketchBundle = net.khasegawa.SketchBundle || {};

// RawPlugin class
net.khasegawa.SketchBundle.RawPlugin = function(uri, option) {
  if (typeof option.name === 'undefined') {
    option.name = NSString
        .stringWithString(uri)
        .lastPathComponent();
  }

  net.khasegawa.SketchBundle.Plugin.call(this, uri, option);
};
net.khasegawa.SketchBundle.RawPlugin.prototype =
    Object.create(net.khasegawa.SketchBundle.Plugin.prototype);
net.khasegawa.SketchBundle.RawPlugin.prototype.constructor =
    net.khasegawa.SketchBundle.RawPlugin;

net.khasegawa.SketchBundle.RawPlugin.prototype.install = function() {
  var ret = true;
  if (!net.khasegawa.createDirectory(this.parentFolder())) {
    log(this.parentFolder() + " can't create directory.");
    ret = false;
  } else {
    var url = NSURL.URLWithString(encodeURI(this.uri)),
        data = NSData.dataWithContentsOfURL(url);

    if (data !== null) {
      data.writeToFile_atomically(this.path, true);
    } else {
      log(this.uri + " can't downloaded.");
      ret = false;
    }
  }
  return ret;
};

net.khasegawa.SketchBundle.RawPlugin.prototype.update = function() {
    var ret = true,
        url = NSURL.URLWithString(encodeURI(this.uri)),
        data = NSData.dataWithContentsOfURL(url);

    if (data !== null) {
      data.writeToFile_atomically(this.path, true);
    } else {
      log(this.uri + " can't downloaded.");
      ret = false;
    }

    return ret;
};
