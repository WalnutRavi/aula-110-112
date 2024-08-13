var prediction1 = ""
var prediction2 = ""

Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90,
});
var cam = document.getElementById("Camera")
Webcam.attach("#Camera")

function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("foto").innerHTML = '<img id="captura" src="' + data_uri + '"/>'
    })
}

console.log("ml5 version", ml5.version)

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/J2Ip11PDF/model.json", modelLoaded)
function modelLoaded() {
    console.log("model loaded")
}

function speak() {
    var synth = window.speechSynthesis
    speak_data1 = "a primeira previsão é " + prediction1
    speak_data2 = "a segunda previsão é" + prediction2
    utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2)
    synth.speak(utterThis)
}
function check() {

    img = document.getElementById("captura")
    classifier.classify(img, gotResult)
}
function gotResult(error, results) {
    if (error) {
        console.error(error)

    }
    else {
        console.log(results)
        document.getElementById("resultEmotionName").innerHTML = results[0].label
        document.getElementById("resultEmotionName2").innerHTML = results[1].label

        prediction1 = results[0].label
        prediction2 = results[1].label
        speak()
        if (results[0].label == "irritado") {
            document.getElementById("updateEmoji").innerHTML = "&#128548;"
    }
        if (results[0].label == "feliz") {
            document.getElementById("updateEmoji").innerHTML = "&#128522;"
        }
        if (results[0].label == "triste") {
            document.getElementById("updateEmoji").innerHTML = "&#128532;"
        }


        if (results[1].label == "irritado") {
            document.getElementById("updateEmoji2").innerHTML = "&#128548;"
        }
        if (results[1].label == "feliz") {
            document.getElementById("updateEmoji2").innerHTML = "&#128522;"
        }
        if (results[1].label == "triste") {
            document.getElementById("updateEmoji2").innerHTML = "&#128532;"
        }
    }
}