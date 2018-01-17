# CssControl
a tool for css csscontrol

# Usage

```
$ node ./index.js -h -p ./test-html

{ 
    '\html\index1.html': [ '\\css\\1.css', '\\css\\2.css' ],
    '\html\index2.html': [ '\\css\\3.css', '\\css\\4.css' ] 
}


```
# Options
```
Options:
  -s  --single[unrequired] type of single pages app
  -h  --html[unrequired] type of multifile
  -p  --path[unrequired] the path of your dir
```

# Example
```
$ node .\lib\diff\

{ 
  '\html\index1.html': [ { name: '\\css\\1.css', attr: [Object] } ],
  '\html\index2.html': [ { name: '\\css\\3.css', attr: [Object] } ] 
}
export!
```

# Export 

```
./lib/data/export.json

[{
    "label": "\\html\\index1.html",
    "groups": [{
        "label": "\\css\\1.css",
        "groups": [{
            "label": ".content"
        }, {
            "label": ".inner-content"
        }, {
            "label": ".inner-button"
        }, {
            "label": ".inner-span"
        }]
    }]
}, {
    "label": "\\html\\index2.html",
    "groups": [{
        "label": "\\css\\3.css",
        "groups": [{
            "label": ".inner-span"
        }]
    }]
}

```