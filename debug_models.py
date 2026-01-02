
import sys
import pickle
from pathlib import Path

# Path to models folder
MODELS_DIR = Path("models").resolve()
print(f"Checking models in: {MODELS_DIR}")

def load_pickle(filename):
    filepath = MODELS_DIR / filename
    print(f"Loading {filename}...")
    try:
        if filepath.exists():
            with open(filepath, 'rb') as f:
                obj = pickle.load(f)
                print(f"  -> Success. Type: {type(obj)}")
                return obj
        else:
            print(f"  -> Error: File not found")
    except Exception as e:
        print(f"  -> Error: {e}")
        import traceback
        traceback.print_exc()

files = [
    "svd_sklearn.pkl",
    "tfidf_vectorizer.pkl",
    "item_embeddings.pkl",
    "user_embeddings.pkl",
    "gender_encoder.pkl",
    "occupation_encoder.pkl",
    "ranking_model.pkl"
]

print("Starting model check...")
for f in files:
    load_pickle(f)
print("Finished.")
