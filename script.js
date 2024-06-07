

console.log("techno");

let currentSong = new Audio();

function convertSecondsToMinutes(seconds) {
    // Round the seconds to the nearest whole number
    const roundedSeconds = Math.round(seconds);
    
    // Calculate the number of minutes and remaining seconds
    const mins = Math.floor(roundedSeconds / 60);
    const secs = roundedSeconds % 60;
    
    // Format minutes and seconds to always show two digits
    const formattedMins = mins.toString().padStart(2, '0');
    const formattedSecs = secs.toString().padStart(2, '0');
    
    // Combine minutes and seconds in the required format
    return `${formattedMins}:${formattedSecs}`;
}




async function getSongs(){
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    // console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response

    let songs = [];

    let as = div.getElementsByTagName("a");
    console.log(as);

    for(let i=0;i<as.length;i++){
        if(as[i].href.endsWith(".mp3")){
            songs.push(as[i].href.split("/songs/")[1] );
        }
    }

    return songs;
}

const playMusic = (track, pause = false) =>{
    let audio = new Audio( "/songs/" + track);
    currentSong.src = "/songs/"+ track;

    if(!pause){
        currentSong.play();
        playy.src = "pause.svg";
    }
    
    document.querySelector(".songInfo").innerHTML = decodeURI(track);
    document.querySelector(".songTime").innerHTML =" 10:00";
}

async function main(){
    let songs = await getSongs();
    
    playMusic(songs[0], true);

    let songUL = document.querySelector(".songsList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
        
        
                            <img src="music.svg" alt="">
                            <div class="musicInfo">
                                <div class="songName">
                                     ${song.replaceAll("%20", " ")}
                                </div>
                                <div class="songArtist">
                                    Techno
                                </div>
                            </div>
         </li>`;
    }

    // atttach an evenet listner
    Array.from(document.querySelector(".songsList").getElementsByTagName("li")).forEach(e=>{

        e.addEventListener("click", element=>{
            console.log(e.querySelector(".songName").innerHTML);
            playMusic(e.querySelector(".songName").innerHTML.trim());
        })
        
    })

    // attach evenet listner to buttons
    playy.addEventListener("click", () =>{
        if(currentSong.paused){
            currentSong.play();
            playy.src = "pause.svg";
        }
        else{
            currentSong.pause();
            playy.src = "playy.svg";
        }
    })

    //listen to time update
    currentSong.addEventListener("timeupdate", ()=>{
        document.querySelector(".songTime").innerHTML = `${convertSecondsToMinutes(currentSong.currentTime)}
        /${convertSecondsToMinutes(currentSong.duration)} `;
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".circle").style.left = currentSong.currentTime/currentSong.duration * 100 + "%";
    })

    // addding an event listner to seek bar to seek by clicking
    document.querySelector(".seekbar").addEventListener("click", e =>{
        
        console.log(e.offsetX);
        // console.log(e.target.getBoundingClientRect());
        // console.log(e.offsetX/ e.target.getBoundingClientRect().width) * 100 ;
        let position = (e.offsetX / e.target.getBoundingClientRect().width) *100;
        document.querySelector(".circle").style.left = position  + "%";
        currentSong.currentTime = position * currentSong.duration /100;
    })

   
}

main();



