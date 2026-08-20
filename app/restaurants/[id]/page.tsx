import Link from "next/link";

export default async function RestaurantLocationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main>
      <Link href="/">← Nearby restaurants</Link>
      <section className="card">
        <h1>Restaurant location</h1>
        <p>Location ID: {id}</p>
        <p>Food 4.2 · Speed 3.8 · Service 4.0</p>
        <p>Demo insight: service is weaker late at night once sufficient review volume exists.</p>
        <Link href={`/review?locationId=${encodeURIComponent(id)}`}>Review this visit</Link>
      </section>
    </main>
  );
}
