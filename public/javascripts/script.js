function Search(){
    let q = this.document.getElementById('search').value;
    console.log(q);
    q=encodeURIComponent(q);
    let elements = this.document.getElementsByClassName('del');
    console.log(elements);
    while(elements.length>0){
        elements[0].remove();
        console.log(elements);
    }
    console.log(elements);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            ShowResults(xmlHttp.responseText);
    }
    xmlHttp.open("GET", '/youtube/'+q, true); // true for asynchronous 
    xmlHttp.send(null);

    

}
function ShowResults(response){
  let json=JSON.parse(response);
  if(json.items==null||json.items.length==null){
    console.log("YOUTUBE API Key NOT SET, using dummy data");
    json = dummy_data;
  }
  
    let template = '<section class="text-gray-500 bg-gray-900 body-font">'+
  '<div class="container px-5 py-24 mx-auto">'+
    '<div class="flex flex-wrap -mx-4 -mb-10 text-center">'+
      '<div class="sm:w-1/1 mb-10 px-15">'+
        '<div class="rounded-lg h-64 overflow-hidden">'+
          '<img alt="content" class="object-cover object-center h-full w-full" src="THUMBNAIL_URL">'+
        '</div>'+
        '<a href="YOUTUBE_URL"class="title-font text-2xl font-medium text-white mt-6 mb-3">TITLE</a>'+
        '<p class="leading-relaxed text-xl">CHANNEL</p>'+
        '<p class="leading-relaxed text-base">DESCRIPTION</p>'+
        '<button class="flex mx-auto mt-6 text-white bg-purple-500 border-0 py-2 px-5 focus:outline-none hover:bg-purple-900 rounded"onclick="DownloadAudio(`VIDEO_ID`,`TITLE`)">Download Audio</button>'+
        '<button class="flex mx-auto mt-6 text-white bg-purple-500 border-0 py-2 px-5 focus:outline-none hover:bg-purple-900 rounded"onclick="DownloadVideo(`VIDEO_ID`,`TITLE`)">Download Video</button>'+
      '</div>'+
    '</div>'+
  '</div>'+
'</section>';

  let thumbnail_url = 'http://i3.ytimg.com/vi/g1ARRcK4LVs/hqdefault.jpg';
  let title = ' Terror in Resonance – Opening Theme – Trigger ';
  let channel = 'Funinmation';
  let desc = 'vdescription';
  let vid = '21212';
  let container = this.document.getElementsByClassName('container')[0];
  for(let i=0;i<json.items.length;i++){
      let copy = template;

      thumbnail_url = json.items[i].snippet.thumbnails.high.url;
      title = json.items[i].snippet.title;
      channel = json.items[i].snippet.channelTitle;
      desc = json.items[i].snippet.description;
      vid = json.items[i].id.videoId;

      /*Sequence of $ in template, replaces one at a time */
      template = template.replace(/YOUTUBE_URL/g,`https://www.youtube.com/watch?v=${json.items[i].id.videoId}`);
      template = template.replace(/THUMBNAIL_URL/g,thumbnail_url);
      template = template.replace(/TITLE/g,title);
      template = template.replace(/CHANNEL/g,channel);
      template = template.replace(/DESCRIPTION/g,desc);
      template = template.replace(/VIDEO_ID/g,vid);

      contain.innerHTML+=template;
      template=copy;
  }
}
function DownloadAudio(vid,name){
  console.log(vid);
  console.log(name);
  vid=encodeURIComponent(vid);
  name=encodeURIComponent(name);
  let url = window.location.href+'youtube/download/audio/'+vid+'/'+name;//For Production 
  window.open(
    url,
    "_blank");
}
function DownloadVideo(vid,name){
  console.log(vid);
  console.log(name);
  vid=encodeURIComponent(vid);
  name=encodeURIComponent(name);
  let url = window.location.href+'youtube/download/video/'+vid+'/'+name;
  window.open(
    url,
    "_blank");
}


/** 
 * Given below is dummy data used if you dont set up Youtube API Key
 * 
 * 
*/
var dummy_data = {
  "kind": "youtube#searchListResponse",
  "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/S_PLKqI9Zt2HmwCJspqQYOg-u5k\"",
  "nextPageToken": "CAUQAA",
  "regionCode": "IN",
  "pageInfo": {
    "totalResults": 13693,
    "resultsPerPage": 5
  },
  "items": [
    {
      "kind": "youtube#searchResult",
      "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/HZDqvlA0z3C-pguGqT1g3V7XYVg\"",
      "id": {
        "kind": "youtube#video",
        "videoId": "g1ARRcK4LVs"
      },
      "snippet": {
        "publishedAt": "2014-07-24T20:08:42.000Z",
        "channelId": "UCVi2lI40LetxLBKn-rtWC3A",
        "title": "Terror in Resonance – Opening Theme – Trigger",
        "description": "\"Trigger” by Yuuki Ozaki Don't miss out on the latest new series by the creator of Cowboy Bebop—watch today! http://funi.to/TiR_yt In an alternate version of the ...",
        "thumbnails": {
          "default": {
            "url": "https://i3.ytimg.com/vi/g1ARRcK4LVs/hqdefault.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i3.ytimg.com/vi/g1ARRcK4LVs/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i3.ytimg.com/vi/g1ARRcK4LVs/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Funimation",
        "liveBroadcastContent": "none"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/8B72dVLaKRW9TfJ53p0PZFgPu8Q\"",
      "id": {
        "kind": "youtube#video",
        "videoId": "zZJUsz6N0Ws"
      },
      "snippet": {
        "publishedAt": "2017-06-13T21:08:02.000Z",
        "channelId": "UCkuRQioCHPNxD211ftqvpbg",
        "title": "Yuuki Ozaki - Trigger (Zankyou no Terror Opening Full)",
        "description": "Hope you enjoy!!! ------------------------------------------------------------ Soundcloud: https://soundcloud.com/0070071234567 Wattpad: ...",
        "thumbnails": {
          "default": {
            "url": "https://i3.ytimg.com/vi/zZJUsz6N0Ws/hqdefault.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i3.ytimg.com/vi/zZJUsz6N0Ws/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i3.ytimg.com/vi/zZJUsz6N0Ws/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Bread Dictionary",
        "liveBroadcastContent": "none"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/I-6OeAe_wzl2tpIMiFr0byxC_Ms\"",
      "id": {
        "kind": "youtube#video",
        "videoId": "jVOJvSEFa8c"
      },
      "snippet": {
        "publishedAt": "2014-11-06T14:32:10.000Z",
        "channelId": "UCRLfeU4Fl_OpGWog99a_ojA",
        "title": "Zankyou No Terror Opening En HD by SolciLA",
        "description": "espero que les guste,si es asi denle a like o a favorito...si te gusta los otros openings o endings SUSCRIBETE,es gratis xD.",
        "thumbnails": {
          "default": {
            "url": "https://i3.ytimg.com/vi/jVOJvSEFa8c/hqdefault.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i3.ytimg.com/vi/jVOJvSEFa8c/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i3.ytimg.com/vi/jVOJvSEFa8c/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "SolciLA Funny Moments And Moar",
        "liveBroadcastContent": "none"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/ulaSvlwmJ3m5fZ-9vpsrpl-L42A\"",
      "id": {
        "kind": "youtube#video",
        "videoId": "AV7QjFdNkUk"
      },
      "snippet": {
        "publishedAt": "2014-09-02T20:33:09.000Z",
        "channelId": "UCYm52ukkQJz5g4e0uQv6seQ",
        "title": "Zankyou no Terror/残響のテロル「Dare ka, Umi wo.」",
        "description": "I do not own nor am I affiliated in any way with Zankyou no Terror or Aimer. This video is for entertainment purposes only. In an alternate iteration of the present, ...",
        "thumbnails": {
          "default": {
            "url": "https://i3.ytimg.com/vi/AV7QjFdNkUk/hqdefault.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/AV7QjFdNkUk/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/AV7QjFdNkUk/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "glitchednight",
        "liveBroadcastContent": "none"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/qq96MkfSGkjQ9nhf4pQPV-_iDU0\"",
      "id": {
        "kind": "youtube#video",
        "videoId": "YiVomjr1-lM"
      },
      "snippet": {
        "publishedAt": "2018-09-24T04:03:14.000Z",
        "channelId": "UC6X692Yq3vDICtZCdnqyMnw",
        "title": "ZANKYOU NO TERROR | Yuuki Ozaki - TRIGGER (Full Opening)(Traducido al Español) + Lyrics",
        "description": "Sinopsis: Tokio ha sido diezmada por un sorpresivo ataque terrorista y la única evidencia de los culpables...",
        "thumbnails": {
          "default": {
            "url": "https://i3.ytimg.com/vi/YiVomjr1-lM/hqdefault.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/YiVomjr1-lM/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/YiVomjr1-lM/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "ANTHERLAND",
        "liveBroadcastContent": "none"
      }
    }
  ]
};
