const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;
let playlistTracks = [];




// Songs info
const songs = [
    {
        title: 'Green Chair',
        artist: 'Diego Nava',
        coverPath: 'assets/images/cover1.jpg',
        discPath: 'assets/music/music1.mp3',
        duration: '1:33',
    },
    {
        title: 'Dance with Me',
        artist: 'Ahjay Stelino',
        coverPath: 'assets/images/cover2.jpg',
        discPath: 'assets/music/music2.mp3',
        duration: '2:22',
    },
    {
        title: 'Gimme that Bottle',
        artist: 'Michael Ramir',
        coverPath: 'assets/images/cover3.jpg',
        discPath: 'assets/music/music3.mp3',
        duration: '1:54',
    },
    {
        title: 'One More',
        artist: 'LS',
        coverPath: 'assets/images/cover4.jpg',
        discPath: 'assets/music/music4.mp3',
        duration: '2:44',
    },
];

// Load song initially
loadSong(songs[songIndex]);

// Adding tracks to the playlist
function addTrackToPlaylist(file) {
    playlistTracks.push(file);
    renderPlaylist();
}

// Function to render the playlis
function renderPlaylist() {
    const playlistElement = document.getElementById('playlist');
    playlistElement.innerHTML = '';

    playlistTracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = track.name;
        li.setAttribute('data-index', index);
        li.addEventListener('click', () => playTrack(index));
        playlistElement.appendChild(li);
    });
}

// Function to update the playtrack
function playTrack(index) {
    // Get the selected track from the playlistTracks array using the index
    const track = playlistTracks[index];

    // Update the audio source and play the track
    const audioElement = document.getElementById('disc');
    audioElement.src = URL.createObjectURL(track);
    audioElement.play();
}

const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    for (const file of files) {
        addTrackToPlaylist(file);
    }
});


// Load the given song
function loadSong(song) {
    cover.src = song.coverPath;
    disc.src = song.discPath;
    title.textContent = song.title;
    artist.textContent = song.artist;
    duration.textContent = song.duration;
}

// Toggle play and pause
function togglePlayPause() {
    if (disc.paused) {
        disc.play();
    } else {
        disc.pause();
    }
}

// Update play/pause icon
function updatePlayPauseIcon() {
    play.classList.toggle('fa-play');
    play.classList.toggle('fa-pause');
}

// Update progress bar
function updateProgress() {
    const { currentTime, duration } = disc;
    progress.style.width = `${(currentTime / duration) * 100}%`;

    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    timer.textContent = `${minutes}:${seconds}`;
}

// Reset the progress
function resetProgress() {
    progress.style.width = 0;
    timer.textContent = '0:00';
}

// Go to previous song
function goToPreviousSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    resetProgress();
    if (!disc.paused) {
        disc.play();
    }
}

// Go to next song
function goToNextSong(playImmediately) {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    resetProgress();
    if (playImmediately || !disc.paused) {
        disc.play();
    }
}


// Change song progress when clicked on progress bar
function setProgress(event) {
    const totalWidth = this.clientWidth;
    const clickWidth = event.offsetX;
    const clickWidthRatio = clickWidth / totalWidth;
    disc.currentTime = clickWidthRatio * disc.duration;
}

// Play/Pause when play button clicked
play.addEventListener('click', togglePlayPause);

// Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', () => goToNextSong(true));

// Go to previous song when previous button clicked
prev.addEventListener('click', goToPreviousSong);

// Go to next song when next button clicked
next.addEventListener('click', () => goToNextSong(false));

// Move to different place in the song
progressContainer.addEventListener('click', setProgress);
