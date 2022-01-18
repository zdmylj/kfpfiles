var timer = null;
var vm = new Vue({
	el: "#app",
	data: {
		coverList: [],
		coverUrl: "",
		musicUrl: "",
		songList: [],
		kfp1: true,
		kfp2: false,
		kfp3: false,
		title: "",
		author: "",
		playinfo: "",
		album: "",
		cover: ""
	},
	methods: {
		getSongsAndCover(songs, name) {
			//this.coverUrl = "https://kfp-music.oss-cn-hongkong.aliyuncs.com/Cover/"+cover+".jpg";
			this.songList = songs;
			if (name == "Kung Fu Panda (Original Motion Picture Soundtrack)") {
				this.kfp1 = true;
				this.kfp2 = false;
				this.kfp3 = false;
			}
			if (name == "Kung Fu Panda 2 (Music From The Motion Picture)") {
				this.kfp1 = false;
				this.kfp2 = true;
				this.kfp3 = false;
			}
			if (name == "Kung Fu Panda 3 (Music From The Motion Picture)") {
				this.kfp1 = false;
				this.kfp2 = false;
				this.kfp3 = true;
			}
			this.cover = name;
		},
		getCoverUrlAndMusicUrl(title, index, itemindex, author) {
			index = (index + 1).toString().padStart(2, "0");
			this.coverUrl = "https://pan.xzit.top/d/123pan/kfpfiles/music/ost/covers/cover" + itemindex +
			".jpg";
			this.musicUrl = "https://pan.xzit.top/d/123pan/kfpfiles/music/ost/songs/" + itemindex + "/" +
				index +
				" " + "-" + " " + title + ".flac";
			switch (itemindex) {
				case 1:
					document.body.className = "bg1";
					break;
				case 2:
					document.body.className = "bg2";
					break;
				case 3:
					document.body.className = "bg3";
					break;
			}
			this.title = title;
			this.author = "艺术家:" + author;
			this.album = "专辑:" + this.cover;
			this.playinfo = "即将播放:";
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			timer = setTimeout(function() {
				var src = document.getElementsByTagName("audio")[0].src;
				src = src.charAt(src.length - 1);
				if (src == "c") {
					document.getElementsByTagName("audio")[0].play();
				} else {
					alert("音乐链接获取失败，可能网络不稳定，再试一下吧");
				}
			}, 1000)
		},
		getDownloadUrl(title, index, itemindex) {
			index = (index + 1).toString().padStart(2, "0");
			return "https://pan.xzit.top/d/123pan/kfpfiles/music/ost/songs/" + itemindex + "/" + index + " " +
				"-" + " " + title + ".flac?response-content-type=application/octet-stream";
		},
		play() {
			this.playinfo = "正在播放:";
		},
		pause() {
			this.playinfo = "已暂停播放:";
		}
	},
	mounted() {
		axios.get('./kfp.json')
			.then(res => {
				//console.log(res.data.album.kfp1.songs);
				for (let key in res.data.album) {
					this.coverList.push(res.data.album[key]);
				}
				this.songList = res.data.album.kfp1.songs;
				this.coverUrl = "https://pan.xzit.top/d/123pan/kfpfiles/music/ost/covers/" + res.data
					.cover +
					".jpg";
				document.body.className = "bg";
				this.cover = "Kung Fu Panda (Original Motion Picture Soundtrack)";
				this.playinfo = "点击一首试试吧";
				//this.musicUrl = "https://kfp-music.oss-cn-hongkong.aliyuncs.com/Music/1/15 - Panda Po.flac"
			}, err => {})
	}
})
