# Smart Movie Recommendation System

An intelligent, industry-grade movie recommendation engine that leverages machine learning to provide personalized movie suggestions. This project combines collaborative filtering, content-based filtering, and a learning-to-rank model to solve the cold-start problem and deliver high-quality recommendations.

## 🚀 Key Features

*   **Hybrid Recommendation Engine**: Combines multiple approaches for best results:
    *   **Collaborative Filtering (SVD)**: Analyzes user behavior patterns.
    *   **Content-Based Filtering**: Matches movies based on genres, descriptions, and metadata using TF-IDF and Embeddings.
    *   **Hybrid Reranking**: Uses a Learning-to-Rank model to combine signals for the final output.
*   **Cold Start Handling**: Smart onboarding process to capture initial preferences for new users (Demographics + Interests).
*   **Real-Time Dashboard**: View system statistics and model performance metrics.
*   **Modern UI/UX**: A responsive, glassmorphism-inspired interface built with React and Tailwind CSS.
*   **Explore & Search**: Advanced filtering by genre, year, and popularity.

## 🛠️ Technology Stack

### Frontend
*   **Framework**: React (Vite)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS, shadcn/ui
*   **Icons**: Lucide React
*   **State Management**: React Query

### Backend & ML
*   **API**: FastAPI (Python)
*   **Server**: Uvicorn
*   **Machine Learning**: Scikit-Learn, NumPy, Pandas
*   **Models**: SVD, TF-IDF Vectorizer, Random Forest (for ranking)

## 📦 Installation & Setup

### Prerequisites
*   Node.js (v18+)
*   Python (v3.9+)

### 1. Clone the Repository
```bash
git clone https://github.com/rachitkumar2105/Smart-Movie-Recommendation.git
cd Smart-Movie-Recommendation
```

### 2. Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Run the API server:
    ```bash
    # Run with uvicorn directly
    uvicorn main:app --reload
    # OR run the python script
    python main.py
    ```
    The backend API will be available at `http://localhost:8000` (or `http://localhost:5000` depending on configuration).

### 3. Frontend Setup
1.  Navigate to the project root (if not already there):
    ```bash
    cd ..
    ```
2.  Install Node.js dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:8080`.

## 🧠 Architecture Overview

The system operates on a dual-stage pipeline:
1.  **Candidate Generation**: Retrieves a broad set of relevant movies using lightweight collaborative and content-based models.
2.  **Ranking**: A heavier ML model re-scores these candidates based on user profile features (Age, Occupation) and specific interaction history to produce the final personalized list.

## 👨‍💻 Author

**Rachit Kumar Singh**
*   Data Science & Machine Learning Enthusiast

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
