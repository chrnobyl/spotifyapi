$( document ).ready(function(){
    console.log( "ready!" );
    $('#search').click(function (){
      search()
    })

});

function appendResult(data){
  const artists = data.artists.items
  const list = $('#result-list')
  const nameResults = []
  const results = []

  for (var el in artists){
    if( !nameResults.includes(artists[el].name )){
      nameResults.push(artists[el].name)
      results.push(artists[el])
    }
  }

  


  const bullet = results.map(function(artist){
    return `<li><a href="#" id="${artist.id}" class="artistName"> ${artist.name}</a></li>`
})

    list.html(bullet.join(''))
    assignArtistHandler()
}

function appendAlbumResult(data){
  const albums = data.items
  const albumList = $('#album-list')
  const albumBullet = albums.map(function(album){
    return `<li><h1>${album.name}</h1></li>`
  })

  albumList.html(albumBullet.join(''))

}

function assignArtistHandler(){
  $('.artistName').click(function (){
    let artistId = this.id
    $.ajax({
      url: 'https://api.spotify.com/v1/artists/' + artistId + '/albums',
      dataType: 'json',
      success: function (data){
        appendAlbumResult(data)
      }
    })
  })
}


function search() {
  let searchVal = $('.search-box').val()
    $.ajax({
      url: "https://api.spotify.com/v1/search?q=" + `${searchVal}&type=artist`,
      dataType: 'json',
      success: function (data){
        appendResult(data)
      }
    })

}

function searchAlbums() {
  debugger


}
