document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('financialTable').getElementsByTagName('tbody')[0];

    function addRow() {
        const newRow = table.insertRow();
        const dateCell = newRow.insertCell(0);
        const descCell = newRow.insertCell(1);
        const incomeCell = newRow.insertCell(2);
        const expenseCell = newRow.insertCell(3);

        dateCell.innerHTML = '<input type="date">';
        descCell.innerHTML = '<input type="text">';
        incomeCell.innerHTML = '<input type="number" oninput="calculateTotals()">';
        expenseCell.innerHTML = '<input type="number" oninput="calculateTotals()">';
    }

    function removeRow() {
        if (table.rows.length > 0) {
            table.deleteRow(-1);
        }
        calculateTotals();
    }

    function calculateTotals() {
        let totalIncome = 0;
        let totalExpense = 0;

        for (let i = 0; i < table.rows.length; i++) {
            const income = parseFloat(table.rows[i].cells[2].getElementsByTagName('input')[0].value) || 0;
            const expense = parseFloat(table.rows[i].cells[3].getElementsByTagName('input')[0].value) || 0;
            totalIncome += income;
            totalExpense += expense;
        }
        const netTotal = totalIncome - totalExpense;
        document.getElementById('total').textContent = `Total Income: $${totalIncome}, Total Expenses: $${totalExpense}, Net Total: $${netTotal}`;
    }

    window.addRow = addRow;
    window.removeRow = removeRow;
    window.calculateTotals = calculateTotals;

    calculateTotals(); // Initial calculation

    // Smooth scrolling for navigation
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Button hover effect
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.1)';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
    });
});
