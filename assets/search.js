document.addEventListener("DOMContentLoaded", function () {
  fetch("_data/noise.json")
    .then(response => response.json())
    .then(data => {
      populateFilters(data);
      updateResults(data);

      document.getElementById("roomFilter").addEventListener("change", () => updateResults(data));
      document.getElementById("refFilter").addEventListener("change", () => updateResults(data));
    });

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
          <td>${entry.notes || ""}</td>
        </tr>
      `;
    });
  }
});
