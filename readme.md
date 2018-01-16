process.js  
```js
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
		(function (options) {
		  return function (tree) {

			tree.messages.push({
				type: 'dependency',
				file: 'path/to/dependency.html',
				from: tree.options.from
			})

			console.log(tree);

			return tree;
		  }
		})()
	]
	posthtml(plugins)
		.process(html, options)
		.then(result => {
			writeFileSync(options.to, result.html);
		});
})
```

result loop #1
```js
[ '<!DOCTYPE html>',
  '\n',
  { tag: 'html',
    attrs: { lang: 'en' },
    content: [ '\n', [Object], '\n', [Object], '\n' ] },
  options: { from: 'templates/index.html', to: 'dist/output-index.html' },
  processor: PostHTML { version: '0.11.1', name: 'posthtml', plugins: [ [Function] ] },
  walk: [Function: walk],
  match: [Function: match],
  messages: [ { type: 'dependency',
      file: 'path/to/dependency.html',
      from: 'templates/index.html' } ] ]
```

result loop #2
```js
[ '<!DOCTYPE html>',
  '\n',
  { tag: 'html',
    attrs: { lang: 'en' },
    content: [ '\n', [Object], '\n', [Object], '\n' ] },
  options: { from: 'templates/layout.html', to: 'dist/output-layout.html' },
  processor: PostHTML { version: '0.11.1', name: 'posthtml', plugins: [ [Function] ] },
  walk: [Function: walk],
  match: [Function: match],
  messages: [ { type: 'dependency',
      file: 'path/to/dependency.html',
      from: 'templates/index.html' },
    { type: 'dependency',
      file: 'path/to/dependency.html',
      from: 'templates/layout.html' } ] ]
```