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
$ node index.js -s -p ./test-webpack

[{
	"label": "index.js",
	"groups": [{
		"label": "src/css/1.scss",
		"groups": [{
			"label": " .content &.style",
			"groups": [{
				"label": "- height: 100px;"
			}]
		}, {
			"label": " .content .dd",
			"groups": [{
				"label": "+width: 100%;"
			}, {
				"label": "+"
			}]
		}]
	}]
}]
```
