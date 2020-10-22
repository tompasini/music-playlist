import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {


  constructor() {
    this.getMySongs()
  }

  playSong(index) {
    let song = ProxyState.playlist.find(s => s._id == index)
    ProxyState.mySong = song
  }

  getActiveSong(index) {
    let song = ProxyState.songs.find(s => s._id == index)
    ProxyState.activeSong = song
    console.log(ProxyState.activeSong)
  }
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        let results = res.results
        let filterResults = results.filter(r => r.kind == 'song')
        ProxyState.songs = filterResults.map(rawData => new Song(rawData));
        console.log(ProxyState.songs)
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    let res = await sandBoxApi.get()
    //TODO What are you going to do with this result
    let results = res.data.data.map(rawData => new Song(rawData));
    ProxyState.playlist = results
    console.log(ProxyState.playlist)
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong(id) {
    let addedSong = ProxyState.songs.find(s => s._id == id)
    let res = await sandBoxApi.post("", addedSong)
    // debugger
    // this.getMySongs()
    ProxyState.playlist = [...ProxyState.playlist, addedSong]



    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {
    let res = await sandBoxApi.delete("" + id)
    // this.getMySongs()
    ProxyState.playlist = ProxyState.playlist.filter(s => s._id != id)
    ProxyState.mySong = null
    //TODO Send the id to be deleted from the server then update the store
  }
}

const service = new SongsService();
export default service;
