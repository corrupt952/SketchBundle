var net = net || {};
net.khasegawa = net.khasegawa || {};
net.khasegawa.SketchBundle = net.khasegawa.SketchBundle || {};

// Plugin class
net.khasegawa.SketchBundle.Plugin = function(uri, option) {
  this.uri = uri;
  this.name = option.name;
  this.path = net.khasegawa.sketchPluginFolder() + "/" + this.name;
  this.staySame = option.stay_same || false;
};

net.khasegawa.SketchBundle.Plugin.prototype.isExists = function() {
  return net.khasegawa.isExists(this.path);
};

net.khasegawa.SketchBundle.Plugin.prototype.isNotExists = function() {
  return net.khasegawa.isNotExists(this.path);
};

net.khasegawa.SketchBundle.Plugin.prototype.installable = function() {
  return this.isNotExists();
};

net.khasegawa.SketchBundle.Plugin.prototype.install = function() {
  NSException.raise_format("NotImplementationExpcetion", "Not implementation.");
};

net.khasegawa.SketchBundle.Plugin.prototype.updatable = function() {
  return this.isExists() && !this.staySame;
};

net.khasegawa.SketchBundle.Plugin.prototype.update = function() {
  NSException.raise_format("NotImplementationExpcetion", "Not implementation.");
};

net.khasegawa.SketchBundle.Plugin.prototype.parentFolder = function() {
  return NSString
      .stringWithString(this.path)
      .stringByDeletingLastPathComponent();
};
