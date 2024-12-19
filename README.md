# Calculator with Voice Input

This project is a feature-rich scientific calculator that supports both manual input and voice commands for performing basic and advanced mathematical operations. It integrates a frontend interface with a backend powered by Flask and Google Cloud Speech-to-Text API to enable voice input functionality.

---

## Features

### Manual Input
- Perform basic arithmetic operations: addition, subtraction, multiplication, and division.
- Advanced scientific functions such as:
  - Trigonometric functions: `sin`, `cos`, `tan`
  - Square and cube roots: `√`, `∛`
  - Exponents and logarithms: `x^y`, `log`, `ln`
  - Constants: π (pi), e (Euler's number)
  - Factorials: `n!`
- Responsive design for easy interaction.

### Voice Input
- Perform operations by speaking phrases like: 
  - "What is 4 + 4"
  - "What is 3 x 3"
- Fully integrated with Google Cloud Speech-to-Text API.
- Real-time transcription and calculation display.

### Additional Features
- Clear and delete buttons for easy corrections.
- Decimal support for precision calculations.
- Timer functionality for recording durations.
- Toggle button to show or hide voice input controls.

---

## Project Structure

### Frontend
- **HTML**: Defines the calculator UI and integrates voice input elements.
- **CSS**: Handles styling, including responsive design for the calculator.
- **JavaScript**:
  - Manages calculator operations and scientific functions.
  - Handles voice recording, API requests, and updates the UI with results.

### Backend
- **Flask**: API server for processing audio files and performing calculations.
- **Google Cloud Speech-to-Text API**:
  - Converts audio input into text for further processing.
- **Python Libraries**:
  - `pydub`: Converts audio files to a compatible format.
  - `re`: Parses and validates voice transcription input.

---
<img width="685" alt="Screenshot 2024-12-18 at 8 28 24 PM" src="https://github.com/user-attachments/assets/36caba2a-d5ce-4075-a91d-192b75f7deaf"/>

---

## Installation

### Prerequisites
- Python 3.9+
- Node.js (optional for development)
- Google Cloud account with Speech-to-Text API enabled
- `ffmpeg` installed on your system

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/calculator-voice.git
   cd calculator-voice

2. Set up the virtual environment:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
3. Install dependencies:
    ```bash
    pip install -r requirements.txt 
4. Configure Google Cloud credentials:
  - Set the GOOGLE_APPLICATION_CREDENTIALS environment variable to the path of your JSON credentials file:
    ```bash
    export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/credentials.json"
5. Run the Flask server
   ```bash
   python back/app.py
7. Open the index.html file in your browser to start the application.

### Usage
1. Manual Input:
  - Use the calculator buttons to input operations and scientific functions.
2. Voice Input:
  - Click the "Use Voice" button to toggle voice input controls.
  - Press "Start Recording" and speak a phrase like "What is 5 x 5."
  - Results and transcriptions will appear on the calculator screen.

### Known Current Issues
- Make sure audi fiels are recorded in compatible format (handled via backend conversion)
- Browser permissions for microphone access are required for voice input

### Tools Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python, Flask, Google Cloud Speech-to-Text API
- **Audio Processing:** pydub, ffmpeg

### Contributing
Contributions are welcome! Please fork the repository and submit a pull request for review.



