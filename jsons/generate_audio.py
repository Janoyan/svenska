import json
import base64
import io
import random
import os
from pydub import AudioSegment

# Config
INPUT_JSON = "current.json"
OUTPUT_FILE = "final_output.mp3"
BGM_FOLDER = "./background-musics"
BGM_VOLUME_REDUCTION_DB = 23  # Reduce background music volume
silence_1s = AudioSegment.silent(duration=500)
silence_5s = AudioSegment.silent(duration=2000)

# Decode Base64 and detect format
def decode_base64_audio(data_uri):
    header, encoded = data_uri.split(",", 1)
    if "audio/webm" in header:
        audio_format = "webm"
    elif "audio/mp3" in header or "audio/mpeg" in header:
        audio_format = "mp3"
    else:
        raise ValueError(f"Unsupported audio format in header: {header}")
    return base64.b64decode(encoded), audio_format

# Load background music files
def load_background_tracks(folder):
    bgm_files = [f for f in os.listdir(folder) if f.lower().endswith(('.mp3', '.wav'))]
    if not bgm_files:
        raise RuntimeError("❌ No background music tracks found.")
    print(f"🎼 Loaded {len(bgm_files)} background tracks from {folder}")
    return [
        AudioSegment.from_file(os.path.join(folder, f)).apply_gain(-BGM_VOLUME_REDUCTION_DB)
        for f in bgm_files
    ]

# Load JSON
with open(INPUT_JSON, "r", encoding="utf-8") as f:
    records = json.load(f)

print(f"🔄 Loaded {len(records)} records from {INPUT_JSON}")

# Load BGM
bgm_tracks = load_background_tracks(BGM_FOLDER)

# Create both options for each word
entries = []
for idx, item in enumerate(records):
    print(f"🎵 Generating audio options for word #{idx + 1}: \"{item['text']}\"")

    audio_data, audio_format = decode_base64_audio(item["audio"])
    arm_data, arm_format = decode_base64_audio(item["armAudio"])

    audio = AudioSegment.from_file(io.BytesIO(audio_data), format=audio_format)
    arm_audio = AudioSegment.from_file(io.BytesIO(arm_data), format=arm_format)

    opt1 = audio + silence_1s + arm_audio + silence_5s
    opt2 = arm_audio + silence_1s + audio + silence_5s

    entries.append({"word_index": idx, "audio": opt1, "type": "Option 1"})
    entries.append({"word_index": idx, "audio": opt2, "type": "Option 2"})

print("✅ Created all audio variants.")

# Shuffle ensuring no adjacent entries have the same word_index
def valid_shuffle(items):
    for i in range(1, len(items)):
        if items[i]['word_index'] == items[i-1]['word_index']:
            return False
    return True

max_attempts = 1000
for attempt in range(max_attempts):
    random.shuffle(entries)
    if valid_shuffle(entries):
        print(f"🔀 Successfully shuffled entries after {attempt + 1} attempts.")
        break
else:
    raise RuntimeError("❌ Failed to shuffle without consecutive duplicates after many attempts.")

# Combine all audio (speech only)
final_speech = AudioSegment.empty()
for i, e in enumerate(entries):
    word_idx = e['word_index']
    word_text = records[word_idx]['text']
    variant = e['type']
    print(f"🔊 Adding to final audio [{i+1}/{len(entries)}]: {variant} of \"{word_text}\"")
    final_speech += e["audio"]

# Prepare continuous background music
total_duration = len(final_speech)
selected_bgm = random.choice(bgm_tracks)

# Loop BGM to match or exceed final_speech duration
bgm_looped = selected_bgm
while len(bgm_looped) < total_duration:
    bgm_looped += selected_bgm
bgm_looped = bgm_looped[:total_duration]

# Overlay once at the end
final_mix = final_speech.overlay(bgm_looped)

# Export result
final_mix.export(OUTPUT_FILE, format="mp3")
print(f"✅ Final audio with continuous background music saved to: {OUTPUT_FILE}")
