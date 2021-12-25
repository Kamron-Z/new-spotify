import {
   playlists,
   music,
   carusel
} from './data.js'

let body = document.body
let randomTitle = document.querySelector('#randomTitle')
let reloadRandom = document.querySelector('.reloadRandom')
let reloadLiked = document.querySelector('.reloadLiked')
let reloadLast = document.querySelector('.reloadLast')
let modalMenu = document.querySelector('.modal-menu')
let likedBox = document.querySelector('.likedBox')
let like = document.querySelector('.like')
let add = document.querySelector('.add')
let lister = document.querySelector('.lister')
let modalAdd = document.querySelector('.modal-add')
let cancel = document.querySelector('.cancel')
let mask = document.querySelector('.mask')
let audio_menu = document.querySelector('.audio_menu')
let indexPlayer = 0
let musicIndex = music[indexPlayer]

// arr for liked and last
let likedArr;
let lastArr = []

likedArr = (music.filter(item => item.isLiked == true))
randomTitle.innerText = music.length + ` random songs`
// onclick mask 
mask.onclick = () => {
   mask.classList.remove('active')
   modalMenu.classList.remove('active')
   modalAdd.classList.remove('active')
   body.classList.remove('body-hidden')
}

cancel.onclick = () => {
   mask.classList.remove('active')
   modalMenu.classList.remove('active')
   modalAdd.classList.remove('active')
   body.classList.remove('body-hidden')
}

// onclikc love
const btnLove = (elemId) => {
   let find = music.filter(item => item._id == elemId)[0]
   find.isLiked = !find.isLiked
   if (find.isLiked == true) {
      likedArr.push(find)
   } else {
      let likedFind = likedArr.filter(item => item._id != find._id)
      likedArr = likedFind
   }
   if (main_playlist.classList.contains('active')) {
      reloadPlalistFunc(playlists)
      asideReloadFunc(likedArr)
   } else {
      reloadRandomFunc(music)
      reloadLikedFunc(likedArr)
      reloadLastFunc(lastArr)
      asideReloadFunc(likedArr)
   }

}


const btnMenu = (elemId, e) => {
   modalMenu.classList.add('active')
   mask.classList.add('active')
   modalMenu.style.top = `${e.pageY - 120}px`
   modalMenu.style.left = `${e.pageX - 150}px`
   let find = music.filter(item => item._id == elemId)[0]

   find.isLiked ? like.innerText = 'dislike' : like.innerText = 'like'
   body.classList.add('body-hidden')
   like.onclick = () => {
      find.isLiked = !find.isLiked
      if (find.isLiked == true) {
         likedArr.push(find)
      } else {
         let likedFind = likedArr.filter(item => item._id != find._id)
         likedArr = likedFind
      }
      modalMenu.classList.remove('active')
      mask.classList.remove('active')
      body.classList.remove('body-hidden')
      reloadRandomFunc(music)
      reloadLikedFunc(likedArr)
      asideReloadFunc(likedArr)
      reloadLastFunc(lastArr)
      reloadPlalistFunc(playlists)
   }
   add.onclick = () => {
      modalAdd.classList.add('active')
      modalAdd.id = elemId
      mask.classList.add('active')
   }
   lister.onclick = () => {
      let find = music.filter(item => item._id == elemId)[0]
      audioSrc.src = `./static/audio/${find.title_org}.mp3`
      player_userName.innerText = find.title
      player_userAuthor.innerText = find.author
      playFunc()
      lastArr.unshift(find)
      lastArr = lastArr.filter((item, pos) => {
         return lastArr.indexOf(item) == pos
      })
      reloadLastFunc(lastArr)
   }
}

const imgRandomPlay = (elemId) => {
   let find = music.filter(item => item._id == elemId)[0]
   indexPlayer = elemId
   musicIndex = music[indexPlayer]
   audioSrc.id = find._id
   audioSrc.src = `./static/audio/${musicIndex.title_org}.mp3`
   player_userName.innerText = musicIndex.title
   player_userAuthor.innerText = musicIndex.author
   next.classList.remove('active')
   prew.classList.remove('active')
   nextLiked.classList.remove('active')
   prewLiked.classList.remove('active')
   prewLast.classList.remove('active')
   nextLast.classList.remove('active')
   playFunc()
   lastArr.unshift(find)
   lastArr = lastArr.filter((item, pos) => {
      return lastArr.indexOf(item) == pos
   })
   reloadLastFunc(lastArr)
}

const imgLikedPlay = (elemId, idElem) => {
   let find = music.filter(item => item._id == idElem)[0]
   indexPlayer = elemId
   audioSrc.id = find._id
   musicIndex = likedArr[indexPlayer]
   audioSrc.src = `./static/audio/${musicIndex.title_org}.mp3`
   player_userName.innerText = musicIndex.title
   player_userAuthor.innerText = musicIndex.author
   next.classList.add('active')
   prew.classList.add('active')
   nextLiked.classList.add('active')
   prewLiked.classList.add('active')
   prewLast.classList.remove('active')
   nextLast.classList.remove('active')
   playFunc()
   lastArr.unshift(find)
   lastArr = lastArr.filter((item, pos) => {
      return lastArr.indexOf(item) == pos
   })
   reloadLastFunc(lastArr)
}

const imgLastPlay = (elemId, idElem) => {
   let find = music.filter(item => item._id == idElem)[0]
   indexPlayer = elemId
   audioSrc.id = find._id
   musicIndex = lastArr[indexPlayer]
   audioSrc.src = `./static/audio/${musicIndex.title_org}.mp3`
   player_userName.innerText = musicIndex.title
   player_userAuthor.innerText = musicIndex.author
   next.classList.add('active')
   prew.classList.add('active')
   nextLiked.classList.remove('active')
   prewLiked.classList.remove('active')
   prewLast.classList.add('active')
   nextLast.classList.add('active')
   playFunc()
}

const imgPlaylistPlay = (elemId, idElem) => {
   let find = music.filter(item => item._id == idElem)[0]
   audioSrc.id = find._id
   audioSrc.src = `./static/audio/${find.title_org}.mp3`
   player_userName.innerText = find.title
   player_userAuthor.innerText = find.author
   playFunc()
}

const audioMenu = () => {
   audio_menu.onclick = (e) => {
      let find = music.filter(item => item._id == audioSrc.id)[0]
      modalMenu.classList.add('active')
      mask.classList.add('active')
      modalMenu.style.top = `${e.pageY - 120}px`
      modalMenu.style.left = `${e.pageX - 150}px`
      find.isLiked ? like.innerText = 'dislike' : like.innerText = 'like'
      body.classList.add('body-hidden')
      like.onclick = () => {
         find.isLiked = !find.isLiked
         if (find.isLiked == true) {
            likedArr.push(find)
         } else {
            let likedFind = likedArr.filter(item => item._id != find._id)
            likedArr = likedFind
         }
         modalMenu.classList.remove('active')
         mask.classList.remove('active')
         body.classList.remove('body-hidden')
         reloadRandomFunc(music)
         reloadLikedFunc(likedArr)
         asideReloadFunc(likedArr)
         reloadLastFunc(lastArr)
      }
      add.onclick = () => {
         modalAdd.classList.add('active')
         mask.classList.add('active')
      }
      lister.onclick = () => {
         audioSrc.src = `./static/audio/${find.title_org}.mp3`
         player_userName.innerText = find.title
         player_userAuthor.innerText = find.author
         playFunc()
         lastArr.unshift(find)
         lastArr = lastArr.filter((item, pos) => {
            return lastArr.indexOf(item) == pos
         })
         reloadLastFunc(lastArr)
      }
   }
}

// reload
const reloadRandomFunc = (arr) => {
   reloadRandom.innerHTML = ''
   randomTitle.innerText = music.length + ` random songs`
   if (arr.length >= 0) {
      for (const item of arr) {
         let main_item = document.createElement('div')
         let number = document.createElement('p')
         let img = document.createElement('img')
         let user = document.createElement('div')
         let name = document.createElement('p')
         let author = document.createElement('p')
         let love = document.createElement('div')
         let love_img = document.createElement('img')
         let time = document.createElement('div')
         let menu = document.createElement('div')
         let menu_img = document.createElement('img')

         main_item.classList.add('main_item')
         number.classList.add('number')
         img.classList.add('img')
         user.classList.add('user')
         name.classList.add('name')
         author.classList.add('author')
         love.classList.add('love')
         time.classList.add('time')
         menu.classList.add('menu')

         img.id = item._id
         number.innerText = arr.indexOf(item) + 1
         img.src = `./static/picture/${item.img}.jpg`
         name.innerText = item.title
         author.innerText = item.author
         time.innerText = item.times
         menu_img.src = `./static/Icons/menu.svg`

         // if else 
         item.isLiked ? love_img.src = `./static/Icons/love-blue.svg` : love_img.src = `./static/Icons/love-white.svg`

         menu.append(menu_img)
         love.append(love_img)
         user.append(name, author)
         main_item.append(number, img, user, love, time, menu)
         reloadRandom.append(main_item)

         // onclick 
         love_img.onclick = () => {
            btnLove(item._id)
         }
         menu_img.onclick = (event) => {
            btnMenu(item._id, event)
         }
         img.onclick = () => {
            imgRandomPlay(arr.indexOf(item))
         }
      }
   }
}

audioMenu()

const reloadLikedFunc = (arr) => {
   reloadLiked.innerHTML = ''
   arr = arr.reverse()
   if (arr.length > 0) {
      for (const item of arr) {
         let main_item = document.createElement('div')
         let number = document.createElement('p')
         let img = document.createElement('img')
         let user = document.createElement('div')
         let name = document.createElement('p')
         let author = document.createElement('p')
         let love = document.createElement('div')
         let love_img = document.createElement('img')
         let time = document.createElement('div')
         let menu = document.createElement('div')
         let menu_img = document.createElement('img')

         main_item.classList.add('main_item')
         number.classList.add('number')
         img.classList.add('img')
         user.classList.add('user')
         name.classList.add('name')
         author.classList.add('author')
         love.classList.add('love')
         time.classList.add('time')
         menu.classList.add('menu')

         number.innerText = arr.indexOf(item) + 1
         img.src = `./static/picture/${item.img}.jpg`
         name.innerText = item.title
         author.innerText = item.author
         time.innerText = item.times
         menu_img.src = `./static/Icons/menu.svg`

         // if else 
         item.isLiked ? love_img.src = `./static/Icons/love-blue.svg` : love_img.src = `./static/Icons/love-white.svg`

         menu.append(menu_img)
         love.append(love_img)
         user.append(name, author)
         main_item.append(number, img, user, love, time, menu)
         reloadLiked.append(main_item)
         // onclick
         love_img.onclick = () => {
            btnLove(item._id)
         }
         menu_img.onclick = (event) => {
            btnMenu(item._id, event)
         }
         img.onclick = () => {
            imgLikedPlay(arr.indexOf(item), item._id)
         }
      }
   } else {
      audioSrc.src = `#`
   }
}

const reloadLastFunc = (arr) => {
   reloadLast.innerHTML = ''
   if (arr.length > 0) {
      for (const item of arr) {
         let main_item = document.createElement('div')
         let number = document.createElement('p')
         let img = document.createElement('img')
         let user = document.createElement('div')
         let name = document.createElement('p')
         let author = document.createElement('p')
         let love = document.createElement('div')
         let love_img = document.createElement('img')
         let time = document.createElement('div')
         let menu = document.createElement('div')
         let menu_img = document.createElement('img')

         main_item.classList.add('main_item')
         number.classList.add('number')
         img.classList.add('img')
         user.classList.add('user')
         name.classList.add('name')
         author.classList.add('author')
         love.classList.add('love')
         time.classList.add('time')
         menu.classList.add('menu')

         number.innerText = arr.indexOf(item) + 1
         img.src = `./static/picture/${item.img}.jpg`
         name.innerText = item.title
         author.innerText = item.author
         time.innerText = item.times
         menu_img.src = `./static/Icons/menu.svg`

         // if else 
         item.isLiked ? love_img.src = `./static/Icons/love-blue.svg` : love_img.src = `./static/Icons/love-white.svg`

         menu.append(menu_img)
         love.append(love_img)
         user.append(name, author)
         main_item.append(number, img, user, love, time, menu)
         reloadLast.append(main_item)
         // onclick
         love_img.onclick = () => {
            btnLove(item._id)
         }
         menu_img.onclick = (event) => {
            btnMenu(item._id, event)
         }
         img.onclick = () => {
            imgLastPlay(arr.indexOf(item), item._id)
         }
      }
   } else {
      // audioSrc.src = `#`
   }
}

// aside reload 
let addList = document.querySelector('.add-list')

const asideReloadFunc = (arr) => {
   likedBox.innerHTML = ''

   for (const item of arr) {
      let div = document.createElement('div')
      let spanName = document.createElement('span')
      let spanTime = document.createElement('span')

      spanName.innerText = item.title
      spanTime.innerText = item.times

      div.append(spanName, spanTime)
      likedBox.append(div)

      div.onclick = () => {
         imgLikedPlay(arr.indexOf(item), item._id)
      }
   }
}
const addListFunc = (arr) => {
   addList.innerText = ''

   for (const item of arr) {
      let div = document.createElement('div')
      let span = document.createElement('span')

      span.innerText = item.title

      div.append(span)
      addList.append(div)

      span.onclick = () => {
         btnPlaylistHtml(item._id)
      }
   }
}

let main_inner = document.querySelector('.main_inner')
let main_playlistHtml = document.createElement('div')
main_playlistHtml.classList.add('main_playlistHtml')

const btnPlaylistHtml = (elemId) => {
   main_playlistHtml.innerHTML = ''

   main_homepage.classList.add('active')
   intro.classList.remove('active')
   main_playlist.classList.remove('active')
   menu_setting.classList.remove('active')
   intro.classList.add('active')

   main_playlistHtml.classList.add('main_homepage')
   main_playlistHtml.style.display = 'block'
   let playlist = document.createElement('div')
   if (main_playlistHtml.classList.contains('main_playlistHtml')) {
      playlist.classList.add('playlist_add')
      playlist.style.width = `50%`
      playlist.classList.add('active')
      playlist.innerHTML = ''
      let find = playlists.filter(item => item._id == elemId)
      document.title = find[0].title
      for (const item of find) {
         let title = document.createElement('div')
         let reloadPlaylist = document.createElement('div')
         title.classList.add('title')
         reloadPlaylist.classList.add('main_content', 'reloadPlaylist')
         title.innerText = item.title

         if (item.music.length > 0) {
            for (const item2 of item.music) {
               let main_item = document.createElement('div')
               let number = document.createElement('p')
               let img = document.createElement('img')
               let user = document.createElement('div')
               let name = document.createElement('p')
               let author = document.createElement('p')
               let love = document.createElement('div')
               let love_img = document.createElement('img')
               let time = document.createElement('div')
               let menu = document.createElement('div')
               let menu_img = document.createElement('img')

               main_item.classList.add('main_item')
               number.classList.add('number')
               img.classList.add('img')
               user.classList.add('user')
               name.classList.add('name')
               author.classList.add('author')
               love.classList.add('love')
               time.classList.add('time')
               menu.classList.add('menu')

               img.id = item2._id
               img.src = `./static/picture/${item2.img}.jpg`
               name.innerText = item2.title
               author.innerText = item2.author
               time.innerText = item2.times
               menu_img.src = `./static/Icons/menu.svg`
               // if else 
               item2.isLiked ? love_img.src = `./static/Icons/love-blue.svg` : love_img.src = `./static/Icons/love-white.svg`
               menu.append(menu_img)
               love.append(love_img)
               user.append(name, author)
               main_item.append(number, img, user, love, time, menu)
               reloadPlaylist.append(main_item)
               // onclick
               love_img.onclick = () => {
                  btnLove(item2._id)
               }
               menu_img.onclick = (event) => {
                  btnMenu(item2._id, event)
               }
               img.onclick = () => {
                  imgPlaylistPlay(item.music.indexOf(item2), item2._id)
               }
            }
         } else {
            reloadPlaylist.innerText = 'please add music'
         }
         playlist.append(title, reloadPlaylist)
      }
      main_playlistHtml.append(playlist)
      main_inner.append(main_playlistHtml)
   }
}

let modalAddBox = document.querySelector('.modal-add-box')
let modalAddName = document.querySelector('#playlist-name')
let modalAddForId = document.querySelector('.modal-add')
let inputModal = document.querySelector('.input-modal')
let modalBtn = document.querySelector('.modal-btn')
// modal add 
const modalAddFunc = (arr) => {
   modalAddBox.innerHTML = ''
   for (const item of arr) {
      let itemElem = document.createElement('div')
      let name = document.createElement('p')
      let songsLength = document.createElement('p')

      itemElem.classList.add('item')
      name.classList.add('name')
      songsLength.classList.add('songsLength')
      name.innerText = item.title
      songsLength.innerText = item.music.length + ' songs'

      itemElem.append(name, songsLength)
      modalAddBox.append(itemElem)

      itemElem.onclick = () => {
         let find = music.filter(item => item._id == modalAddForId.id)[0]
         let findTitle = playlists.filter(item => item.title == name.innerText)[0]
         findTitle.music.unshift(find)
         songsLength.innerText = item.music.length + ' songs'
      }
   }
}

const modalBtnFunc = () => {
   modalBtn.onclick = () => {
      if (inputModal.value.length >= 3) {
         playlists.push({
            title: inputModal.value,
            music: [],
            _id: playlists.length
         })
         inputModal.value = ''
      }

      addListFunc(playlists)
      modalAddFunc(playlists)
   }
}

modalBtnFunc()

setTimeout(() => {
   reloadRandomFunc(music)
   reloadLikedFunc(likedArr)
   reloadLastFunc(lastArr)
   asideReloadFunc(likedArr)
   modalAddFunc(playlists)
   addListFunc(playlists)
   introCarusel(carusel)
}, 500)

// search 
let searchArr = []
let search = document.querySelector('#search')
let searchbox = document.querySelector('.search_box')

search.onkeyup = () => {

   if (event.target.value.trim().length >= 2) {
      let find_title = music.filter(item => {
         return item.title.trim().toLowerCase().includes(event.target.value.trim().toLowerCase())
      })
      let find_author = music.filter(item => {
         return item.author.trim().toLowerCase().includes(event.target.value.trim().toLowerCase())
      })
      searchArr = find_author.concat(find_title)

      searchArr = searchArr.filter((item, pos) => {
         return searchArr.indexOf(item) == pos
      })
      searchReload(searchArr)
   } else {
      searchArr = []
      searchReload(searchArr)
   }
   if (searchArr.length <= 0) {
      searchbox.style.display = `none`
   } else {
      searchbox.style.display = `block`
   }
}
if (searchArr.length <= 0) {
   searchbox.style.display = `none`
} else {
   searchbox.style.display = `block`
}

const searchReload = (arr) => {
   searchbox.innerHTML = ''

   for (const item of arr) {
      let box_item = document.createElement('div')
      let content = document.createElement('div')
      let name = document.createElement('p')
      let author = document.createElement('p')
      let time = document.createElement('div')
      let time_p = document.createElement('p')

      box_item.classList.add('box_item')
      content.classList.add('content')
      name.classList.add('name')
      author.classList.add('author')
      time.classList.add('time')

      name.innerText = item.title
      author.innerText = item.author
      time.innerText = item.times

      time.append(time_p)
      content.append(name, author)
      box_item.append(content, time)
      searchbox.append(box_item)

      box_item.onclick = () => {
         player_userName.innerText = item.title
         player_userAuthor.innerText = item.author
         timesong.innerText = item.times + 'min'
         audioSrc.src = `./static/audio/${item.title_org}.mp3`
         audioSrc.play()
         play.classList.add('active')
         play.querySelector('.play_src').src = `./static/Icons/pause.svg`
         lastArr.unshift(item)
         lastArr = lastArr.filter((item, pos) => {
            return lastArr.indexOf(item) == pos
         })
         reloadLastFunc(lastArr)
      }
   }
}

// player
let player_userName = document.querySelector('.player_user .name')
let player_userAuthor = document.querySelector('.player_user .author')
let audioSrc = document.querySelector('.audioSrc')
let play = document.querySelector('.play')
let next = document.querySelector('.next')
let prew = document.querySelector('.prew')
let nextLiked = document.querySelector('.nextLiked')
let prewLiked = document.querySelector('.prewLiked')
let prewLast = document.querySelector('.prewLast')
let nextLast = document.querySelector('.nextLast')

// progress
let progress = document.querySelector('.progress')
let timesong = document.querySelector('.timesong')
let played = document.querySelector('.played')
let progress_container = document.querySelector('.progress-container')
// get index 


// default
player_userName.innerText = music[0].title
player_userAuthor.innerText = music[0].author
audioSrc.src = `./static/audio/${music[0].title_org}.mp3`

if (audioSrc.id == '') {
   play.setAttribute('disabled', 'disabled')
}

play.onclick = () => {
   let checkActive = play.classList.contains('active')
   if (checkActive) {

      pauseFunc()
   } else {
      playFunc()
   }
}

next.onclick = () => nextFunc()
prew.onclick = () => prewFunc()
nextLiked.onclick = () => nextLikedFunc()
prewLiked.onclick = () => prewLikedFunc()
prewLast.onclick = () => prewLastFunc()
nextLast.onclick = () => nextLastFunc()

const playFunc = () => {
   play.removeAttribute('disabled')
   audioSrc.play()
   play.classList.add('active')
   play.querySelector('.play_src').src = `./static/Icons/pause.svg`
   timesong.innerText = musicIndex.times + `min`
}

const pauseFunc = () => {
   audioSrc.pause()
   play.classList.remove('active')
   play.querySelector('.play_src').src = `./static/Icons/play.svg`
}

const nextFunc = () => {
   indexPlayer >= music.length - 1 ? indexPlayer = 0 : indexPlayer++
   musicIndex = music[indexPlayer]
   audioSrc.src = `./static/audio/${musicIndex.title_org}.mp3`
   player_userName.innerText = musicIndex.title
   player_userAuthor.innerText = musicIndex.author
   playFunc()
}

const nextLikedFunc = () => {
   indexPlayer >= likedArr.length - 1 ? indexPlayer = 0 : indexPlayer++
   musicIndex = likedArr[indexPlayer]
   audioSrc.src = `./static/audio/${musicIndex.title_org}.mp3`
   player_userName.innerText = musicIndex.title
   player_userAuthor.innerText = musicIndex.author
   playFunc()
}

const nextLastFunc = () => {
   indexPlayer >= lastArr.length - 1 ? indexPlayer = 0 : indexPlayer++
   musicIndex = lastArr[indexPlayer]
   audioSrc.src = `./static/audio/${musicIndex.title_org}.mp3`
   player_userName.innerText = musicIndex.title
   player_userAuthor.innerText = musicIndex.author
   playFunc()
}

const prewFunc = () => {
   indexPlayer <= 0 ? indexPlayer = music.length - 1 : indexPlayer--
   let musicIndex = music[indexPlayer]
   audioSrc.src = `./static/audio/${musicIndex.title_org}.mp3`
   player_userName.innerText = musicIndex.title
   player_userAuthor.innerText = musicIndex.author
   playFunc()
}

const prewLikedFunc = () => {
   indexPlayer <= 0 ? indexPlayer = likedArr.length - 1 : indexPlayer--
   let musicIndex = likedArr[indexPlayer]
   audioSrc.src = `./static/audio/${musicIndex.title_org}.mp3`
   player_userName.innerText = musicIndex.title
   player_userAuthor.innerText = musicIndex.author
   playFunc()
}

const prewLastFunc = () => {
   indexPlayer <= 0 ? indexPlayer = lastArr.length - 1 : indexPlayer--
   let musicIndex = lastArr[indexPlayer]
   audioSrc.src = `./static/audio/${musicIndex.title_org}.mp3`
   player_userName.innerText = musicIndex.title
   player_userAuthor.innerText = musicIndex.author
   playFunc()
}

// progress bar
const getProgress = (e) => {
   let {
      duration,
      currentTime
   } = e.srcElement
   let progProsent = (currentTime / duration) * 100
   progress.style.width = `${progProsent}%`
   played.innerText = `${(currentTime / 60).toFixed(2)}min`
   played.innerText = played.innerText.replace('.', ':')
}

audioSrc.addEventListener('timeupdate', getProgress)

const setProgress = (e) => {
   let width = e.target.offsetWidth
   let clickX = e.offsetX
   let duration = audioSrc.duration
   audioSrc.currentTime = (clickX / width) * duration
}

progress_container.addEventListener('click', setProgress)
audioSrc.addEventListener('ended', () => {
   let next_func = next.classList.contains('active')
   let next_liked = nextLiked.classList.contains('active')
   let next_last = nextLast.classList.contains('active')
   if (next_func == false) {
      nextFunc()
   } else if (next_liked == true) {
      nextLikedFunc()
   } else if (next_last == true) {
      nextLastFunc()
   }
})

// playlist page
let playlist = document.querySelector('#playlist')
let homepage = document.querySelector('#homepage')
let settings = document.querySelector('#settings')
let intro = document.querySelector('.intro')
let main_homepage = document.querySelector('.main_homepage')
let main_playlist = document.querySelector('.main_playlist')
let reloadPlaylist = document.querySelector('.reloadPlaylist')
let menu_setting = document.querySelector('.menu_setting')

homepage.onclick = () => {
   document.title = 'Homepage'
   main_playlistHtml.style.display = `none`
   main_homepage.classList.remove('active')
   playlist.classList.remove('active')
   intro.classList.remove('active')
   main_playlist.classList.remove('active')
   menu_setting.classList.remove('active')
}

playlist.onclick = () => {
   document.title = 'Playlists'
   main_playlistHtml.style.display = `none`
   main_playlist.classList.add('active')
   main_homepage.classList.add('active')
   intro.classList.add('active')
   menu_setting.classList.remove('active')
   reloadPlalistFunc(playlists)
}

settings.onclick = () => {
   document.title = 'Settings'
   main_playlistHtml.style.display = `none`
   intro.classList.add('active')
   menu_setting.classList.add('active')
   main_playlist.classList.remove('active')
   main_homepage.classList.add('active')
}

const reloadPlalistFunc = (arr) => {
   main_playlist.innerHTML = ''

   if (arr.length <= 0) {
      let btn = document.createElement('p')
      btn.classList.add('playlist-modal-btn')
      btn.innerText = 'please add playlist !'
      main_playlist.append(btn)
   }

   for (const item of arr) {
      let last = document.createElement('div')
      let title = document.createElement('div')
      let reloadPlaylist = document.createElement('div')

      last.classList.add('playlist')
      title.classList.add('title')
      reloadPlaylist.classList.add('main_content', 'reloadPlaylist')

      title.innerText = item.title

      if (item.music.length > 0) {
         for (const item2 of item.music) {
            let main_item = document.createElement('div')
            let number = document.createElement('p')
            let img = document.createElement('img')
            let user = document.createElement('div')
            let name = document.createElement('p')
            let author = document.createElement('p')
            let love = document.createElement('div')
            let love_img = document.createElement('img')
            let time = document.createElement('div')
            let menu = document.createElement('div')
            let menu_img = document.createElement('img')

            main_item.classList.add('main_item')
            number.classList.add('number')
            img.classList.add('img')
            user.classList.add('user')
            name.classList.add('name')
            author.classList.add('author')
            love.classList.add('love')
            time.classList.add('time')
            menu.classList.add('menu')

            img.id = item2._id

            img.src = `./static/picture/${item2.img}.jpg`
            name.innerText = item2.title
            author.innerText = item2.author
            time.innerText = item2.times
            menu_img.src = `./static/Icons/menu.svg`
            // if else 
            item2.isLiked ? love_img.src = `./static/Icons/love-blue.svg` : love_img.src = `./static/Icons/love-white.svg`
            menu.append(menu_img)
            love.append(love_img)
            user.append(name, author)
            main_item.append(number, img, user, love, time, menu)
            reloadPlaylist.append(main_item)
            // onclick
            love_img.onclick = () => {
               btnLove(item2._id)
            }
            menu_img.onclick = (event) => {
               btnMenu(item2._id, event)
            }
            img.onclick = () => {
               imgPlaylistPlay(item.music.indexOf(item2), item2._id)
            }
         }
      } else {
         reloadPlaylist.innerText = `please add music`
      }
      last.append(title, reloadPlaylist)
      main_playlist.append(last)
   }
}

// settings 
let name_input = document.querySelector('.name-input')
let header_name = document.querySelector('.header_user h3')
let header_status = document.querySelector('.header_user p')
let settings_btn = document.querySelector('.settings_btn')
let box_checkbox = document.querySelector('.box')
let cicrle = document.querySelector('.cicrle')

name_input.value = header_name.innerText

settings_btn.onclick = () => {
   header_name.innerText = name_input.value
}

box_checkbox.onclick = () => {
   cicrle.classList.toggle('active')
   if (cicrle.classList.contains('active')) {
      body.style.background = `rgb(238,111,87)`
      body.style.background = `linear-gradient(180deg, rgba(238,111,87,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,1) 100%)`
      header_status.innerText = 'Premium User'
   } else {
      body.style.background = `rgb(0, 48, 39)`;
      body.style.background = `linear-gradient(180deg, rgba(0, 48, 39, 1) 0%, rgba(0, 0, 0, 1) 35%, rgba(0, 0, 0, 1) 100%)`
      header_status.innerText = 'Free User'
   }
}

// intro 
let btn_prew = document.querySelector('.btn_prew')
let btn_next = document.querySelector('.btn_next')
let dogs = document.querySelector('.dogs')
let introCaounter = 0

let introCarusel = (arr) => {
   let title = intro.querySelector('.title')
   let subtitle = intro.querySelector('.subtitle')
   let time = intro.querySelector('.time')
   let intro_right = document.querySelector('.intro_right img')

   title.innerText = arr[introCaounter].title
   subtitle.innerText = arr[introCaounter].author
   time.innerText = arr[introCaounter].times
   intro_right.src = `./static/picture/${arr[introCaounter].img}.jpg`

   dogs.innerHTML = ''
   for (const item of arr) {
      let div = document.createElement('div')

      div.onclick = () => {
         btnDogs(item._id)
      }
      dogs.append(div)
   }
}

let btnDogs = (elemId) => {
   introCaounter = elemId
   introCarusel(carusel)
}

btn_prew.onclick = () => {
   introCaounter--
   if (introCaounter < 0) {
      introCaounter = carusel.length - 1
   }
   introCarusel(carusel)
}

btn_next.onclick = () => {
   introCaounter++
   if (introCaounter > carusel.length - 1) {
      introCaounter = 0
   }
   introCarusel(carusel)
}