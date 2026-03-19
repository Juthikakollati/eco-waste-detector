// script.js - Fully Fixed for Eco Waste Detector

let model, webcam, maxPredictions;

// Initialize the AI model and webcam
async function init() {
  const modelURL = "./model/model.json";
  const metadataURL = "./model/metadata.json";

  try {
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    console.log("Model loaded successfully!");

    // Setup webcam
    const flip = true; // mirror webcam
    webcam = new tmImage.Webcam(400, 400, flip);
    await webcam.setup();
    await webcam.play();
    document.getElementById("webcam-container").appendChild(webcam.canvas);

    window.requestAnimationFrame(loop);

  } catch (err) {
    console.error("Failed to load model or webcam:", err);
    alert("Error loading AI model. Check console for details.");
  }
}

// Main loop for webcam
async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

// Run prediction on current webcam frame
async function predict() {
  if (!model) return;

  const prediction = await model.predict(webcam.canvas);
  let highest = prediction[0];

  prediction.forEach(p => {
    if (p.probability > highest.probability) highest = p;
  });

  displayResult(highest);
}

// Display the prediction and show the Next button
function displayResult(highest) {
  const labelContainer = document.getElementById("label-container");
  labelContainer.innerHTML = `${highest.className}: ${(highest.probability * 100).toFixed(2)}%`;

  // Show Next button after prediction
  document.getElementById("nextBtn").style.display = "inline-block";
}

// Handle "Next" button click
document.getElementById("nextBtn").addEventListener("click", () => {
  alert("Next step clicked! Implement your workflow here.");
  document.getElementById("nextBtn").style.display = "none";
});

// Handle image upload prediction
document.getElementById("imageUpload").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = async () => {
    const prediction = await model.predict(img);
    let highest = prediction[0];
    prediction.forEach(p => {
      if (p.probability > highest.probability) highest = p;
    });
    displayResult(highest);
  };
});
