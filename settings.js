window.$docsify.auto2top = true;
window.$docsify.externalLinkTarget = '_self';
window.$docsify.subMaxLevel = 3;

if(!window.$docsify.plugins) window.$docsify.plugins = [];
window.$docsify.plugins.push(function(hook, vm) {
	hook.beforeEach(function (html, next) {
		var repo = window.location.pathname.substr(1); // strip the `/`
		var path = window.location.hash.substr(1).split('?')[0]; // strip the `#` and anything after `?`
		if(repo == '')	
			repo = 'haxetink.github.io/blob/master';
		else
			repo += '/blob/gh-pages';
			
		path += vm.route.file;
		
		var footer = ['[Edit this page](https://github.com/haxetink/' + repo + path + ')\n'];
		
		function done() {
			next(html + '\n\n' + footer.join('\n'));
		}
		
		if(vm.config.loadSidebar) {
			fetch(vm.config.loadSidebar)
				.then(function(res) {
					return res.text();
				})
				.then(function(sidebar) {
					console.log(vm.route);
					var regex = /\((.*\.md)\)/gi, result, links = [];
					while ( (result = regex.exec(sidebar)) ) {
						links.push('/' + result[1]);
					}
					var index = links.indexOf(vm.route.file);
					if(index > 0) footer.push('[< Prev](' + links[index - 1] + ')');
					if(index < links.length - 1) footer.push('[Next >](' + links[index + 1] + ')');
					done();
				});
		} else {
			done();
		}
	});
});