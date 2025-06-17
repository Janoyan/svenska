import json
import base64
import io
import random
from pydub import AudioSegment

# Config
INPUT_JSON = "current.json"
OUTPUT_FILE = "final_output.mp3"
silence_1s = AudioSegment.silent(duration=500)
silence_5s = AudioSegment.silent(duration=2000)

# Decode Base64
def decode_base64_audio(data_uri):
    header, encoded = data_uri.split(",", 1)
    return base64.b64decode(encoded)

# Load JSON
with open(INPUT_JSON, "r", encoding="utf-8") as f:
    records = json.load(f)

print(f"🔄 Loaded {len(records)} records from {INPUT_JSON}")

# Create both options for each word
entries = []
for idx, item in enumerate(records):
    print(f"🎵 Generating audio options for word #{idx + 1}: \"{item['text']}\"")

    audio = AudioSegment.from_file(io.BytesIO(decode_base64_audio(item["audio"])), format="mp3")
    arm_audio = AudioSegment.from_file(io.BytesIO(decode_base64_audio(item["armAudio"])), format="mp3")

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

# Combine all audio
final_audio = AudioSegment.empty()
for i, e in enumerate(entries):
    word_idx = e['word_index']
    word_text = records[word_idx]['text']
    variant = e['type']
    print(f"🔊 Adding to final audio [{i+1}/{len(entries)}]: {variant} of \"{word_text}\"")
    final_audio += e["audio"]

# Export result
final_audio.export(OUTPUT_FILE, format="mp3")
print(f"✅ Final audio saved to: {OUTPUT_FILE}")
