Eco Waste Detector
An AI-powered waste classification tool built with Teachable Machine and TensorFlow.js.
The system uses a trained image model to detect waste types such as recyclable, compostable, and hazardous materials.

Goal:
Help people dispose waste correctly and reduce environmental pollution.

Setup & Installation
This project is fully web-based and runs in the browser. No installation of Python or external libraries is required. To run locally, simply clone or download the repository, ensure all model files (model.json, metadata.json, weights.bin) are inside the model/ folder, and open index.html in any modern browser.

Model Training Details
The AI model was created using Google Teachable Machine, a simple platform for building image classification models. Images were uploaded for three main classes: Recyclable, Compostable, and Hazardous waste. The model was trained with multiple examples for each category, including common household items, to ensure the system can recognize typical waste accurately. After training, the model was exported in TensorFlow.js . 

Dataset Information 
The dataset includes images collected from publicly available sources (google), covering a variety of everyday waste items. The classes trained are:

Recyclable – plastic bottles, cans, paper, cardboard
Compostable – fruit and vegetable peels, food scraps, plant waste
Hazardous – batteries, electronics, chemicals, sharp objects

Performance & Accuracy
The trained model achieves approximately 85–90% accuracy on test images from the dataset. Performance may vary slightly depending on camera quality, lighting conditions, and the type of object presented. The model is optimized for common household waste items.

Limitations & Scope
The model is trained only on three main waste categories (Recycle, Compost, Hazardous). It may not recognize rare or specialized waste types.
Accuracy may decrease for items not well-represented in the training dataset or for images taken in unusual lighting or angles.

Future Improvements
Expand the model to include more waste categories such as glass, paper, electronics, and medical waste.
Integrate an eco-score system to gamify proper waste disposal.
Add more environmental tips and interactive features to educate users on sustainability practices.
