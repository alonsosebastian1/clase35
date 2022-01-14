var ball;
var hipnoticBall,database;
var position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    hipnoticBall = createSprite(250,250,10,10);
    hipnoticBall.shapeColor = "red";
    var hipnoticBallPosition = database.ref("ball/position");
    hipnoticBallPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref("ball/position").set({"x":position.x + x,"y":position.y + y});
}
function readPosition(data){
 position = data.val();
 console.log(position.x);
 hipnoticBall.x = position.x;
 hipnoticBall.y = position.y;
}

function showError(){
    console.log("error en la base de datos")
}