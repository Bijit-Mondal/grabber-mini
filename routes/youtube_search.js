var express = require('express');
const request = require('request');
const {spawn} = require('child_process');

var router = express.Router();
/* TODO: Generate API KEY from https://console.developers.google.com  */
const YOUTUBE_API_KEY = 'AIzaSyCAClMT_IoNpSwZSDdLq9xomFGA84gLMf8';

/* GET video listing. */
router.get('/:query', function(req, res, next) {
    let query = req.params.query;/*already encoded */
    
    /* Youtube API Request with KEY */
    request(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${YOUTUBE_API_KEY}`,
    (err,resp,body)=>{
        if(err){
            console.log('YOUTUBE_API - Request failed');
            next(err);
        }
        else{
            res.send(body).status(200);
        }
    });

});

/* Send mp3 download for video_id youtube */
router.get('/download/audio/:vid/:name?', (req,res,next)=>{
    let {vid,name} = req.params;
    vid = decodeURIComponent(vid);/*video id */
    name = name? decodeURIComponent(name):vid;/* Name: Optional Parameter for sending `name`.mp3 */
    
    //youtube-dl -x --audio-format mp3 http://www.youtube.com/watch?v=8veo4Uf6CR8 -f bestaudio   

    /*Perfect CODE  */
    /*Perfect CODE  */
    try {
            /* response attachment for triggering download instead of stream */
            res.attachment(`${name}.m4a`);

            /*Downloading ,Converting mp4 youtube video using video_id  */
            const ytdl = spawn('youtube-dl', [
                '-o',//output
                '-',//stdout
                '--format=140',
               // 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',//best mp4 extension , else best
                //'--recode-video',//recode video 
                //'mp4',//to mp4 if not mp4
                '-a',//input stream
                '-'//stdin
            ])
            .on('error',(err)=>next(err))
            .on('exit',(code)=>console.log(`Ytdl exited with code ${code}`));
            
            /* Setting output pipe first so that we dont lose any bits */
            ytdl.stdout.pipe(res).on('error',(err)=>next(err));

            /*Catching error on stdin */
            ytdl.stdin.on('error',(err)=>next(err));

            /* Writing video url to stdin for youtube-dl */
            ytdl.stdin.write(`http://www.youtube.com/watch?v=${vid}`)

            /*Closing the input stream; imp, else it waits */
            ytdl.stdin.end();
            

        } catch (error) {
            next(error);
    }
});
  

/* Send mp4 download for video_id youtube */
router.get('/download/video/:vid/:name?', (req,res,next)=>{
  let {vid,name} = req.params;
    vid = decodeURIComponent(vid);/*video id */
    name = name? decodeURIComponent(name):vid;/* Name: Optional Parameter for sending `name`.mp3 */
    
    //youtube-dl -x --audio-format mp3 http://www.youtube.com/watch?v=8veo4Uf6CR8 -f bestaudio   

    /*Perfect CODE  */
    /*Perfect CODE  */
    try {
            /* response attachment for triggering download instead of stream */
            res.attachment(`${name}.mp4`);

            /*Downloading ,Converting mp4 youtube video using video_id  */
            const ytdl = spawn('youtube-dl', [
                '-o',//output
                '-',//stdout
                '--format=18',
               // 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',//best mp4 extension , else best
                //'--recode-video',//recode video 
                //'mp4',//to mp4 if not mp4
                '-a',//input stream
                '-'//stdin
            ])
            .on('error',(err)=>next(err))
            .on('exit',(code)=>console.log(`Ytdl exited with code ${code}`));
            
            /* Setting output pipe first so that we dont lose any bits */
            ytdl.stdout.pipe(res).on('error',(err)=>next(err));

            /*Catching error on stdin */
            ytdl.stdin.on('error',(err)=>next(err));

            /* Writing video url to stdin for youtube-dl */
            ytdl.stdin.write(`http://www.youtube.com/watch?v=${vid}`)

            /*Closing the input stream; imp, else it waits */
            ytdl.stdin.end();
            

        } catch (error) {
            next(error);
    }
});

module.exports = router;

