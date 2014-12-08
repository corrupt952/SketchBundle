var net = net || {};
net.khasegawa = net.khasegawa || {};
net.khasegawa.SketchBundle = net.khasegawa.SketchBundle || {};

// Installer class
net.khasegawa.SketchBundle.Installer = function(bundles) {
  this.plugins = [];

  for (var uri in bundles) {
    var plugin,
        opt = bundles[uri];
    switch(opt.type) {
      case 'raw':
        plugin = new net.khasegawa.SketchBundle.RawPlugin(uri, opt);
        break;
      case 'svn':
        plugin = new net.khasegawa.SketchBundle.SVNPlugin(uri, opt);
        break;
      case 'hg':
        plugin = new net.khasegawa.SketchBundle.MercurialPlugin(uri, opt);
        break;
      case 'git':
      default:
        plugin = new net.khasegawa.SketchBundle.GitPlugin(uri, opt);
        break;
    }
    this.plugins.push(plugin);
  }
};

net.khasegawa.SketchBundle.Installer.prototype.install = function() {
  var lists = {
    successful: [],
    failed: []
  };
  for(var i = 0, l = this.plugins.length; i < l; i++) {
    var plugin = this.plugins[i];
    if (plugin.installable()) {
      lists[(plugin.install() ? 'successful' : 'failed')].push(plugin.name);
    }
  }
  return lists;
};

net.khasegawa.SketchBundle.Installer.prototype.update = function() {
  var lists = {
    successful: [],
    failed: []
  };
  for(var i = 0, l = this.plugins.length; i < l; i++) {
    var plugin = this.plugins[i];
    if (plugin.updatable()) {
      lists[(plugin.update() ? 'successful' : 'failed')].push(plugin.name);
    }
  }
  return lists;
};
