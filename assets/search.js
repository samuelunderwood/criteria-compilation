document.addEventListener("DOMContentLoaded", function () {
  fetch("assets/noise.json")
    .then(response => response.json())
    .then(data => {
      const flattenedData = flattenData(data);
      populateFilters(flattenedData);
      updateResults(flattenedData);

      document.getElementById("roomFilter").addEventListener("change", () => updateResults(flattenedData));
      document.getElementById("refFilter").addEventListener("change", () => updateResults(flattenedData));
    })
    .catch(error => console.error("Error loading JSON:", error));

  function flattenData(data) {
    let results = [];
    for (const [reference, recommendations] of Object.entries(data)) {
      recommendations.forEach(entry => {
        results.push({
          room_type: entry.room_type,
          reference: reference,
          NC_rating: entry.NC_rating,
          notes: entry.notes || ""
        });
      });
    }
    return results;
  }

  function populateFilters(data) {
    const roomFilter = document.getElementById("roomFilter");
    const refFilter = document.getElementById("refFilter");
    let rooms = new Set();
    let refs = new Set();

    data.forEach(entry => {
      rooms.add(entry.room_type);
      refs.add(entry.reference);
    });

    rooms.forEach(room => roomFilter.innerHTML += `<option value="${room}">${room}</option>`);
    refs.forEach(ref => refFilter.innerHTML += `<option value="${ref}">${ref}</option>`);
  }

  function updateResults(data) {
    const room = document.getElementById("roomFilter").value;
    const ref = document.getElementById("refFilter").value;
    const resultsTable = document.getElementById("results");
    resultsTable.innerHTML = "";

    let filteredData = data.filter(entry =>
      (room === "" || entry.room_type === room) &&
      (ref === "" || entry.reference === ref)
    );

    filteredData.forEach(entry => {
      resultsTable.innerHTML += `
        <tr>
          <td>${entry.room_type}</td>
          <td>${entry.reference}</td>
          <td>${entry.NC_rating}</td>
          <td>${entry.notes}</td>
        </tr>
      `;
    });
  }
});

