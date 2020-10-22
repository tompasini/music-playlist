export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  get Template() {
    return /*html*/`
    <h3>Now Playing</h3>
    <img src="${this.albumArt}" alt="Album Art">
    <h2>${this.artist}-${this.title}</h2>
    <p>${this.album}/${this.price}</p>
    <audio autoplay controls src="${this.preview}"></audio>
    <button class="btn btn-success btn-block" onclick="app.songsController.addSong('${this._id}')">Add to Playlist</button>
        `;
  }

  get mySong() {
    return /*html*/`
    <h3>Now Playing</h3>
    <img src="${this.albumArt}" alt="Album Art">
    <h2>${this.artist}-${this.title}</h2>
    <p>${this.album}/${this.price}</p>
    <audio autoplay controls src="${this.preview}"></audio>
    `
  }

  get playlistTemplate() {
    return /*html*/`<div class="m-2 bg-light rounded shadow-lg">
    <h3 class="pointer" onclick = "app.songsController.playSong('${this._id}')">${this.title}</h3><h3>${this.artist}</h3> 
    <button onclick="app.songsController.removeSong('${this._id}')" class="btn btn-danger btn-block">Delete Song</button>
    </div>`
  }
}
