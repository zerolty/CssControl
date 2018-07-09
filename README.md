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

change 1.scss
```javascript
.content {
    &.style {
        width: 100px;
    }
    .content {
        width: 100px;
    }
    .dd {
        width: 100%;
	}
	.a {
        width: 100px
    }
}

.cc {
    width: 100px;
}

```

```
$ node index.js -s -p ./test-webpack

$ cd examples

$ node index.js

open localhost:3000 on the browers

```
