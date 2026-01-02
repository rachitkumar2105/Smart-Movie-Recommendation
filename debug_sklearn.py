
import pickle
from pathlib import Path
import warnings
warnings.filterwarnings("ignore")

MODELS_DIR = Path("models").resolve()

def check(name):
    print(f"Checking {name}...", end=" ")
    try:
        with open(MODELS_DIR / name, 'rb') as f:
            obj = pickle.load(f)
        print(f"OK. Type: {type(obj)}")
        if hasattr(obj, 'n_features_in_'):
            print(f"  Features: {obj.n_features_in_}")
        if hasattr(obj, 'classes_'):
            print(f"  Classes: {obj.classes_}")
    except Exception as e:
        print(f"FAIL. {e}")

check("ranking_model.pkl")
check("gender_encoder.pkl")
check("occupation_encoder.pkl")
check("tfidf_vectorizer.pkl")
