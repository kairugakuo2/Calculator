# import libraries
from google.cloud import speech
from flask_cors import CORS
from flask import Flask, request, jsonify
from pydub import AudioSegment
import io
import os
import re
import tempfile

#initialize flask app
app = Flask(__name__)
CORS(app)

#get credentials from environemnt variable
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
        sample_rate_hertz=None, #let api check sample rate
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
            result = operand1 * operand2
        elif operator == "/":
            if operand2 != 0:
                result = operand1 / operand2
            else:
                return {"error" : "Cannot divide by zero"}
        return {"transcript": transcript, "result": result}
    return{"error": "Invalid transcript format"}

#flask handling file upload and transcripting
@app.route('/transcribe', methods=['POST'])
def transcribe():
    try:
        file = request.files['file']
        if not file:
            print("No file received in the request")
            return jsonify({"error": "No audio file provided"}), 400

        print("Received file:", file.filename)
        print("File content type:", file.content_type)

        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:
            file_path = temp_file.name
            file.save(file_path)

        #convert webm to wav
        webm_audio = AudioSegment.from_file(file_path, format="webm")
        wav_path = file_path.replace(".webm", ".wav")
        webm_audio.export(wav_path, format="wav", parameters=["-acodec", "pcm_s16le"])

        transcript = transcribe_audio(file_path)
        if not transcript:
            return jsonify({"error": "transcription failed!"}), 400

        result = process_transcript(transcript)
        return jsonify(result)
    except Exception as e:
        print("Error during transcription or processing:", str(e), flush=True) # log error for debugging
        return jsonify({"error": "Internal server error"}), 500
    finally:
        # clean up the temp file
        try:
            os.remove(file_path)
        except Exception as cleanup_error:
            print(f"Error cleaning up temporary file: {cleanup_error}")

if __name__ == "__main__":
    app.run(debug=True)