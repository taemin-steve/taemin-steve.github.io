import { Dialog } from "./dialog.js";
import { Point } from "./point.js";

class App {
    constructor() {
        // this.my_canvas = document.createElement('canvas');
        // document.body.appendChild(this.my_canvas);
        this.my_canvas = document.getElementById("my_canvas");
        this.my_ctx = this.my_canvas.getContext('2d');

        this.my_pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        //console.log(`window.devicePixelRatio : ${window.devicePixelRatio}`);

        this.my_items =[];
        //this.my_items[0] = new Dialog();

        this.my_imgs = [];
        const img_names = ['1.JPG','2.JPG','3.JPG','4.JPG','5.JPG','6.JPG','7.JPG','8.JPG','9.jpeg','10.jpeg','11.JPG','12.PNG'];
        for(let i =0; i<img_names.length; i++){
            const img = new Image();
            img.src = './image/' + img_names[i];
            this.my_imgs[i] = img;
        }
        this.my_items[0] = new Dialog(this.my_imgs[0]);

        //MOve의 포인터를 저장하기 위한 배열 지정
        this.pointers =[];
        this.pointers[0] = new Point();
        
        this.my_mousePos = new Point(); // 포인터 객체를 생성
        this.my_curItem = null;

        
        window.addEventListener('resize', this.my_resize.bind(this),false);
        this.my_resize();

        this.my_animation();
      //  document.addEventListener('pointerdown',this.my_onDown.bind(this),false);
        document.addEventListener('pointermove',this.my_onMove.bind(this),false);
       // document.addEventListener('pointerup',this.my_onUp.bind(this),false);

    }

    my_resize(){
        this.my_stageWidth = document.body.clientWidth;
        this.my_stageHeigh = (document.body.clientHeight)*0.8;

        this.my_canvas.width = this.my_stageWidth * this.my_pixelRatio;
        this.my_canvas.height = this.my_stageHeigh * this.my_pixelRatio;

        console.log(` ${this.my_canvas.width}`);

        

        this.my_ctx.scale(this.my_pixelRatio, this.my_pixelRatio);

        for(let i=0; i<this.my_items.length; i++){
            this.my_items[i].resize(this.my_stageWidth, this.my_stageHeigh);
        }
    }

    my_animation(){
        window.requestAnimationFrame(this.my_animation.bind(this));
        //재귀함수로, 안에 선언한 함수를 일정 시간 텀을 두어실행. 무한반복이 가능하게함. 주사율의 개념. 

        //this.my_ctx.clearRect(0,0,this.my_stageWidth, this.my_stageHeigh); //화면 지우기
        this.my_ctx.drawImage(this.my_imgs[11],0,0, this.my_stageWidth, this.my_stageHeigh*1.2);

        for(let i=0; i<this.my_items.length; i++){
            this.my_items[i].animate(this.my_ctx);
        }

    }


    my_onMove(e){
        this.my_mousePos.x = e.clientX;
        this.my_mousePos.y = e.clientY;
        this.pointers.push(this.my_mousePos);
        
        const new_idx = this.my_items.length;
        if((this.pointers.length%6) == 3){
            let index = this.pointers.length;
            let num = Math.round((Math.random() *10));
            this.my_items[new_idx] = new Dialog(this.my_imgs[num]);
            switch(num){
                case 0:  this.my_items[new_idx].set_size(200,200); break;
                case 1:  this.my_items[new_idx].set_size(300,300); break;
                case 2:  this.my_items[new_idx].set_size(250,250); break;
                case 3:  this.my_items[new_idx].set_size(250,250); break;
                case 4:  this.my_items[new_idx].set_size(250,250); break;
                case 5:  this.my_items[new_idx].set_size(180,240); break;
                case 6:  this.my_items[new_idx].set_size(250,200); break;
                case 7:  this.my_items[new_idx].set_size(180,240); break;
                case 8:  this.my_items[new_idx].set_size(180,240); break;
                case 9:  this.my_items[new_idx].set_size(210,280); break;
                case 10:  this.my_items[new_idx].set_size(280,210); break;
            }
            this.my_items[new_idx].set_satrtPos(this.my_mousePos.clone());
            //this.my_items[new_idx-1].set_satrtPos(this.my_mousePos.clone());
            this.my_items[new_idx].set_target(this.my_items[new_idx-1].startPos.clone());
            this.my_items[new_idx].resize( this.my_mousePos.clone(),this.my_stageWidth, this.my_stageHeigh);
        }


        for(let i=0; i<this.my_items.length; i++){
            this.my_items[i].move(this.my_mousePos.clone());
        }
    }

}

window.onload = () =>{
    new App();
}