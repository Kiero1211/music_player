const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//Get common elements
const cd = $(".cd");
const header = $("header h2");
const songThumbnail = $(".cd-thumb");
const audio = $("audio");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");

const app = {
    currentIndex: 1,
    isPlaying: false,
    isRandom: false,
    songs: [
        {
            name: "Look what you made me do",
            singer: "Taylor Swift",
            path: "./assets/music/Look_what_you_made_me_do.mp3",
            image: "./assets/img/Look_what_you_made_me_do.jpeg"
        },
        {
            name: "Love story",
            singer: "Taylor Swift",
            path: "./assets/music/Love_story.mp3",
            image: "./assets/img/Love_story.jpeg"
        },
        {
            name: "Wildest dreams",
            singer: "Taylor Swift",
            path: "./assets/music/Wildest_dreams.mp3",
            image: "./assets/img/Wildest_dreams.jpeg"
        },
        {
            name: "Người kế nhiệm",
            singer: "Nhậm Nhiên",
            path: "./assets/music/Nguoi_ke_nhiem.mp3",
            image: "./assets/img/Nguoi_ke_nhiem.jpeg"
        },
        {
            name: "Phi điểu và ve sầu",
            singer: "Nhậm Nhiên",
            path: "./assets/music/Phi_dieu_va_ve_sau.mp3",
            image: "./assets/img/Phi_dieu_va_ve_sau.jpeg"
        },
        {
            name: "Sáng mắt chưa",
            singer: "Trúc Nhân",
            path: "./assets/music/Sang_mat_chua.mp3",
            image: "./assets/img/Sang_mat_chua.webp"
        },
        {
            name: "Lớn rồi còn khóc nhè",
            singer: "Trúc Nhân",
            path: "./assets/music/LRCKN.mp3",
            image: "./assets/img/LRCKN.jpeg"
        },
    ],
    render: function() {
        const html = this.songs.map(song => {
            return `
            <div class="song">
                <div
                    class="thumb"
                    style="background-image: url(${song.image})"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `;
        });
        $(".playlist").innerHTML = html.join('');
    },

    eventHandler: function() {
        const cdWidth = cd.offsetWidth;

        const songThumbnailAnimate = songThumbnail.animate([
            {transform: "rotate(360deg)"}
        ], {
            duration: 10000, // 10 seconds
            iterations: Infinity
        })
        songThumbnailAnimate.pause();

        //Handling scroll event
        document.onscroll = function() {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            
            let newCdWidth = (cdWidth - scrollTop) > 0 ? (cdWidth - scrollTop) : 0;
            cd.style.width = newCdWidth + "px";
            cd.style.opacity = newCdWidth / cdWidth;
        }

        //Handling clicking playbtn event
        playBtn.onclick = () => {
            if (app.isPlaying) {
                audio.pause();
                songThumbnailAnimate.pause();
            } else {
                audio.play();
                songThumbnailAnimate.play();
            }
        };

        //Process when audio is playing
        audio.onplay = () => {
            app.isPlaying = true;
            player.classList.add("playing");
        };

        //Process when audio is paused
        audio.onpause = () => {
            app.isPlaying = false;
            player.classList.remove("playing");
        };


        //Keep updating the progress bar
        audio.ontimeupdate = () => {
            if (audio.duration) {
                let progressPercent = audio.currentTime / audio.duration * 100;
                progress.value = progressPercent;
            }
        };
        
        //Process when user click on the progress bar
        progress.oninput = (e) => {
            let clickedPercent = e.target.value;
            let newTime = (audio.duration / 100) * clickedPercent;
            audio.currentTime = newTime;
        }

        //Handle next & prev btn
        nextBtn.onclick = () => {
            if (app.isRandom) {
                app.playRandom();
            } else {
                app.nextSong();
            }
            audio.play();
        }

        prevBtn.onclick = () => {
            if (app.isRandom) {
                app.playRandom();
            } else {
                app.prevSong();
            }
            audio.play();
        }

        //Handle shuffle button
        randomBtn.onclick = () => {
            app.isRandom = !app.isRandom;
            randomBtn.classList.toggle("active");
        };
    },

    defineProperties: function() {
        Object.defineProperty(this, "getCurrentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },

    loadCurrentSong: function() {
        header.innerText = this.getCurrentSong.name;
        songThumbnail.style.backgroundImage = `url("${this.getCurrentSong.image}")`;
        audio.src = this.getCurrentSong.path;
    },

    nextSong: function() {
        if (this.currentIndex < this.songs.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        app.loadCurrentSong();
    },
    
    prevSong: function() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.songs.length - 1;
        }
        app.loadCurrentSong();
    },

    playRandom: function() {
        let newIdx;
        do {
            newIdx = Math.floor(Math.random() * this.songs.length);
        } while (newIdx === this.currentIndex);
        this.currentIndex = newIdx;
        app.loadCurrentSong();
    },

    start: function() {
        //Handle all events
        this.eventHandler();

        //Define method to get current song
        this.defineProperties();

        //Load current song
        this.loadCurrentSong();

        //Load all songs
        this.render();
        
    },
    
}

app.start();
