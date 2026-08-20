import Link from "next/link";

const demoLocations = [
  { id: "wendys-merivale", brand: "Wendy's", address: "Merivale Road, Ottawa", food: 4.2, speed: 3.8, service: 4.0 },
  { id: "mcdonalds-bank", brand: "McDonald's", address: "Bank Street, Ottawa", food: 3.9, speed: 4.1, service: 3.8 },
  { id: "tim-hortons-baseline", brand: "Tim Hortons", address: "Baseline Road, Ottawa", food: 3.8, speed: 3.5, service: 3.9 }
];

export default function HomePage() {
  return (
    <main>
      <h1>Nearby restaurants</h1>
      <p>Fast, location-specific reviews. Public identities stay pseudonymous.</p>
      {demoLocations.map((location) => (
        <section className="card" key={location.id}>
          <h2>{location.brand}</h2>
          <p>{location.address}</p>
          <p>Food {location.food} · Speed {location.speed} · Service {location.service}</p>
          <Link href={`/restaurants/${location.id}`}>View location</Link>
        </section>
      ))}
    </main>
  );
}
