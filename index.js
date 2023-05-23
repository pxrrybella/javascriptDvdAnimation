const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight - 5;

const Rect = class {
  constructor(width, height, x, y, dx, dy){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = '#00ffcc';
    this.colorArray = ['#00ffcc', '#ff3399', '#1aff1a', '#ffff00']
  }
  
  draw(){
    ctx.beginPath();
    const img = new Image();
    img.addEventListener(
    "load",
    () => {
        ctx.drawImage(img, 0, 0);
    },
    false
    );
    img.src = "logodvd.png";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
  
  update(){
    if( this.x > canvas.width - this.width || this.x < 0 ) {
      this.dx = - this.dx;
      let randomIndex = Math.floor(Math.random() * this.colorArray.length );
      while (this.color == this.colorArray[randomIndex]) {
        randomIndex = Math.floor(Math.random() * this.colorArray.length );
      }
      this.color = this.colorArray[randomIndex];
    }

    if( this.y > canvas.height - this.height || this.y < 0 ) {
        this.dy = - this.dy;
        let randomIndex = Math.floor(Math.random() * this.colorArray.length );
        while (this.color == this.colorArray[randomIndex]) {
          randomIndex = Math.floor(Math.random() * this.colorArray.length );
        }
        this.color = this.colorArray[randomIndex];
      }
    
    this.x += this.dx;
    this.y += this.dy;

    
    this.draw();
  }
} 

let x = Math.floor(Math.random() * 10);
let y = Math.floor(Math.random() * 10);

const rect = new Rect( 250, 150 , x, y, 4, 4);

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect( 0, 0, canvas.width, canvas.height );
  rect.update();
} 

animate();
