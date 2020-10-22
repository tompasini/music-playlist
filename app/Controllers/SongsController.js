import songService from "../Services/SongsService.js";
import { ProxyState } from "../AppState.js"

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let template = ''
  ProxyState.songs.forEach(s => template += /*html*/ `<div onclick = "app.songsController.getActiveSong('${s._id}')"class = "pointer m-2 bg-light rounded shadow-lg"><h3>${s.artist}</h3><h3>${s.title}</h3></div>`)
  document.getElementById('songs').innerHTML = template

}

function _drawActiveSong() {

  if (ProxyState.activeSong) {
    document.getElementById('active-song').innerHTML = ProxyState.activeSong.Template
  } else {
    document.getElementById('active-song').innerHTML = ""
  }
}

function _drawPlaySong() {

  if (ProxyState.mySong) {

    document.getElementById('active-song').innerHTML = ProxyState.mySong.mySong
  } else {
    document.getElementById('active-song').innerHTML = ""
  }
}

/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let template = ''
  ProxyState.playlist.forEach(s => template += s.playlistTemplate)
  document.getElementById('playlist').innerHTML = template

}

//Public
export default class SongsController {
  constructor() {
    ProxyState.on("songs", _drawResults)
    ProxyState.on("activeSong", _drawActiveSong)
    ProxyState.on("playlist", _drawPlaylist)
    ProxyState.on("mySong", _drawPlaySong)
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  addSong(id) {
    try {
      songService.addSong(id)
    } catch (error) {
      console.error(error);
    }

  }


  removeSong(id) {
    try {
      songService.removeSong(id)
    } catch (error) {
      console.error(error);
    }

  }


  getActiveSong(index) {
    try {
      songService.getActiveSong(index)
    } catch (error) {
      console.error(error);
    }
  }

  playSong(index) {
    try {
      songService.playSong(index)
    } catch (error) {
      console.error(error);
    }
  }
}

