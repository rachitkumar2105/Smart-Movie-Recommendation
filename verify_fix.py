
import sys
import os
import pandas as pd
import numpy as np
import pickle
from pathlib import Path

# Add backend to path to import ModelManager
sys.path.append(str(Path.cwd() / "backend"))

# Mocking the imports just in case
try:
    from main import ModelManager, compute_demographic_match
except ImportError:
    # Explicitly import from file if module usage fails
    import spec
    spec = importlib.util.spec_from_file_location("main", "backend/main.py")
    main = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(main)
    ModelManager = main.ModelManager
    compute_demographic_match = main.compute_demographic_match

print("Initializing ModelManager...")
mm = ModelManager()
mm.load_all()

print("\n--- Verifying Models ---")
if mm.ranking_model:
    print("Ranking Model: OK")
    # Test prediction
    features = np.random.rand(1, 6)
    try:
        if hasattr(mm.ranking_model, "predict_proba"):
            score = mm.ranking_model.predict_proba(features)[0][1]
            print(f"Ranking Prediction (proba): {score}")
        else:
            score = mm.ranking_model.predict(features)[0]
            print(f"Ranking Prediction (class): {score}")
    except Exception as e:
        print(f"Ranking Model Prediction FAIL: {e}")
else:
    print("Ranking Model: MISSING")

if mm.gender_encoder:
    print("Gender Encoder: OK")
    try:
        print(f"Classes: {mm.gender_encoder.classes_}")
        encoded = mm.gender_encoder.transform(['male'])
        print(f"Encoded 'male': {encoded}")
    except Exception as e:
        print(f"Gender Encoder FAIL: {e}")
else:
    print("Gender Encoder: MISSING")

print("\n--- Verifying Demographic Match Function ---")
try:
    match_score = compute_demographic_match("male", "engineer", "1")
    print(f"Match Score: {match_score}")
except Exception as e:
    print(f"compute_demographic_match FAIL: {e}")

print("\nVERIFICATION COMPLETE")
