song1 = "";
song2 = "";
function preload(){
    song1 = loadSound("sonk1.mp3");
    song2 = loadSound("sonk2.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

stat1 = ""
stat2 = ""

function setup(){
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();
    image(webcam, 0, 0, 300, 300);
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}

function modelLoaded() {
    connsole.log("Pnet initiliazed");
}

function gotPoses(results)
{
    if(results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Rwrist = " + scoreRightWrist + "Lwrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
    }
}

function draw()
{
    //circle(0, 0, 0); I have no idea what to put for this
    stat1 = song1.isPlaying();
    stat2 = song2.isPlaying();
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(stat1 == "false")
        {
            song1.play();document.getElementById("song").innerHTML = "Lights, Camera, Action! (Sonic Mania)"
        }
    }
}