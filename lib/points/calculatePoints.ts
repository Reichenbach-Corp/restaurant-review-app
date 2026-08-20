export const POINTS = {
  BASE_REVIEW: 10,
  MENU_ITEMS: 2,
  TAGS: 2,
  WRITTEN_REVIEW: 3,
  HAIKU: 3,
  VERIFIED_LOCATION: 5
} as const;

export interface PointInputs {
  hasMenuItems: boolean;
  hasTags: boolean;
  hasThreeLineReview: boolean;
  isHaiku: boolean;
  verifiedLocation: boolean;
  rewardEligible: boolean;
}

export function calculatePoints(input: PointInputs) {
  if (!input.rewardEligible) {
    return { review: 0, menuItems: 0, tags: 0, writtenReview: 0, haiku: 0, verification: 0, total: 0 };
  }
  const result = {
    review: POINTS.BASE_REVIEW,
    menuItems: input.hasMenuItems ? POINTS.MENU_ITEMS : 0,
    tags: input.hasTags ? POINTS.TAGS : 0,
    writtenReview: input.hasThreeLineReview ? POINTS.WRITTEN_REVIEW : 0,
    haiku: input.isHaiku ? POINTS.HAIKU : 0,
    verification: input.verifiedLocation ? POINTS.VERIFIED_LOCATION : 0,
    total: 0
  };
  result.total = result.review + result.menuItems + result.tags + result.writtenReview + result.haiku + result.verification;
  return result;
}
