/*
a. http://www.jeuxvideo.com/rss/rss.xml
b. http://www.jeuxvideo.com/rss/rss-news.xml
c. http://www.jeuxvideo.com/rss/itunes-chroniques.xml
d. https://news.google.com/news?ned=fr&num=100&output=rss&q=(%22starwars%22
e. http://www.jeuxvideo.com/rss/rss-videos.xml
f. http://www.numerama.com/feed/
g. https://news.ycombinator.com/rss 
*/
const FeedParser = require('feedparser');
const express = require('express');
const request = require('request')
var JsonDB = require('node-json-db');
var db = new JsonDB('./flux-info', true, false);
worker = express();

var jvdRSS = (req, res, next) => {
    let myReq = request('http://www.jeuxvideo.com/rss/rss.xml')
    let feedParser = new FeedParser();
    myReq.on('response', function(resp) {
        var stream = this;
        if(resp.statusCode !== 200){
            console.log('connection error')
        }else {
            stream.pipe(feedParser);
        }
    });
    feedParser.on('error', err=>{
        console.log(err)
    });
    feedParser.on('readable', function(){
        var stream = this
        var meta = this.meta;
        var item;

        while(item = stream.read()){
            var info = {
                title: item.title,
                description: item.description,
                author: item.author,
                permalink : item.permalink
            };
            db.push('/JVDRSS/'+item.title, info);
        }
    })
    next();
};

var jvdRSSNews = (req, res, next) => {
    let myReq = request('http://www.jeuxvideo.com/rss/rss-news.xml')
    let feedParser = new FeedParser();
    myReq.on('response', function(resp) {
        var stream = this;
        if(resp.statusCode !== 200){
            console.log('connection error')
        }else {
            stream.pipe(feedParser);
        }
    });
    feedParser.on('error', err=>{
        console.log(err)
    });
    feedParser.on('readable', function(){
        var stream = this
        var meta = this.meta;
        var item;

        while(item = stream.read()){
            var info = {
                title: item.title,
                description: item.description,
                author: item.author,
                permalink : item.permalink
            };
            db.push('/JVDRSS-News/'+item.title, info)
        }
    })
    next();
};
var jvdItunsCh = (req, res, next) => {
    let myReq = request('http://www.jeuxvideo.com/rss/itunes-chroniques.xml')
    let feedParser = new FeedParser();
    myReq.on('response', function(resp) {
        var stream = this;
        if(resp.statusCode !== 200){
            console.log('connection error')
        }else {
            stream.pipe(feedParser);
        }
    });
    feedParser.on('error', err=>{
        console.log(err)
    });
    feedParser.on('readable', function(){
        var stream = this
        var meta = this.meta;
        var item;

        while(item = stream.read()){
            var info = {
                title: item.title,
                description: item.description,
                author: item.author,
                permalink : item.permalink
            };
            db.push('/Itunes-chronicles/'+item.title, info)
        }
    })
    next();
};
var jvdRSSVideo = (req, res, next) => {
    let myReq = request('http://www.jeuxvideo.com/rss/rss.xml')
    let feedParser = new FeedParser();
    myReq.on('response', function(resp) {
        var stream = this;
        if(resp.statusCode !== 200){
            console.log('connection error')
        }else {
            stream.pipe(feedParser);
        }
    });
    feedParser.on('error', err=>{
        console.log(err)
    });
    feedParser.on('readable', function(){
        var stream = this
        var meta = this.meta;
        var item;

        while(item = stream.read()){
            var info = {
                title: item.title,
                description: item.description,
                author: item.author,
                permalink : item.permalink
            };
            db.push('/JVDRSS-Video/'+item.title, info)
        }
    })
    next();
};
var googleFeed = (req, res, next) => {
    let myReq = request('https://news.google.com/news?ned=fr&num=100&output=rss&q=(%22starwars%22')
    let feedParser = new FeedParser();
    myReq.on('response', function(resp) {
        var stream = this;
        if(resp.statusCode !== 200){
            console.log('connection error')
        }else {
            stream.pipe(feedParser);
        }
    });
    feedParser.on('error', err=>{
        console.log(err)
    });
    feedParser.on('readable', function(){
        var stream = this
        var meta = this.meta;
        var item;

        while(item = stream.read()){
            var info = {
                title: item.title,
                description: item.description,
                author: item.author,
                permalink : item.link
            };
            db.push('/Google-feed/'+item.title, info)
        }
    })
    next();
};
var numeramaFeed = (req, res, next) => {
    let myReq = request('http://www.numerama.com/feed/')
    let feedParser = new FeedParser();
    myReq.on('response', function(resp) {
        var stream = this;
        if(resp.statusCode !== 200){
            console.log('connection error')
        }else {
            stream.pipe(feedParser);
        }
    });
    feedParser.on('error', err=>{
        console.log(err)
    });
    feedParser.on('readable', function(){
        var stream = this
        var meta = this.meta;
        var item;

        while(item = stream.read()){
            var info = {
                title: item.title,
                description: item.description,
                author: item.author,
                permalink : item.link
            };
            db.push('/Numerama-feed/'+item.title, info)
        }
    })
    next();
};
var ycombinatorFeed = (req, res, next) => {
    let myReq = request('https://news.ycombinator.com/rss')
    let feedParser = new FeedParser();
    myReq.on('response', function(resp) {
        var stream = this;
        if(resp.statusCode !== 200){
            console.log('connection error')
            resp.on('error',(err)=>{
                console.log(err)
            })
        }else {
            stream.pipe(feedParser);
        }
    });
    feedParser.on('error', err=>{
        console.log(err)
    });
    feedParser.on('readable', function(){
        var stream = this
        var meta = this.meta;
        var item;

        while(item = stream.read()){
            var info = {
                title: item.title,
                description: item.description,
                author: item.author,
                permalink : item.link
            };
            db.push('/Ycombinator-feed/'+item.title, info)
        }
    })
    next(); 
};



worker.use(jvdRSS)
worker.use(jvdRSSNews)
worker.use(jvdItunsCh)
worker.use(jvdRSSVideo)
worker.use(googleFeed)
worker.use(numeramaFeed)
worker.use(ycombinatorFeed)
worker.use((req, res, next)=>{
    setInterval(function(){
        request.post('http://localhost:9001')
    },3000)
    next();
})

module.exports = worker;