status = "";
objects = [];

function preload(){

}

function setup(){
    canvas = createCanvas(500, 400);
    canvas.parent("canvas_div");
    video = createCapture(VIDEO);
    video.size(500, 400);
    video.hide();
}

function draw(){
    background("white");
    image(video, 0, 0, 500, 400);

    if(status != ""){
        objectDetector.detect(video ,got_results);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("object_status").innerHTML = "Number of objects detected : "+ objects.length;
            percent = floor(objects[i].confidence*100);
            fill("red");
            strokeWeight(1);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("red");
            strokeWeight(3);
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector("cocossd",model_loaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
    object_name = document.getElementById("object_name").value;
    console.log(object_name);
}

function model_loaded(){
    console.log("Model is loaded.");
    status = "true";
}

function got_results(error, result){
    if(error){
        console.error(error);
    }else{
        console.log(result);
    }
    objects = result;
}