# import google speech library
from google.cloud import speech
from flask import Flask, request, jsonify
import io
import os
import re

app = Flask(__name__)
credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
#function to transcribe audio using google speech-to-text API
def transcribe_audio(file_path):
    client = speech.SpeechClient.from_service_account_json(credentials_path)
    #read audio file
    with io.open(file_path,"rb") as audio_file:
        content = audio_file.read()

    #condigure audio/recognition settings
    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16, #audio encoding format
        sample_rate_hertz=16000,
        language_code="en-US"
    )

    #push audio to API for speech to text
    response = client.recognize(config=config, audio=audio)

    #return transcript
    for result in response.results:
        return result.alternatives[0].transcript
    return None

# Go through transcript and do calculation
def process_transcript(transcript):
    match = re.match(r"what is (\d+)\s*([+\-*/])\s*(\d+)", transcript.lower())
    if match:
        operand1, operator, operand2 = match.groups()
        operand1, operand2 = float(operand1), float(operand2)
        result = None
        if operator == "+":
            result = operand1 + operand2
        elif operator == "-":
            result = operand1 - operand2
        elif operator == "*":
            result = operand1 + operand2
        elif operator == "/":
            if operand2 != 0:
                result = operand1 / operand2
            else:
                return {"Error, Cannot divide by zero"}
        return {"transcript": transcript, "result": result}
    return{"Error, invalid transcript format"}

#flask handling file upload and transcripting
@app.route('/transcribe', methods=['POST'])
def transcribe():
    file = request.files['file']
    file_path = "4+4_converted.wav"
    file.save(file_path)

    transcript = transcribe_audio(file_path)
    if not transcript:
        return jsonify({"Error, transcription failed!"}), 400
    result = process_transcript(transcript)
    return jsonify(result)
if __name__ == "__main__":
    app.run(debug=True)