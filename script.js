const URL = "./model/";

let model, webcam, labelContainer, maxPredictions;

// Initialize webcam AI
async function init() {

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;

    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup();
    await webcam.play();

    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);

    labelContainer = document.getElementById("label-container");

}

// Webcam loop
async function loop() {
    webcam.update();
    await predictWebcam();
    window.requestAnimationFrame(loop);
}

// Predict from webcam
async function predictWebcam() {

    const prediction = await model.predict(webcam.canvas);

    let highest = prediction[0];

    for (let i = 1; i < prediction.length; i++) {
        if (prediction[i].probability > highest.probability) {
            highest = prediction[i];
        }
    }

    displayResult(highest);

}

// Upload image prediction
document.getElementById("imageUpload").addEventListener("change", async function (event) {

    const file = event.target.files[0];

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    img.onload = async function () {

        const prediction = await model.predict(img);

        let highest = prediction[0];

        for (let i = 1; i < prediction.length; i++) {
            if (prediction[i].probability > highest.probability) {
                highest = prediction[i];
            }
        }

        displayResult(highest);
    }

});

// Display result function
function displayResult(highest) {

    let resultText = "";

    if (highest.className === "Recycle") {
        resultText =
            "Detected: Recyclable Item ♻️ <br> Dispose in Recycling Bin";
    }
    else if (highest.className === "Compost") {
        resultText =
            "Detected: Compostable Waste 🌱 <br> Dispose in Compost Bin";
    }
    else if (highest.className === "Hazardous") {
        resultText =
            "Detected: Hazardous Waste ⚠️ <br> Take to Special Waste Center";
    }
    else {
        resultText = "Detected: " + highest.className;
    }

    document.getElementById("label-container").innerHTML =
        resultText + "<br><br>Confidence: " +
        (highest.probability * 100).toFixed(1) + "%";
}
