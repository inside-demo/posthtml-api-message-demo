"use strict";
import {readFileSync, writeFileSync} from 'fs';
import posthtml from 'posthtml';

var arr1;
var arr2;

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