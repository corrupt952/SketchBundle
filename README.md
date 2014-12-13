About
============
SketchBundle makes sure Sketch 3 run the same plugins on every machine.

Installation
============
1. Download the plugin.
2. Unzip the archive.
3. Place the folder into your Sketch Plugins folder by navigating to Sketch > Plugins > Reveal Plugins Folder.
4. Open this plugin folder.
5. Create `Sketchbundle.json` file based on `Sketchbundle.json.example` file.
6. Edit `Sketchbundle.json`. (See [Sketchbundle.json format](#Sketchbundle.json format))

Using the plugin
================
Install plugins
---------------
1. Run `Install` command.

That's it :smirk:

Update plugins
--------------
1. Run `Update` command.

That's it :relaxed:

Sketchbundle.json format
========================
```json
{
    "{repository}" : {
        "{option key}": "{option value}"
    }
}
```
{repository} is the repository URI.


Options
=======
|Key|Value|Required|Example|
|:--|:----|:-------|------:|
|name|Specify plugin name.|No|`"name": "PluginName"`|
|type|Specify repository type.|No|`"type": "svn"`|
|site|Repository site.|No|`"site": "github"`|
|rev|Repository revision.|No|`"rev": "develop"`|
|stay_same|true or false|No|`"stay_same": true`|

name option
-----------
Specify the name of the bundle. This is used for sketchbundle management. If omitted, the tail of the repository name will be used.

```json
{
    "corrupt952/SketchBundle": {
        "name": "PluginName"
    }
}
```

type option
-----------
Specify the repositroy type. If omitted, a guess is made based on repo option.

* `raw` ... Raw file
* `git` ... Git
* `hg` ... Mercurial
* `svn` ... Subversion

```json
{
    "http://svn.example.com/repository": {
        "type": "svn"
    }
}
```
Note: When you use `hg`, configure [hostfingerprints](http://www.selenic.com/mercurial/hgrc.5.html#hostfingerprints).

site option
-----------
Specify the repository site. If you omit both the repository URL and the `site` option, 'git' will be used.

* `github` or `gh` ... [Github](https://github.com)
* `bitbucket` or `bb` ... [Bitbucket](https://bitbucket.org)
* `gist` ... [Gist](https://gist.github.com)

```json
{
    "corrupt952/SketchBundle": {
        "site": "bb"
    }
}
```

rev option
----------
Specify a revision number or branch/tag name. `git`, `hg` and `svn` will be used.
```json
{
    "corrupt952/SketchBundle": {
        "rev": "develop"
    }
}
```

stay_same option
----------------
If set to true, sketchbundle doesn't update it automatically when you run `Update` comamnd.
```json
{
    "corrupt952/SketchBundle": {
        "rev": "3ae72e67874ef1f914da6ac628f7458d07c186aa",
        "stay_same": true
    }
}
```

License
=======
The MIT License (MIT)

Copyright (c) 2014 Kazuki Hasegawa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
