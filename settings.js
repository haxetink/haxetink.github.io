window.$docsify.auto2top = true;
window.$docsify.subMaxLevel = 3;

if(!window.$docsify.plugins) window.$docsify.plugins = [];
window.$docsify.plugins.push(function(hook) {
	hook.afterEach(function (html) {
	var repo = window.location.pathname.substr(1); // strip the /
	var path = window.location.hash.substr(1); // strip the #
	if(repo == '')	
		repo = 'haxetink.github.io/blob/master';
	else
		repo += '/blob/gh-pages';
		
	if(path == '/') path = '/README';
	path += '.md';
	
	return html + '<hr/><footer><a href="https://github.com/haxetink/' + repo + path + '">Edit this page</a></footer>';
	});
});