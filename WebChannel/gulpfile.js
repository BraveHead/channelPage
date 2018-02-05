var gulp = require('gulp');//  引入 gulp
var browserSync = require('browser-sync').create();// browser-sync 实时刷新
var sourcemaps = require('gulp-sourcemaps');// 源码压缩之后不易报错定位  sourcemaps用于错误查找
var minifycss = require('gulp-minify-css');// 压缩css
var autoprefixer = require('gulp-autoprefixer');// 处理浏览器私有前缀
var babel = require('gulp-babel');// 编译ES6语法
var uglify = require('gulp-uglify');// 压缩js
var imagemin = require('gulp-imagemin');// 压缩图片
var contentIncluder = require('gulp-content-includer');//通过includer导入方式导入不同的模块
var cache = require('gulp-cache');//清除缓存
var rev = require('gulp-rev-append');//添加MD5
var postcss = require('gulp-postcss');
var cssnext = require('cssnext');//使用CSS未来的语法
var precss = require('precss');//编写Sass的函数
var scss = require('gulp-sass');
var pngquant = require('imagemin-pngquant');  //png图片的深度压缩-插件
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');
var gutil = require("gulp-util");
var browserifyShim = require("browserify-shim");
var browserslist = require('browserslist');
var salad = require('postcss-salad');
var DEST = './dest2.3';
var SRC= './src2.3';
// 静态服务器 + 监听 scss/html/js/images 文件
gulp.task('serve', ['css', "copyHtml", "copyJs", "buildJs" ,"images"], function () {
    browserSync.init({
        server: DEST,
        ghostMode: false,   //禁止多设备联动
    });
    gulp.watch(SRC +"/assets/(*.png|*.jpg|*.svg)", ['images']);
    gulp.watch(SRC + "/style/*.css", ['css']);
    gulp.watch(SRC + "/*.html", ['copyHtml']);
    gulp.watch(SRC + "/script/*.js", ['buildJs']);
});

// 编译压缩css 输出到目标目录
gulp.task('css', function () {
    var processors = [
        autoprefixer,
        cssnext,
        precss
    ];
    gulp.src([SRC + '/style/*.css'])  //,'src/public/scss/*.scss'
        .pipe(sourcemaps.init())
        .pipe(postcss([
            salad({browsers: browserslist('last 5 version, > 0.1%')})
        ]))
        .pipe(minifycss())
        .pipe(rename({suffix:'.min'}))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(DEST + '/style/'))
        .pipe(browserSync.reload({stream: true}));
});

// 图片压缩  输出到目标目录
gulp.task('images', function () {
    gulp.src([SRC + '/assets/*.{png,jpg,gif,ico,svg}'])
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: true}], //不要移除svg的viewbox属性
            use: [pngquant()]   //使用pngquant深度压缩png图片
        })))
        .pipe(gulp.dest(DEST + '/assets'))
        .pipe(browserSync.reload({stream: true}));
});

// 拷贝 html
gulp.task('copyHtml', function () {
    gulp.src([SRC + '/*.html'])
        .pipe(contentIncluder({
            includerReg: /<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(rev())
        .pipe(gulp.dest(DEST+ '/'))
        .pipe(browserSync.reload({stream: true}));
});

// 拷贝 public下面的共有js库和文件
gulp.task('copyJs', function () {
    gulp.src([SRC + '/script/lib/*'])
        .pipe(gulp.dest(DEST + '/script/lib'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('buildJs', function () {
    gulp.src([SRC + '/script/main.js'])
        .pipe(uglify())
        .pipe(gulp.dest(DEST + '/script/'))
        .pipe(browserSync.reload({stream: true}));
});

//  编译自定义的js文件
// gulp.task("buildJs", function () {
//     var arr = [
//         "main.js"
//     ];
//
//     // for (var i = 0; i < arr.length; i++) {
//     //     browserify({
//     //         entries: [
//     //             SRC +"/script/" + arr[i]
//     //         ]
//     //     })
//     //         .transform(babelify.configure({
//     //             presets: ["es2015"],
//     //             plugins : [  //用来把es5的代码转换，并配合es5-shim.min.js和es5-sham.min.js的垫片，让ie8可以兼容ie8不支持的es5部分特性
//     //                 "transform-es3-property-literals",
//     //                 "transform-es3-member-expression-literals",
//     //             ]
//     //         }))
//     //         .bundle()
//     //         .pipe(source(arr[i]))
//     //         .pipe(gulp.dest(DEST + '/script/'))
//     //         .pipe(browserSync.reload({stream: true}));
//     // }
//     gulp.src(SRC+'/main.js')
//         .pipe(buffer())
//         .pipe(uglify())
//         .pipe(gulp.dest(DEST + '/script/'))
//         .pipe(browserSync.reload({stream: true}));
// });
//删除目录
gulp.task('clean', function () {
    del([DEST + "/"]);
});

//执行默认任务
gulp.task('default', ['serve']);

