
import pandas as pd
import numpy as np
import pickle
from pathlib import Path
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression

# Configuration
MODELS_DIR = Path("models").resolve()
MODELS_DIR.mkdir(parents=True, exist_ok=True)

print(f"Regenerating models in: {MODELS_DIR}")

# 1. Create Synthetic Item Metadata
print("Generating items_metadata.csv...")

real_movies = [
    ("The Shawshank Redemption", "Drama"),
    ("The Godfather", "Crime|Drama"),
    ("The Dark Knight", "Action|Crime|Drama"),
    ("The Godfather Part II", "Crime|Drama"),
    ("12 Angry Men", "Drama|Crime"),
    ("Schindler's List", "Biography|Drama|History"),
    ("The Lord of the Rings: The Return of the King", "Action|Adventure|Drama"),
    ("Pulp Fiction", "Crime|Drama"),
    ("The Lord of the Rings: The Fellowship of the Ring", "Action|Adventure|Drama"),
    ("The Good, the Bad and the Ugly", "Western"),
    ("Forrest Gump", "Drama|Romance"),
    ("Fight Club", "Drama"),
    ("The Lord of the Rings: The Two Towers", "Action|Adventure|Drama"),
    ("Inception", "Action|Adventure|Sci-Fi"),
    ("Star Wars: Episode V - The Empire Strikes Back", "Action|Adventure|Fantasy"),
    ("The Matrix", "Action|Sci-Fi"),
    ("Goodfellas", "Biography|Crime|Drama"),
    ("One Flew Over the Cuckoo's Nest", "Drama"),
    ("Se7en", "Crime|Drama|Mystery"),
    ("Seven Samurai", "Action|Adventure|Drama"),
    ("It's a Wonderful Life", "Drama|Family|Fantasy"),
    ("The Silence of the Lambs", "Crime|Drama|Thriller"),
    ("City of God", "Crime|Drama"),
    ("Saving Private Ryan", "Drama|War"),
    ("Life Is Beautiful", "Comedy|Drama|Romance"),
    ("Interstellar", "Adventure|Drama|Sci-Fi"),
    ("The Green Mile", "Crime|Drama|Fantasy"),
    ("Star Wars", "Action|Adventure|Fantasy"),
    ("Terminator 2: Judgment Day", "Action|Sci-Fi"),
    ("Back to the Future", "Adventure|Comedy|Sci-Fi"),
    ("Spirited Away", "Animation|Adventure|Family"),
    ("Psycho", "Horror|Mystery|Thriller"),
    ("The Pianist", "Biography|Drama|Music"),
    ("Parasite", "Drama|Thriller"),
    ("Léon: The Professional", "Action|Crime|Drama"),
    ("The Lion King", "Animation|Adventure|Drama"),
    ("Gladiator", "Action|Adventure|Drama"),
    ("American History X", "Drama"),
    ("The Departed", "Crime|Drama|Thriller"),
    ("The Usual Suspects", "Crime|Mystery|Thriller"),
    ("The Prestige", "Drama|Mystery|Sci-Fi"),
    ("Casablanca", "Drama|Romance|War"),
    ("Whiplash", "Drama|Music"),
    ("The Intouchables", "Biography|Comedy|Drama"),
    ("Modern Times", "Comedy|Drama|Romance"),
    ("Once Upon a Time in the West", "Western"),
    ("Hara-Kiri", "Action|Drama|Mystery"),
    ("Grave of the Fireflies", "Animation|Drama|War"),
    ("Alien", "Horror|Sci-Fi"),
    ("Rear Window", "Mystery|Thriller"),
    ("City Lights", "Comedy|Drama|Romance"),
    ("Memento", "Mystery|Thriller"),
    ("Apocalypse Now", "Drama|Mystery|War"),
    ("Cinema Paradiso", "Drama|Romance"),
    ("Indiana Jones and the Raiders of the Lost Ark", "Action|Adventure"),
    ("Django Unchained", "Drama|Western"),
    ("WALL·E", "Animation|Adventure|Family"),
    ("The Lives of Others", "Drama|Thriller"),
    ("Sunset Blvd.", "Drama|Film-Noir"),
    ("Paths of Glory", "Drama|War"),
    ("The Shining", "Drama|Horror"),
    ("The Great Dictator", "Comedy|Drama|War"),
    ("Avengers: Infinity War", "Action|Adventure|Sci-Fi"),
    ("Witness for the Prosecution", "Crime|Drama|Mystery"),
    ("Aliens", "Action|Adventure|Sci-Fi"),
    ("American Beauty", "Drama"),
    ("The Dark Knight Rises", "Action|Thriller"),
    ("Dr. Strangelove", "Comedy|War"),
    ("Spider-Man: Into the Spider-Verse", "Animation|Action|Adventure"),
    ("Joker", "Crime|Drama|Thriller"),
    ("Oldboy", "Action|Drama|Mystery"),
    ("Braveheart", "Biography|Drama|History"),
    ("Amadeus", "Biography|Drama|History"),
    ("Toy Story", "Animation|Adventure|Comedy"),
    ("Coco", "Animation|Adventure|Family"),
    ("Inglourious Basterds", "Adventure|Drama|War"),
    ("The Boat", "Drama|War"),
    ("Avengers: Endgame", "Action|Adventure|Drama"),
    ("Princess Mononoke", "Animation|Adventure|Fantasy"),
    ("Good Will Hunting", "Drama|Romance"),
    ("Toy Story 3", "Animation|Adventure|Comedy"),
    ("Requiem for a Dream", "Drama"),
    ("3 Idiots", "Comedy|Drama"),
    ("Your Name.", "Animation|Drama|Fantasy"),
    ("Singin' in the Rain", "Comedy|Musical|Romance"),
    ("Star Wars: Episode VI - Return of the Jedi", "Action|Adventure|Fantasy"),
    ("Reservoir Dogs", "Crime|Drama|Thriller"),
    ("Eternal Sunshine of the Spotless Mind", "Drama|Romance|Sci-Fi"),
    ("2001: A Space Odyssey", "Adventure|Sci-Fi"),
    ("Citizen Kane", "Drama|Mystery"),
    ("Lawrence of Arabia", "Adventure|Biography|Drama"),
    ("M", "Crime|Mystery|Thriller"),
    ("North by Northwest", "Action|Adventure|Mystery"),
    ("Vertigo", "Mystery|Romance|Thriller"),
    ("Amélie", "Comedy|Romance"),
    ("A Clockwork Orange", "Crime|Drama|Sci-Fi"),
    ("Double Indemnity", "Crime|Drama|Film-Noir"),
    ("Full Metal Jacket", "Drama|War"),
    ("Scarface", "Crime|Drama"),
    ("Hamilton", "Biography|Drama|History"),
    ("The Sting", "Comedy|Crime|Drama"),
    ("To Kill a Mockingbird", "Crime|Drama")
]

num_items = len(real_movies)
items_data = {
    'id': range(1, num_items + 1),
    'title': [movie[0] for movie in real_movies],
    'genres': [movie[1] for movie in real_movies],
    'popularity': np.random.uniform(10, 100, num_items),
    'year': np.random.randint(1970, 2024, num_items),
    'description': [f"Description for {movie[0]}" for movie in real_movies],
    'vote_average': np.random.uniform(5, 10, num_items),
    'vote_count': np.random.randint(100, 1000, num_items)
}
items_df = pd.DataFrame(items_data)
items_df.to_csv(MODELS_DIR / "items_metadata.csv", index=False)
print(f"Generated {num_items} items.")
print("Done.")

# 2. Train TfidfVectorizer
print("Training TfidfVectorizer...")
tfidf = TfidfVectorizer(stop_words='english')
tfidf.fit(items_df['title'] + " " + items_df['genres'])
with open(MODELS_DIR / "tfidf_vectorizer.pkl", 'wb') as f:
    pickle.dump(tfidf, f)
print("Done.")

# 3. Train Encoders
print("Training LabelEncoders...")
genders = ['male', 'female', 'other']
occupations = ['engineer', 'doctor', 'artist', 'student', 'teacher', 'other', 'manager', 'scientist', 'lawyer', 'writer']

gender_encoder = LabelEncoder()
gender_encoder.fit(genders)
with open(MODELS_DIR / "gender_encoder.pkl", 'wb') as f:
    pickle.dump(gender_encoder, f)

occupation_encoder = LabelEncoder()
occupation_encoder.fit(occupations)
with open(MODELS_DIR / "occupation_encoder.pkl", 'wb') as f:
    pickle.dump(occupation_encoder, f)
print("Done.")

# 4. Train Ranking Model
# Features: svdScore, contentSimilarity, userItemSimilarity, popularity, recency, demographicMatch
print("Training Ranking Model (Logistic Regression)...")
X_train = np.random.rand(100, 6) # 100 samples, 6 features
y_train = np.random.randint(0, 2, 100) # Binary target
rank_model = LogisticRegression()
rank_model.fit(X_train, y_train)

with open(MODELS_DIR / "ranking_model.pkl", 'wb') as f:
    pickle.dump(rank_model, f)
print("Done.")

# 5. Dummy Embeddings (Optional but good to have)
print("Generating Dummy Embeddings...")
item_embeddings = np.random.rand(num_items, 32)
with open(MODELS_DIR / "item_embeddings.pkl", 'wb') as f:
    pickle.dump(item_embeddings, f)

user_embeddings = np.random.rand(50, 32) # Assume 50 users
with open(MODELS_DIR / "user_embeddings.pkl", 'wb') as f:
    pickle.dump(user_embeddings, f)
print("Done.")

print("\nAll models regenerated successfully!")
