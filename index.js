'use strict'

function isJQuery(node) {
	let id;

	while (node) {
		switch (node.type) {
			case 'CallExpression':
				node = node.callee
				break
			case 'MemberExpression':
				node = node.object
				break
			case 'Identifier':
				id = node
				node = null
			default:
				node = null
		}
	}

	return id && ( id.name.startsWith('$') || id.name.startsWith('jQuery') )
}

const noJqueryRule = {
	meta: {
		docs: {},
		schema: []
	},
	create: function( context ) {
		return {
			CallExpression: function (node) {
				if (isJQuery(node)) {
					context.report({
						node: node,
						message: 'Don\'t use jQuery'
					})
				}
			}
		}
	}
}

module.exports = {
	rules: {
		'no-jquery': noJqueryRule,
	}
}