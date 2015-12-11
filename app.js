var express  = require('express'),
    stylus   = require('stylus'),
    path     = require('path'),
    compress = require('compression');



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



/*--- Routes -*/
app.get('/', function (req, res) {
    res.render(
        'home',
        {
            title       : 'Home',
            description : 'Here I am !',
            keywords    : 'Pierre de la Martinière, developer, photographer, musician'
        }
    )
});

app.listen(3000);
