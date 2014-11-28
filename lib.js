var net = net || {};

net.khasegawa = {
  alert: function(message, title) {
    var app = NSApplication.sharedApplication();
    if (typeof title === 'undefined') {
      app.displayDialog(message);
    } else {
      app.displayDialog_withTitle(message, title);
    }
  },
  currentFolder: function() {
    return doc.fileURL().URLByDeletingLastPathComponent().path();
  },
  currentPluginFolder: function() {
    return sketch.scriptPath.stringByDeletingLastPathComponent();
  },
  sketchPluginFolder: function() {
    var workspace = NSWorkspace.sharedWorkspace();
    return workspace.applicationSupportDirectory() + "/Plugins";
  },
  run: function(command, path, shell) {
    var task = NSTask.new(),
        pipe = NSPipe.pipe(),
        errPipe = NSPipe.pipe();

    if (typeof shell === 'undefined') {
      shell = net.khasegawa
          .run('echo $SHELL', NSHomeDirectory(), '/bin/sh')
          .trim();
    }

    task.setLaunchPath(shell);
    task.setCurrentDirectoryPath(path);
    task.setArguments(NSArray.arrayWithObjects("-c", command, nil));
    task.setStandardOutput(pipe);
    task.setStandardError(errPipe);
    task.launch();
    task.waitUntilExit();

    if (task.terminationStatus() !== 0) {
      var data = errPipe.fileHandleForReading().readDataToEndOfFile();
          message = NSString
            .alloc()
            .initWithData_encoding(data, NSUTF8StringEncoding);
      NSException.raise_format("error", message);
    }
    var data = pipe.fileHandleForReading().readDataToEndOfFile();
    return NSString
        .alloc()
        .initWithData_encoding(data, NSUTF8StringEncoding);
  },
  isExists: function(path) {
    return NSFileManager.defaultManager().fileExistsAtPath_(path);
  },
  isNotExists: function(path) {
    return !net.khasegawa.isExists(path);
  },
  createDirectory: function(path) {
    var manager = NSFileManager.defaultManager();
    return manager.createDirectoryIfNecessary(path);
  }
};
