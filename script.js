const input = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const results = document.getElementById("results");

let travelData = null;

fetch("./travel_recommendation_api.json")
  .then((response) => {
    if (!response.ok) throw new Error("Could not load recommendation data.");
    return response.json();
  })
  .then((data) => {
    travelData = data;
  })
  .catch((error) => {
    console.error(error);
    results.innerHTML = '<p class="status error">Recommendation data could not be loaded. Run the project through a local server.</p>';
  });

function normalize(value) {
  return value.toLowerCase().trim();
}

function getRecommendations(query) {
  if (!travelData) return [];
  const q = normalize(query);

  if (["beach", "beaches"].includes(q) || q.includes("beach")) return travelData.beaches;
  if (["temple", "temples"].includes(q) || q.includes("temple")) return travelData.temples;

  const country = travelData.countries.find((item) =>
    normalize(item.name).includes(q) || q.includes(normalize(item.name))
  );
  if (country) return country.cities;

  const allPlaces = [
    ...travelData.beaches,
    ...travelData.temples,
    ...travelData.countries.flatMap((countryItem) => countryItem.cities)
  ];

  return allPlaces.filter((place) =>
    normalize(place.name).includes(q) || normalize(place.description).includes(q)
  );
}

function displayRecommendations(items) {
  if (!items.length) {
    results.innerHTML = '<p class="status">No recommendations found. Try “Japan”, “Australia”, “beach”, or “temple”.</p>';
    return;
  }

  results.innerHTML = items.map((place) => `
    <article class="recommendation-card">
      <img src="${place.imageUrl}" alt="${place.name}" loading="lazy">
      <div class="card-body">
        <h2>${place.name}</h2>
        <p>${place.description}</p>
        <button type="button" class="visit-btn">Visit</button>
      </div>
    </article>
  `).join("");
}

function search() {
  const query = input.value.trim();
  if (!query) {
    results.innerHTML = '<p class="status">Enter a destination or keyword to start exploring.</p>';
    return;
  }
  if (!travelData) {
    results.innerHTML = '<p class="status">Loading recommendations…</p>';
    return;
  }
  displayRecommendations(getRecommendations(query));
}

searchBtn.addEventListener("click", search);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") search();
});
clearBtn.addEventListener("click", () => {
  input.value = "";
  results.innerHTML = "";
  input.focus();
});
