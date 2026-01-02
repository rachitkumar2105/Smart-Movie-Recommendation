
import sys
import pickle
from pathlib import Path
import sklearn
import warnings

# Suppress warnings
warnings.filterwarnings("ignore")

MODELS_DIR = Path("models").resolve()
print(f"Checking models in: {MODELS_DIR}")

def inspect_model(filename):
    filepath = MODELS_DIR / filename
    print(f"\n--- Intepecting {filename} ---")
    if not filepath.exists():
        print(f"Error: File not found")
        return

    try:
        with open(filepath, 'rb') as f:
            obj = pickle.load(f)
            print(f"Type: {type(obj)}")
            
            # Inspect sklearn models
            if hasattr(obj, 'n_features_in_'):
                print(f"n_features_in_: {obj.n_features_in_}")
            if hasattr(obj, 'feature_names_in_'):
                print(f"feature_names_in_: {obj.feature_names_in_}")
            if hasattr(obj, 'classes_'):
                print(f"classes_: {obj.classes_}")
            
            # success
            return obj
    except Exception as e:
        print(f"Error loading: {e}")
        # explicit check for scikit-surprise
        if "surprise" in str(e) or "Can't get attribute 'SVD'" in str(e):
            print("Likely missing 'scikit-surprise' or module path issue.")

try:
    import surprise
    print("scikit-surprise is installed.")
except ImportError:
    print("scikit-surprise is NOT installed.")

inspect_model("ranking_model.pkl")
inspect_model("svd_sklearn.pkl")
inspect_model("gender_encoder.pkl")
