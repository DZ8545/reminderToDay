const ball = document.querySelector(".hoveringBall");
let x, y;

function move(event) {
  window.electron.setPostion([event.screenX - x, event.screenY - y]);
}

ball.addEventListener("mousedown", (event) => {
  x = event.x;
  y = event.y;
  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", move);
  });
});
const add = document.querySelector('.add')
const ulEl = document.querySelector('ul')
add.addEventListener('click',()=>{
  const info = document.querySelector('textarea').value
  if(info){
    const spanEl = document.createElement("span")
    spanEl.innerText = info
    const btnEl = document.createElement('button')
    btnEl.innerText = 'X'
    const liEl = document.createElement('li')
    liEl.appendChild(spanEl)
    liEl.appendChild(btnEl)
    ulEl.appendChild(liEl)
  }
})
const deletes = document.querySelectorAll('ul li button')
for(const item of deletes){
  item.addEventListener('click',()=>{
    ulEl.removeChild(item.parentNode)
  })
}
const time = document.querySelector('.time')
time.innerText = new Date().toLocaleString()
setInterval(()=>{
  time.innerText = new Date().toLocaleString()
},1000)