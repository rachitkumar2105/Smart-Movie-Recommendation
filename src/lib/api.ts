
export const API_BASE_url = 'http://localhost:8000';

export interface ColdStartRequest {
    gender: string;
    occupation: string;
    interests: string[];
}

export interface Recommendation {
    item: {
        id: string;
        title: string;
        description: string;
        genres: string;
        imageUrl: string | null;
        popularity: number;
        year: number;
        category: string;
        vote_average: number;
        vote_count: number;
    };
    score: number;
    source: string;
    features: {
        svdScore?: number;
        contentSimilarity?: number;
        userItemSimilarity?: number;
        popularity?: number;
        recency?: number;
        demographicMatch?: number;
    };
}

export const api = {
    async submitColdStart(data: ColdStartRequest): Promise<Recommendation[]> {
        const response = await fetch(`${API_BASE_url}/api/recommend/cold-start?limit=12`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recommendations');
        }

        return response.json();
    },

    async getHealth(): Promise<any> {
        try {
            const response = await fetch(`${API_BASE_url}/`);
            return response.json();
        } catch (e) {
            console.error('API Health Check Failed', e);
            return null;
        }
    },

    async getUserRecommendations(userId: string): Promise<Recommendation[]> {
        const response = await fetch(`${API_BASE_url}/api/recommend/user/${userId}?limit=8`);
        if (!response.ok) {
            throw new Error('Failed to fetch user recommendations');
        }
        return response.json();
    }
};
