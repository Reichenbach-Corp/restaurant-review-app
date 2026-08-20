import { describe, expect, it } from "vitest";
import { calculatePoints } from "@/lib/points/calculatePoints";

describe("calculatePoints", () => {
  it("awards 10 points for a basic eligible review", () => {
    expect(calculatePoints({ hasMenuItems:false, hasTags:false, hasThreeLineReview:false, isHaiku:false, verifiedLocation:false, rewardEligible:true }).total).toBe(10);
  });
  it("awards 25 for a fully enhanced verified haiku review", () => {
    expect(calculatePoints({ hasMenuItems:true, hasTags:true, hasThreeLineReview:true, isHaiku:true, verifiedLocation:true, rewardEligible:true }).total).toBe(25);
  });
  it("awards zero when the review is not reward eligible", () => {
    expect(calculatePoints({ hasMenuItems:true, hasTags:true, hasThreeLineReview:true, isHaiku:true, verifiedLocation:true, rewardEligible:false }).total).toBe(0);
  });
});
