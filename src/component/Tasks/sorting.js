let sortOrder = {}; // Store the sort order for each column

export function sortTable(column) {
    // Toggle sorting order based on previous state
    const isAscending = sortOrder[column] !== "asc";
    sortOrder[column] = isAscending ? "asc" : "desc";

    tasks.sort((a, b) => {
        let valA = a[column];
        let valB = b[column];

        // Handle "Due Date" specifically
        if (column === "dueDate") { // Ensure the key matches the property in tasks
            valA = new Date(valA);
            valB = new Date(valB);
        }

        // Convert to lowercase for case-insensitive sorting
        if (typeof valA === "string" && typeof valB === "string") {
            return isAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else {
            return isAscending ? valA - valB : valB - valA; // Numeric comparison for non-strings
        }
    });

    let tableBody = document.querySelector("#taskTableBody");
    tableBody.innerHTML = renderTable(tasks); // Ensure renderTable is defined properly
}

export function SortByHandler(event) {
    sortTable(event.target.value);
}