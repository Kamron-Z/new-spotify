import {
   playlists,
   music
} from './data.js'

let reloadRandom = document.querySelector('.reloadRandom')
let modalMenu = document.querySelector('.modal-menu')
let like = document.querySelector('.like')
let add = document.querySelector('.add')
let lister = document.querySelector('.lister')
let mask = document.querySelector('.mask')

// onclikc love
const btnLove = (elemId) => {
   let find = music.filter(item => item._id == elemId)[0]
   find.isLiked = !find.isLiked
   reloadRandomFunc(music)
}
const btnMenu = (elemId, e) => {
   console.log(e);
   modalMenu.classList.add('active')
   mask.classList.add('active')
   modalMenu.style.top = `${e.pageY}px`
   modalMenu.style.left = `${e.pageX}px`
   let find = music.filter(item => item._id == elemId)[0]

   like.onclick = () => {
      find.isLiked = !find.isLiked
      modalMenu.classList.remove('active')
      mask.classList.remove('active')
      reloadRandomFunc(music)
   }
}

// reload
const reloadRandomFunc = (arr) => {
   reloadRandom.innerHTML = ''

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

      number.innerText = item._id + 1
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
   }
}

window.addEventListener("load", function (event) {
   this.setTimeout(() => {
      reloadRandomFunc(music)
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
   }
}