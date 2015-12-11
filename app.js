var express  = require('express'),
    stylus   = require('stylus'),
    path     = require('path'),
    compress = require('compression'),
    force    = require('forcedomain');



var app = express();

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'jade');

app.use(stylus.middleware({
    src     : path.join(__dirname, 'src', 'styles'),
    dest    : path.join(__dirname, 'public'),
    compile : function (str, path) {
        return stylus(str)
            .set('filename', path)
            .set('compress', true);
    }
}));

app.use(express.static(__dirname + '/public'));
app.use('/images', express.static(__dirname + '/src/images'));

app.use(compress());

app.use(force({
  hostname: 'pierrevanmart.com'
}));



/*--- Routes -*/

app.get('/*', function(req, res, next) {
    if (req.headers.host.match(/^www/) !== null ) {
        res.redirect(301, 'http://' + req.headers.host.replace(/^www\./, '') + req.url);
    } else {
        next();
    }
})

app.get('/', function (req, res) {
    res.render(
        'home',
        {
            title       : 'Home',
            description : 'Full-stack web developer, photographer and musician',
            keywords    : 'Pierre de la Martinière, developer, photographer, musician'
        }
    )
});

app.listen(3000);
