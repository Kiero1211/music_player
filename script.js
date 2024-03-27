const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const app = {
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

    scrollHandler: function() {
        const cd = $(".cd");
        const cdWidth = cd.offsetWidth;

        document.onscroll = function() {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            
            let newCdWidth = (cdWidth - scrollTop) > 0 ? (cdWidth - scrollTop) : 0;
            cd.style.width = newCdWidth + "px";
            cd.style.opacity = newCdWidth / cdWidth;
        }
    },

    start: function() {
        this.scrollHandler();
        this.render();
    },
    
}

app.start();
