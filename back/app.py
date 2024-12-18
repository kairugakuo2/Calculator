# import google speech library
from google.cloud import speech
import io
import os

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
        print("Transcript: {}".format(result.alternatives[0].transcript))
        return result.alternatives[0].transcript

if __name__ == "__main__":
    print(transcribe_audio("../4+4_converted.wav"))