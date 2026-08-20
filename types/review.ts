export type Score = 1 | 2 | 3 | 4 | 5;
export type VisitType = "drive_through" | "dine_in" | "takeout" | "delivery";

export interface LocationEvidence {
  latitude: number;
  longitude: number;
  accuracyMetres?: number;
  capturedAt: string;
}

export interface ReviewSubmission {
  idempotencyKey: string;
  locationId: string;
  visitAt: string;
  foodScore: Score;
  speedScore: Score;
  serviceScore: Score;
  visitType?: VisitType;
  menuItemIds?: string[];
  tagIds?: string[];
  reviewLines?: [string?, string?, string?];
  locationEvidence?: LocationEvidence;
}

export interface ReviewSubmissionResult {
  reviewId: string;
  scores: { food: Score; speed: Score; service: Score; overall: number };
  verificationLevel: 0 | 1 | 2;
  haiku: { detected: boolean; syllables?: [number, number, number] };
  points: {
    review: number; menuItems: number; tags: number; writtenReview: number;
    haiku: number; verification: number; total: number;
  };
  newPointsBalance: number;
}
