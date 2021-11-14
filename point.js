export class Point{ // export 키워드가 있어야 다른 파일에서 사용가능해짐
    constructor(x,y){
        this.x = x||0; // 유의미한 값이 들어오지 않으면 0으로 초기화.
        this.y = y||0;
    }

    add(point) {
        this.x += point.x;
        this.y += point.y;
        return this;
    }

    substract(point){
        this.x -= point.x;
        this.y -= point.y;
        return this;
    }

    reduce(value){
        this.x *= value;
        this.y *= value;
        return this;
    }

    collide(point, width, height){
        if(this.x >= point.x && this.x <= point.x + width &&
            this.y >= point.y && this.y <= point.y + height){
                return true;
            }
        else{
            return false;
        }
    }
    

    clone(){
        return new Point(this.x , this.y);
    }
}