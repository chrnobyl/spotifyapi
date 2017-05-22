$( document ).ready(function(){
    console.log( "ready!" );
    $('#search').click(function (){
      search()
    })
});

function appendResult(data){
    debugger
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


function appendAlbumResult(data){
  const albums = data.items
  const albumList = $('#album-list')
  let albumNames = []
  let albumReturn = []

  for (var el in albums){
      if ( !albumNames.includes(albums[el].name)){
          albumNames.push(albums[el].name)
          albumReturn.push(albums[el])
      }
  }


  const albumBullet = albumReturn.map(function(album){
    return `<li><ul id=${album.id}><h1>${album.name}</h1></ul></li>`
  })
  let artistName = ''
  const albumIds = albums.map(function (album){
    artistName = album.artists[0].name

    var idObj = {}
    var urlObj = {}
    idObj["id"] = album.id
    urlObj["url"] = album.images[1].url
    return {idObj, urlObj}
  })
  albumList.html(albumBullet.join(''))
  $("#album-list").prepend(`<h1>${artistName}</h1>`)
  //append images after titles load

  for(var image in albumIds){
      let id = $(`#${albumIds[image].idObj.id}`)
      let url = `<img src=${albumIds[image].urlObj.url} class="coverArt">`
          id.append(url)
  }
}


function search() {
  let searchVal = $('.search-box').val()
  if (searchVal.includes(" ")){
    searchVal = searchVal.split(" ").join("%20")
  }
    $.ajax({
      url: "https://api.spotify.com/v1/search?q=" + `${searchVal}&type=artist`,
      dataType: 'json',
      success: function (data){
        appendResult(data)
      }
    })
}
