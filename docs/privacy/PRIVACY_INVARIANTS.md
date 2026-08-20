# Privacy Invariants

These requirements are release-blocking.

1. Public application data never exposes reviewer email, phone number, auth metadata, raw coordinates, IP address, or internal trust/fraud score.
2. Restaurant-facing features operate on aggregated location intelligence and cannot enumerate reviewer identity data.
3. Raw device coordinates are used only to calculate visit proximity and are not retained as a location history.
4. Points, verification level, haiku qualification, and trust weighting are server-controlled fields.
5. Users cannot insert or edit points ledger entries directly.
6. Public review content is pseudonymous and moderation must detect likely personally identifying information.
7. Minor users receive the same privacy wall by default; no public check-ins, follower graph, or direct messaging is required for MVP.
