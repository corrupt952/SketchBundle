var net = net || {};
net.khasegawa = net.khasegawa || {};
net.khasegawa.SketchBundle = net.khasegawa.SketchBundle || {};

// SVNPlugin class
net.khasegawa.SketchBundle.SVNPlugin = function(uri, option) {
  if (typeof option.name === 'undefined') {
    option.name = NSString
        .stringWithString(uri)
        .lastPathComponent()
        .stringByDeletingPathExtension();
  }

  net.khasegawa.SketchBundle.Plugin.call(this, uri, option);

  this.rev  = option.rev;
};
net.khasegawa.SketchBundle.SVNPlugin.prototype =
    Object.create(net.khasegawa.SketchBundle.Plugin.prototype);
net.khasegawa.SketchBundle.SVNPlugin.prototype.constructor =
    net.khasegawa.SketchBundle.SVNPlugin;

net.khasegawa.SketchBundle.SVNPlugin.prototype.install = function() {
  var command = 'svn checkout --quiet ' + encodeURI(this.uri) + ' ' + this.name,
      ret = true;
  if (typeof this.rev !== 'undefined') {
    command += ' --revision ' + this.rev;
  }
  try {
    net.khasegawa.run(command, net.khasegawa.sketchPluginFolder());
  } catch(e) {
    log(e.reason());
    ret = false;
  }
  return ret;
};

net.khasegawa.SketchBundle.SVNPlugin.prototype.update = function() {
  var ret = true;
  try {
    net.khasegawa.run('svn update --quiet', this.path);
  } catch(e) {
    log(e.reason());
    ret = false;
  }
  return ret;
};
