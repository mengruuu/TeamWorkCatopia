const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');

// 第一個任務 console 
function tasks(cb){
  console.log('gulp 第一個任務');
  cb();
}

exports.do = tasks;

//第二個任務 搬家
function move(){
   return src('style.css').pipe(dest('css/'));
}

exports.copy = move; 


// sass編譯
//前台CSS 
const sass = require('gulp-sass')(require('sass'));
function sassstyle(){
   return src('src/sass/page/*.*') // 來源路徑
   .pipe(sass().on('error', sass.logError))
   .pipe(dest('dist/css')) // 目的地路徑
}
exports.style =sassstyle;
//後台CSS
function Bsassstyle(){
   return src('src/sass/backend/*.*') // 來源路徑
   .pipe(sass().on('error', sass.logError))
   .pipe(dest('dist/css/backend')) // 目的地路徑
}
exports.Bstyle = Bsassstyle;
// html template

const fileinclude = require('gulp-file-include');

function html(){
   return src('src/frontend/*.html') // 來源路徑
   .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
     }))
   .pipe(dest('./dist/')); // 目的地路徑
}

exports.template = html;

function Bhtml(){
   return src('src/backend/*.html') // 來源路徑
   .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
     }))
   .pipe(dest('./dist/backend')); // 目的地路徑
}

exports.Btemplate = Bhtml;

// js uglify

const uglify = require('gulp-uglify');

function jsmini(){
   return src('src/js/**/*.*')
   .pipe(uglify())
   .pipe(dest('dist/js'))
}

exports.js =jsmini;

//壓縮圖片

// const imagemin = require('gulp-imagemin');

// function min_images(){
//     return src('src/images/*.*')
//     .pipe(imagemin([
//         imagemin.mozjpeg({quality: 100, progressive: true}) // 壓縮品質      quality越低 -> 壓縮越大 -> 品質越差 
//     ]))
//     .pipe(dest('dist/images'))
// }

// exports.img = min_images;


function img_copy(){
  return src('src/images/**/*.*').pipe(dest('dist/images'));
}

exports.movepic = img_copy;







// watch
function watchall(){
   watch(['src/*.html' , 'src/layout/*.html'] , html);
   watch(['src/sass/*/*.scss' , 'src/sass/**/*.scss'] , sassstyle)
   watch('src/js/*.*' , jsmini)
}

exports.w = watchall;





const browserSync = require('browser-sync');
const reload = browserSync.reload;


function browser(done) {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html"
        },
        port: 3000
    });
     watch(['src/frontend/*.html' , 'src/frontend/**/*.html'] , html).on('change' , reload);
   //   watch(['src/fronted/layout/*.html'] , html).on('change' , reload);
     watch(['src/backend/*.html','src/backend/**/*.html'] , Bhtml).on('change' , reload);
     watch(['src/sass/page/*.scss' , 'src/sass/layout/*.scss'] , sassstyle).on('change' , reload);
     watch(['src/sass/backend/*.scss','src/sass/layout/*.scss'] , Bsassstyle).on('change' , reload);
     watch(['src/js/*/*.*', 'src/js/**/*.*'], jsmini).on('change' , reload);
     done();
}

exports.default = series(browser , img_copy) ;

//刪除舊檔案
const clean = require('gulp-clean');

function clear() {
  return src('dist' ,{ read: false ,allowEmpty: true })//不去讀檔案結構，增加刪除效率  / allowEmpty : 允許刪除空的檔案
  .pipe(clean({force: true})); //強制刪除檔案 
}

exports.c = clear;

//整合檔案
// var concat = require('gulp-concat');

// function concatcss(){
//     return src('./dist/css/*.css')
//     .pipe(concat('all.css'))
//     .pipe(dest('./dist/css/all/'))
// }

// exports.all  = concatcss;
