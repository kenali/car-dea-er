import React, { Suspense } from 'react';

async function fetchData(makeId, year) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(
    `${apiUrl}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  const data = await res.json();
  return data.Results || [];
}

async function ResultPage({ params }) {
  const { makeId, year } = params;
  const models = await fetchData(makeId, year);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Models for Make {makeId} in Year {year}
      </h1>
      {models.length ? (
        <ul>
          {models.map((model) => (
            <li key={model.Model_ID} className="mb-2">
              {model.Model_Name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No models found for this combination.</p>
      )}
    </div>
  );
}

export default function ResultPageWrapper({ params }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultPage params={params} />
    </Suspense>
  );
}
