var net = net || {};
net.khasegawa = net.khasegawa || {};
net.khasegawa.SketchBundle = net.khasegawa.SketchBundle || {};

// GitPlugin class
net.khasegawa.SketchBundle.GitPlugin = function(uri, option) {
  if (typeof option.name === 'undefined') {
    option.name = NSString
        .stringWithString(uri)
        .lastPathComponent()
        .stringByDeletingPathExtension();
  }
  if (!/\:\u002f\u002f/.test(uri)) {
    switch(option.site) {
      case 'bitbucket':
      case 'bb':
        uri = 'git://bitbucket.org/' + uri;
        break;
      case 'gist':
        uri = 'git://gist.github.com/' + uri;
        break;
      case 'gh':
      case 'github':
      default:
        uri = 'git://github.com/' + uri;
        break;
    }
  }

  net.khasegawa.SketchBundle.Plugin.call(this, uri, option);

  this.rev  = option.rev;
};
net.khasegawa.SketchBundle.GitPlugin.prototype =
    Object.create(net.khasegawa.SketchBundle.Plugin.prototype);
net.khasegawa.SketchBundle.GitPlugin.prototype.constructor =
    net.khasegawa.SketchBundle.GitPlugin;

net.khasegawa.SketchBundle.GitPlugin.prototype.install = function() {
  var ret = true;
  try {
    net.khasegawa.run('git clone --quiet ' + this.uri + ' ' + this.name,
                      net.khasegawa.sketchPluginFolder());
    if (typeof this.rev !== 'undefined') {
      net.khasegawa.run('git checkout --quiet ' + this.rev, this.path);
    }
    net.khasegawa.run('git submodule update --init --recursive', this.path);
  } catch(e) {
    net.khasegawa.alert(net.khasegawa.sketchPluginFolder());
    log(e.reason());
    ret = false;
  }
  return ret;
};

net.khasegawa.SketchBundle.GitPlugin.prototype.update = function() {
  var ret = true;
  try {
    net.khasegawa.run('git pull --rebase && ' +
                        'git submodule update --init --recursive',
                      this.path);
  } catch(e) {
    log(e.reason());
    ret = false;
  }
  return ret;
};
