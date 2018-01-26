process.js  
```js
"use strict";
import {readFileSync, writeFileSync} from 'fs';
import posthtml from 'posthtml';

[{
  from: 'templates/index.html',
  to: 'dist/output-index.html'
}, {
  from: 'templates/layout.html',
  to: 'dist/output-layout.html'
}].forEach(options => {
  const html = readFileSync(options.from, 'utf8');
  const plugins = [
    function (tree) {
      tree.messages.push({
        type: 'dependency',
        file: 'path/to/dependency.html',
        from: tree.options.from
      })

      return tree;
    }
  ]
  const result = posthtml(plugins)
    .use(function (tree) {
      tree.messages.push({
        type: 'dependency',
        file: 'path/to/dependency.html',
        from: 'use'
      })

      return tree;
    })
    .process(html, options)
    .then(result => {
      console.log(result.tree);
      writeFileSync(options.to, result.html);
    });
})
```

result loop #1
```js
[ 'index',
  options: { from: 'templates/index.html', to: 'dist/output-index.html' },
  processor: PostHTML {
    version: '0.11.3',
    name: 'posthtml',
    plugins: [ [Function], [Function] ] },
  walk: [Function],
  match: [Function],
  messages: [ { type: 'dependency',
      file: 'path/to/dependency.html',
      from: 'templates/index.html' },
    { type: 'dependency',
      file: 'path/to/dependency.html',
      from: 'use' } ],
  extendApi: true ]
```

result loop #2
```js
[ 'layout',
  options: { from: 'templates/layout.html', to: 'dist/output-layout.html' },
  processor: PostHTML {
    version: '0.11.3',
    name: 'posthtml',
    plugins: [ [Function], [Function] ] },
  walk: [Function],
  match: [Function],
  messages: [ { type: 'dependency',
      file: 'path/to/dependency.html',
      from: 'templates/layout.html' },
    { type: 'dependency',
      file: 'path/to/dependency.html',
      from: 'use' } ],
  extendApi: true ]
```
