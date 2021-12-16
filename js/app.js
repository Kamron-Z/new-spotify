import {
   playlists,
   music
} from './data.js'

let reloadRandom = document.querySelector('.reloadRandom')
let reloadLiked = document.querySelector('.reloadLiked')
let reloadLast = document.querySelector('.reloadLast')
let modalMenu = document.querySelector('.modal-menu')
let likedBox = document.querySelector('.likedBox')
let like = document.querySelector('.like')
let add = document.querySelector('.add')
let lister = document.querySelector('.lister')
let mask = document.querySelector('.mask')
let indexPlayer = 0
let musicIndex = music[indexPlayer]

// arr for liked and last
let likedArr;
let lastArr = []

likedArr = (music.filter(item => item.isLiked == true))

// onclick mask 
mask.onclick = () => {
   mask.classList.remove('active')
   modalMenu.classList.remove('active')
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
   reloadRandomFunc(music)
   reloadLikedFunc(likedArr)
   asideReloadFunc(likedArr)
   reloadLastFunc(lastArr)
}

const btnMenu = (elemId, e) => {
   modalMenu.classList.add('active')
   mask.classList.add('active')
   modalMenu.style.top = `${e.pageY}px`
   modalMenu.style.left = `${e.pageX}px`
   let find = music.filter(item => item._id == elemId)[0]

   find.isLiked ? like.innerText = 'dislike' : like.innerText = 'like'

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
      reloadRandomFunc(music)
      reloadLikedFunc(likedArr)
      asideReloadFunc(likedArr)
      reloadLastFunc(lastArr)
   }
}

const imgRandomPlay = (elemId) => {
   let find = music.filter(item => item._id == elemId)[0]
   indexPlayer = elemId
   musicIndex = music[indexPlayer]
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

// reload
const reloadRandomFunc = (arr) => {
   reloadRandom.innerHTML = ''

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
         imgLikedPlay(arr.indexOf(item))
      }
   }
}

window.addEventListener("load", function (event) {
   this.setTimeout(() => {
      reloadRandomFunc(music)
      reloadLikedFunc(likedArr)
      reloadLastFunc(lastArr)
      asideReloadFunc(likedArr)
   }, 200)
});

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
      }
   }
}

// player
let player_userName = document.querySelector('.player_user .name')
let player_userAuthor = document.querySelector('.player_user .author')
let audioSrc = document.querySelector('#audioSrc')
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
audioSrc.addEventListener('ended', nextFunc)