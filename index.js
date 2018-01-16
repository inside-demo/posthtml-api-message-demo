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