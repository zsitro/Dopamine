/*
 * Dopamine.js
 * Author: Gabor Zsoter
 * http://zsitro.com
 * Version: 0.0.3
 */


/* LOAD DEPENDENCIES
*********************************************************************************/
var
	express = require('express'),
	http = require('http'),
	path = require('path'),
	fs = require('fs'),
	stylus = require('stylus'),
	app = express(),

	/* Experimental
	coffee = require('coffee-script'),
	compress = require('node-jade-compress'), */

	// Project settings
	project = {
		build: {
			folder: "public"
		}
	};

app.configure(function () {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	/* Experimental
	compress.init({
		app: app,
		js_dir: 'scripts',
		js_url: '/js'
	});*/
	app.locals.pretty = true;
	app.locals.indentChar = "\t";
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});

app.configure('development', function () {
	app.use(express.errorHandler());
});

/* SAVE *.html TO PUBLIC DIRECTORY
*********************************************************************************/
var saveOutput = function (_html, filename) {

	var prettyData = _html;

	var filepath = project.build.folder + "/" + filename + ".html";
	console.log('Saving output:', filepath);

	fs.writeFile(project.build.folder + "/" + filename + ".html", "\ufeff" + prettyData, 'utf8', function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Saving " + filepath + "\t\t DONE");
		}
	});

	return true;
};

/* SERVE STATIC FILES
 ********************************************************************************/
var staticFiles = "js,css,jpg,png,ico,woff,eot,ttf,svg".split(",");
var staticFilesRoute = "*." + staticFiles.join("|*.");

app.get('/:var(' + staticFilesRoute + ')?', function (req, res) {
	var filenameWithPathAndExtension = req.params['var'];
	res.sendfile(project.build.folder + "/" + filenameWithPathAndExtension);
});

/* SERVE & SAVE .html FILES
 ********************************************************************************/
app.get('/*.html', function (req, res) {

	var filename = req.params[0]; //.slice(1);
	console.log("Requested html file: " + filename, req.params);

	res.render(filename, {
		dp : {
			settings: {
				supports: {
					ie: true
				}
			},
			page: {},
			project: {
				name: "Dopamine" // TODO: Move to external settings file
			}
		}
	}, function (err, html) {
		if (err) {
			console.log(err);
			res.send("<pre>"+err.toString()+"</pre>");
		} else {
			saveOutput(html, filename);
			res.send(html);
		}
	});

});

http.createServer(app).listen(app.get('port'), function () {
	console.log("(o,o) Dopamin App listening on port " + app.get('port'));
});