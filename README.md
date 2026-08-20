# Restaurant Review App MVP

Privacy-first, pseudonymous, location-level QSR review application.

## Core loop
Find a restaurant -> rate Food/Speed/Service -> add optional structured data -> submit -> earn points -> update location metrics.

## Current implementation
- Next.js/TypeScript skeleton
- Restaurant discovery demo
- Restaurant location page
- Shared review contracts
- Backend points calculation
- Supabase core schema
- Points/rewards/verification/moderation schema
- Initial RLS privacy policies
- Structured tag seed data
- Unit tests for point rules

## Next implementation slice
1. Supabase client/server helpers
2. Review form UI
3. Authenticated review submission endpoint
4. Idempotent points ledger transaction
5. Restaurant metrics query
6. Privacy regression tests
