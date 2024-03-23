console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let gif = document.getElementById('gif');
let SongItems = Array.from(document.getElementsByClassName('songItem'));
let myProgressbar = document.getElementById("myProgressbar");
let songs = [
    { songname: "one", filepath: "songs/1.mp3", coverpath: "covers/1.jpg" },
    { songname: "two", filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
    { songname: "three", filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
    { songname: "four", filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
    { songname: "five", filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
    { songname: "six", filepath: "songs/6.mp3", coverpath: "covers/6.jpg" },
    { songname: "seven", filepath: "songs/7.mp3", coverpath: "covers/7.jpg" },
    { songname: "eight", filepath: "songs/8.mp3", coverpath: "covers/8.jpg" },
    { songname: "nine", filepath: "songs/9.mp3", coverpath: "covers/9.jpg" },
    { songname: "ten", filepath: "songs/10.mp3", coverpath: "covers/10.jpg" }
];

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-regular', 'fa-play-circle', 'fa-2x');
        masterPlay.classList.add("fa-regular", "fa-pause-circle", 'fa-2x');
        SongItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.remove('fa-play-circle');
        SongItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-regular', 'fa-pause-circle', 'fa-2x');
        masterPlay.classList.add('fa-regular', 'fa-play-circle', 'fa-2x');
        SongItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.remove('fa-pause-circle');
        SongItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressbar.value = progress;
});

myProgressbar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressbar.value / 100) * audioElement.duration;
});

SongItems.forEach((element, i) => {
    console.log(element, i)
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songname;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
};

const playPause = () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        const clickedSongIndex = parseInt(e.target.id);
        if (clickedSongIndex === songIndex && !audioElement.paused) {
            // Pause the currently playing song
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            // Play the clicked song
            songIndex = clickedSongIndex;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = songs[songIndex].filepath;
            masterSongName.innerText = songs[songIndex].songname;
            audioElement.currentTime = 0;
            playPause();
        }
    });
});
document.getElementById('next').addEventListener('click', () => {
    // Remove pause icon from the current song item
    SongItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.remove('fa-pause-circle');
    SongItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.add('fa-play-circle');

    // Update songIndex to the next song
    songIndex = (songIndex + 1) % songs.length;

    // Update the audio source and song name
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songname;

    // Play the next song
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;

    // Update masterPlay button icon to pause
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // Update play/pause icon of the current song item in the list
    SongItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.remove('fa-play-circle');
    SongItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    // Remove pause icon from the current song item
    SongItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.remove('fa-pause-circle');
    SongItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.add('fa-play-circle');

    // Update songIndex to the previous song
    songIndex = (songIndex - 1 + songs.length) % songs.length;

    // Update the audio source and song name
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songname;

    // Play the previous song
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;

    // Update masterPlay button icon to pause
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // Update play/pause icon of the current song item in the list
    SongItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.remove('fa-play-circle');
    SongItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.add('fa-pause-circle');
});
