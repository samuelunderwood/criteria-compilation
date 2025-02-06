document.addEventListener("DOMContentLoaded", function () {
  fetch("assets/noise.json")
    .then(response => response.json())
    .then(data => {
      const flattenedData = flattenData(data);
      populateCategoryFilter(flattenedData);
      updateRoomAndRefFilters(flattenedData);
      updateResults(flattenedData);

      document.getElementById("categoryFilter").addEventListener("change", () => updateRoomAndRefFilters(flattenedData));
      document.getElementById("roomFilter").addEventListener("change", () => updateResults(flattenedData));
      document.getElementById("refFilter").addEventListener("change", () => updateResults(flattenedData));

      document.getElementById("toggleNC").addEventListener("change", toggleColumns);
      document.getElementById("toggledBA").addEventListener("change", toggleColumns);
    })
    .catch(error => console.error("Error loading JSON:", error));

  function flattenData(data) {
    let results = [];
    for (const [reference, recommendations] of Object.entries(data)) {
      recommendations.forEach(entry => {
        results.push({
          category: entry.category,
          room_type: entry.room_type,
          reference: reference,
          NC_rating: entry.NC_rating || "", // Might not exist in all references
          dBA: entry.dBA || "", // Might not exist in all references
          notes: entry.notes || ""
        });
      });
    }
    return results;
  }

  function populateCategoryFilter(data) {
    const categoryFilter = document.getElementById("categoryFilter");
    let categories = new Set();
    data.forEach(entry => categories.add(entry.category));
    
    categoryFilter.innerHTML = `<option value="">All</option>`;
    categories.forEach(cat => categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`);
  }

  function updateRoomAndRefFilters(data) {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const roomFilter = document.getElementById("roomFilter");
    const refFilter = document.getElementById("refFilter");

    roomFilter.innerHTML = `<option value="">All</option>`;
    refFilter.innerHTML = `<option value="">All</option>`;

    let filteredData = selectedCategory ? data.filter(entry => entry.category === selectedCategory) : data;

    let rooms = new Set();
    let refs = new Set();
    filteredData.forEach(entry => {
      rooms.add(entry.room_type);
      refs.add(entry.reference);
    });

    rooms.forEach(room => roomFilter.innerHTML += `<option value="${room}">${room}</option>`);
    refs.forEach(ref => refFilter.innerHTML += `<option value="${ref}">${ref}</option>`);

    updateResults(filteredData);
  }

  function updateResults(data) {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const selectedRoom = document.getElementById("roomFilter").value;
    const selectedRef = document.getElementById("refFilter").value;
    const resultsTable = document.getElementById("results");
    resultsTable.innerHTML = "";

    let filteredData = data.filter(entry =>
      (selectedCategory === "" || entry.category === selectedCategory) &&
      (selectedRoom === "" || entry.room_type === selectedRoom) &&
      (selectedRef === "" || entry.reference === selectedRef)
    );

    if (filteredData.length === 0) {
      resultsTable.innerHTML = `<tr><td colspan="6">No results found.</td></tr>`;
      return;
    }

    filteredData.forEach(entry => {
      resultsTable.innerHTML += `
        <tr>
          <td>${entry.category}</td>
          <td>${entry.room_type}</td>
          <td>${entry.reference}</td>
          <td class="NC-column">${entry.NC_rating}</td>
          <td class="dBA-column">${entry.dBA}</td>
          <td>${entry.notes}</td>
        </tr>
      `;
    });

    toggleColumns();
  }

  function toggleColumns() {
    let showNC = document.getElementById("toggleNC").checked;
    let showdBA = document.getElementById("toggledBA").checked;

    document.querySelectorAll(".NC-column").forEach(col => col.style.display = showNC ? "" : "none");
    document.querySelectorAll(".dBA-column").forEach(col => col.style.display = showdBA ? "" : "none");
  }
});
