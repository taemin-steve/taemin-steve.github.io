import { Point } from "./point.js";

const FOLLOW_SPEED = 0.01;
const WIDTH = 160;
const HEIGHT= 160;

export class Dialog{
    constructor(img){
        this.pos = new Point();
        this.target = new Point();
        this.startPos = new Point();
        this.downPos = new Point();
        this.isDown = false;

        this.my_img = img||0;
        this.height = 160;
        this.width = 160;
        this.count =0;
        this.alpha =100;
    }

    set_size(w,h){
        this.width = w;
        this.height = h;
    }

    resize(point ,stageWidth, stageHeight){

        this.pos.x = point.x - this.width/2;
        this.pos.y = point.y - this.height/2;

    }

    animate(ctx){
        if(this.count++ < 50){
            const move = this.target.clone().substract(this.startPos).reduce(FOLLOW_SPEED); // const move = this.target.clone().substract(this.pos).reduce(FOLLOW_SPEED);
            //따라가는  스피드를 정해주어 이동하는 비율을 더 적게함.
            this.pos.add(move); // 위에서 지정한 움직임 만큼 움직여줌.
           // this.centerPos = this.pos.clone().add(this.mousePos); // centerPos는 상자 좌표계에서 눌린 위치.
    
            if(this.count < 30){
                ctx.globalAlpha = 1;
                ctx.beginPath();
               // ctx.fillStyle = '#f4e55a';
                ctx.drawImage(this.my_img,this.pos.x, this.pos.y,this.width, this.height );
            }
            else{
                ctx.globalAlpha = (this.alpha)/100;
                this.alpha -= 3;
                ctx.beginPath();
                ctx.fillStyle = '#f4e55a';
                ctx.drawImage(this.my_img,this.pos.x, this.pos.y,this.width, this.height);
            }
            //ctx.fillRect(this.pos.x, this.pos.y, WIDTH, HEIGHT);
        }
        
    }

    down(point){
        if(point.collide(this.pos,WIDTH,HEIGHT)){ // 사각형 안에 마우포지션이 존재한다면, 
            this.isDown = true;
            this.startPos = this.pos.clone(); // 시작 위치를 마우스 눌린 위치로 지정
            this.downPos =  point.clone(); // 마우스 눌린 위치
            return this;
        }
        else{
            return null;
        }
    }
    
    set_satrtPos(point){
        this.startPos = point;

        //this.downPos =  point.clone();
    }

    set_target(point){
            this.target.x = (this.startPos.x - point.x) + this.startPos.x; 
        
        // console.log(`x : ${point.x}`);
        // console.log(`startx: ${this.startPos.x}`);
        // console.log(`targetx: ${this.target.x}`);


        this.target.y = (this.startPos.y - point.y) + this.startPos.y; 

        // this.target.x =  point.x - this.width/2;
        // this.target.y = point.y - this.height/2;

    }

    up(){
        this.isDown =false;
    }

    move(point){
        if(this.isDown){
            //this.pos = point;
            this.target = this.startPos.clone().add(point).substract(this.downPos);
            // 움직인 거리를 계산해서 상자의 절대 위치가 도달할 경로를 지정.
            //this.target = point; 비슷하긴한데 원하는 지점까지 도착하질 않음. 
        }
    }
    
}