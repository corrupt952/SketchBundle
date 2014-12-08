var net = net || {};
net.khasegawa = net.khasegawa || {};
net.khasegawa.SketchBundle = net.khasegawa.SketchBundle || {};

// MercurialPlugin class
net.khasegawa.SketchBundle.MercurialPlugin = function(uri, option) {
  if (typeof option.name === 'undefined') {
    option.name = NSString
        .stringWithString(uri)
        .lastPathComponent()
        .stringByDeletingPathExtension();
  }

  net.khasegawa.SketchBundle.Plugin.call(this, uri, option);

  this.rev  = option.rev;
};
net.khasegawa.SketchBundle.MercurialPlugin.prototype =
    Object.create(net.khasegawa.SketchBundle.Plugin.prototype);
net.khasegawa.SketchBundle.MercurialPlugin.prototype.constructor =
    net.khasegawa.SketchBundle.MercurialPlugin;

net.khasegawa.SketchBundle.MercurialPlugin.prototype.install = function() {
  var ret = true;
  try {
    net.khasegawa.run('hg clone --quiet ' + encodeURI(this.uri) + ' ' +
                        this.name,
                      net.khasegawa.sketchPluginFolder());
    if (typeof this.rev !== 'undefined') {
      net.khasegawa.run('hg update ' + this.rev, this.path);
    }
  } catch(e) {
    log(e.reason());
    ret = false;
  }
  return ret;
};

net.khasegawa.SketchBundle.MercurialPlugin.prototype.update = function() {
  var ret = true;
  try {
    net.khasegawa.run('hg update --quiet', this.path);
  } catch(e) {
    log(e.reason());
    ret = false;
  }
  return ret;
};
