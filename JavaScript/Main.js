const music = document.querySelector('audio');
const play = document.getElementById('play');
const img = document.querySelector('img');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
let progress = document.getElementById('progress');
let CurrentTime = document.getElementById('current_time');
let Duration = document.getElementById('duration');
let ProgressBar= document.getElementById('progress_div');

const songs = [
    {
        name: 'BadBoy',
        title: 'Bad-Boy',
        artist: 'Jesica Viv'
    },
    {
        name: 'SlowDown',
        title: 'Slow-Down',
        artist: 'Serika'
    },
    {
        name: 'Wafa',
        title: 'Wafa',
        artist: 'Jubin Nautiyal'
    }
]


let isPlaying = false;
const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    img.classList.add('anime');
};


const pauseMusic = () => {

    isPlaying = false
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    img.classList.remove('anime');
};


play.addEventListener('click', () => {
    // if(isPlaying){
    //     pauseMusic();
    // }else{
    //     playMusic();
    // }

    isPlaying ? pauseMusic() : playMusic();
});

// Changing Music 


const loadSongs = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    img.src = `img/${songs.name}.jpg`;
    music.src = `music/${songs.name}.mp3`;
}
SongIndex = 0;


const nextSong = () => {
    SongIndex = (SongIndex + 1) % songs.length;
    loadSongs(songs[SongIndex]);
    playMusic();
}
const prevSong = () => {
    SongIndex = (SongIndex - 1 + songs.length) % songs.length;
    loadSongs(songs[SongIndex]);
    playMusic();
}

// use timeupdate event for audio duration and cuurent time

music.addEventListener('timeupdate', (e) => {
    // console.log(e);
    const { currentTime, duration } = e.srcElement;


    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    //  Music duartion update
    //  console.log(duration);

    let Min_Duaration = Math.floor(duration / 60);
    let Sec_Duaration = Math.floor(duration % 60);

    let Tot_duration = `${Min_Duaration}:${Sec_Duaration}`;
    if (duration) {
        Duration.textContent = ` ${Tot_duration}`;
    }
    //  Current Duaration Update

    let Min_currentTime = Math.floor(currentTime / 60);
    let Sec_CurrentTime = Math.floor(currentTime % 60);


    if (Sec_CurrentTime < 10) {
        Sec_CurrentTime = `0${Sec_CurrentTime}`;
    }
    let Tot_CurrentTime = `${Min_currentTime}:${Sec_CurrentTime}`;
    CurrentTime.textContent = ` ${Tot_CurrentTime}`;

})
// Set music on Progress bar 
ProgressBar.addEventListener('click' , (e) =>{
    // console.log(e);
    const { duration } = music ;
    let move_progress = (e.offsetX/e.srcElement.clientWidth)*duration ;
    // console.log(move_progress);
    // console.log(duration);'=
    music.currentTime =  move_progress
})



// If music is ended play next song
music.addEventListener('ended', nextSong);
// call functions  when next or prev event are trigger
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);