import { NextResponse } from "next/server";
import { calculatePoints } from "@/lib/points/calculatePoints";
import type { ReviewSubmission, Score } from "@/types/review";

function validScore(value: unknown): value is Score {
  return Number.isInteger(value) && Number(value) >= 1 && Number(value) <= 5;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ReviewSubmission>;
  if (!body.idempotencyKey || !body.locationId || !body.visitAt || !validScore(body.foodScore) || !validScore(body.speedScore) || !validScore(body.serviceScore)) {
    return NextResponse.json({ error: "Invalid review submission" }, { status: 400 });
  }

  // Temporary vertical-slice implementation. Replace with authenticated Supabase transaction.
  const threeLines = body.reviewLines ?? [];
  const hasThreeLineReview = threeLines.length === 3 && threeLines.every((line) => Boolean(line?.trim()));
  const points = calculatePoints({
    hasMenuItems: Boolean(body.menuItemIds?.length),
    hasTags: Boolean(body.tagIds?.length),
    hasThreeLineReview,
    isHaiku: false,
    verifiedLocation: false,
    rewardEligible: true
  });

  return NextResponse.json({
    reviewId: crypto.randomUUID(),
    scores: {
      food: body.foodScore,
      speed: body.speedScore,
      service: body.serviceScore,
      overall: Number(((body.foodScore + body.speedScore + body.serviceScore) / 3).toFixed(2))
    },
    verificationLevel: 0,
    haiku: { detected: false },
    points,
    newPointsBalance: points.total,
    implementationStatus: "mock-transaction"
  });
}
