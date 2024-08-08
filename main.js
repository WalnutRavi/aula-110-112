var prediction1=""
var prediction2=""

Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90,
});
var cam=document.getElementById("Camera")
Webcam.attach("#Camera")

function takeSnapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("foto").innerHTML='<img id="captura" src="'+data_uri+'"/>'
})
}

console.log("ml5 version",ml5.version)

classifier=ml5.imageClassifier("",modelLoaded)
function modelLoaded(){
    console.log("model loaded")
}

function speak(){
    var synth=window.speechSynthesis
    speak_data1="a primeira previsão é "+prediction1
    speak_data2="a segunda previsão é"+prediction2
    utterThis=new SpeechSynthesisUtterance (speak_data1+speak_data2)
    synth.speak(utterThis)
}
function check(){
    speak()
}