document.getElementById('ngram-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const ngram = document.getElementById('ngram').value;
    fetch(`/compare_ngram?ngram=${encodeURIComponent(ngram)}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => console.error('Error:', error));
});

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = ['Language', 'Ngram', 'Total Matches', 'Relative Matches'];
    const tr = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tr.appendChild(th);
    });
    thead.appendChild(tr);

    data.forEach(result => {
        const tr = document.createElement('tr');
        for (const key in result) {
            const td = document.createElement('td');
            td.textContent = result[key];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    resultsDiv.appendChild(table);
}
