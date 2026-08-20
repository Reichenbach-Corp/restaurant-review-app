"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Score = 1 | 2 | 3 | 4 | 5;

export default function ReviewPage() {
  const params = useSearchParams();
  const locationId = params.get("locationId") ?? "unknown";
  const [food, setFood] = useState<Score | null>(null);
  const [speed, setSpeed] = useState<Score | null>(null);
  const [service, setService] = useState<Score | null>(null);
  const [lines, setLines] = useState(["", "", ""]);
  const [result, setResult] = useState<string>("");

  const canSubmit = useMemo(() => food && speed && service, [food, speed, service]);

  async function submit() {
    if (!food || !speed || !service) return;
    const response = await fetch("/api/reviews/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        idempotencyKey: crypto.randomUUID(),
        locationId,
        visitAt: new Date().toISOString(),
        foodScore: food,
        speedScore: speed,
        serviceScore: service,
        reviewLines: lines
      })
    });
    const data = await response.json();
    setResult(response.ok ? `Review accepted. ${data.points.total} points earned.` : data.error ?? "Submission failed");
  }

  return (
    <main>
      <h1>Review this visit</h1>
      <p>Location: {locationId}</p>
      {(["Food", "Speed", "Service"] as const).map((label) => {
        const current = label === "Food" ? food : label === "Speed" ? speed : service;
        const setter = label === "Food" ? setFood : label === "Speed" ? setSpeed : setService;
        return (
          <section className="card" key={label}>
            <h2>{label}</h2>
            {[1,2,3,4,5].map((n) => (
              <button key={n} onClick={() => setter(n as Score)} aria-pressed={current === n} style={{ marginRight: 8, fontWeight: current === n ? 700 : 400 }}>
                {n}
              </button>
            ))}
          </section>
        );
      })}
      <section className="card">
        <h2>Optional three-line review</h2>
        {lines.map((value, index) => (
          <input
            key={index}
            maxLength={80}
            value={value}
            onChange={(event) => setLines((old) => old.map((line, i) => i === index ? event.target.value : line))}
            placeholder={`Line ${index + 1}`}
            style={{ display: "block", width: "100%", marginBottom: 8, padding: 10 }}
          />
        ))}
      </section>
      <button disabled={!canSubmit} onClick={submit}>Submit review</button>
      {result && <p>{result}</p>}
    </main>
  );
}
