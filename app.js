var express  = require('express'),
    stylus   = require('stylus'),
    path     = require('path'),
    compress = require('compression'),
    force    = require('forcedomain'),
    minify   = require('express-minify');



var app = express();

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'jade');

app.use(stylus.middleware({
    src     : path.join(__dirname, 'src', 'styles'),
    dest    : path.join(__dirname, 'public', 'styles'),
    compile : function (str, path) {
        return stylus(str)
            .set('filename', path)
            .set('compress', true);
    }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'src', 'images')));
app.use('/scripts', express.static(path.join(__dirname, 'src', 'scripts')));

app.use(compress());
app.use(minify());

app.use(force({
    hostname: 'pierrevanmart.com',
    type:     'permanent'
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
            description : 'Hi ! I\'m Pierre de la Martinière, a full-stack web developer, street-photographer and musician. Nice code, prime lenses and jams are my way of being.',
            keywords    : 'Pierre de la Martinière, developer, photographer, musician'
        }
    )
});

app.listen(3000);
