// sortUtils.js
let sortOrder = {}; // Maintain sort state across columns

export function sortTasks(tasks, column) {
    const isAscending = sortOrder[column] !== "asc";
    sortOrder[column] = isAscending ? "asc" : "desc";

    const sortedTasks = [...tasks].sort((a, b) => {
        let valA = a[column];
        let valB = b[column];

        if (column === "dueDate") {
            valA = new Date(valA);
            valB = new Date(valB);
        }

        if (typeof valA === "string" && typeof valB === "string") {
            return isAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else {
            return isAscending ? valA - valB : valB - valA;
        }
    });

    return sortedTasks;
}
