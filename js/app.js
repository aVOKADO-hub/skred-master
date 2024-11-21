// Initial default data
const defaultEmployees = [
    { firstName: "Іван", lastName: "Коваленко", department: "Адміністрація", position: "Керівник", hireDate: "2022-05-10" },
    { firstName: "Марія", lastName: "Шевченко", department: "Науковий", position: "Дослідник", hireDate: "2023-03-15" },
    { firstName: "Олександр", lastName: "Петренко", department: "Технічний", position: "Інженер", hireDate: "2023-03-15" }
];

// Initialize employees array
let employees = [];

// Function to save employees to localStorage
function saveEmployeesToLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(employees));
}

// Function to load employees from localStorage
function loadEmployeesFromLocalStorage() {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
        employees = JSON.parse(savedEmployees);
    } else {
        // If no saved data exists, use default employees
        employees = [...defaultEmployees];
        saveEmployeesToLocalStorage();
    }
}

// Ensure the function is correctly defined and attached to the event listener
// Function to add a new employee
function addEmployee() {
    console.log("Add Employee function called"); // Debug log

    // Use prompt for other fields
    const firstName = prompt("Введіть ім'я:");
    const lastName = prompt("Введіть прізвище:");
    const department = prompt("Введіть відділ:");
    const position = prompt("Введіть посаду:");

    // Select a predefined container or create one if not present
    let dateContainer = document.getElementById('dateInputContainer');
    if (!dateContainer) {
        dateContainer = document.createElement('div');
        dateContainer.id = 'dateInputContainer';
        dateContainer.style.marginTop = '10px';
        dateContainer.style.textAlign = 'center'; // Optional: Style for centering
        document.body.insertBefore(dateContainer, document.body.firstChild); // Add container at the top
    }

    // Create the date input element
    const hireDateInput = document.createElement('input');
    hireDateInput.type = 'date'; // Set type to 'date'
    hireDateInput.id = 'hireDateInput'; // Optional: Assign an ID
    hireDateInput.style.margin = '10px'; // Add some margin for spacing

    // Add a label for better UI
    const label = document.createElement('label');
    label.for = 'hireDateInput';
    label.textContent = "Оберіть дату прийняття на роботу: ";
    label.style.display = 'block';

    // Clear the container and append the input field and label
    dateContainer.innerHTML = ''; // Clear previous content
    dateContainer.appendChild(label);
    dateContainer.appendChild(hireDateInput);

    // Wait for the user to select a date
    hireDateInput.addEventListener('change', () => {
        const hireDate = hireDateInput.value; // Get the selected date value

        console.log("Input values:", { firstName, lastName, department, position, hireDate }); // Debug log

        // Check if all fields are filled
        if (firstName && lastName && department && position && hireDate) {
            // Add the new employee with the selected hireDate
            employees.push({
                firstName,
                lastName,
                department,
                position,
                hireDate,
            });

            console.log("Employee added:", employees[employees.length - 1]); // Log the added employee

            // Save to localStorage
            saveEmployeesToLocalStorage();

            // Render employees
            renderEmployees();

            // Render department stats if table exists
            if (document.getElementById('departmentStats')) {
                renderDepartmentStats();
            }

            // Clear the date container after successful addition
            dateContainer.innerHTML = '';
        } else {
            console.warn("All fields must be filled"); // Better visibility for warnings
            alert("Всі поля мають бути заповнені!");
        }
    });

    // Automatically focus on the date input
    hireDateInput.focus();
}


// Comprehensive initialization function
function initializeEmployeeManagement() {
    console.log("Initializing employee management"); // Debug log

    // Load employees from localStorage
    loadEmployeesFromLocalStorage();

    // Render employees
    renderEmployees();

    // Add event listener with error handling
    const addEmployeeButton = document.getElementById('addEmployee');
    if (addEmployeeButton) {
        console.log("Add Employee button found"); // Debug log
        addEmployeeButton.addEventListener('click', addEmployee);
    } else {
        console.error("Add Employee button not found"); // Error log if button is missing
    }
}

// Function to render employees (make sure this is correctly implemented)
function renderEmployees() {
    console.log("Rendering employees"); // Debug log
    
    // Ensure the table body exists
    const tableBody = document.getElementById('employeeTable');
    
    if (!tableBody) {
        console.error("Employee table not found");
        return;
    }

    // Clear existing rows
    tableBody.innerHTML = '';

    // Render each employee
    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>${employee.department}</td>
            <td>${employee.position}</td>
            <td>
                <button onclick="editEmployee(${index})">Редагувати</button>
                <button onclick="deleteEmployee(${index})">Видалити</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    console.log(`Rendered ${employees.length} employees`); // Log number of rendered employees
}

// Ensure localStorage functions are working correctly
function saveEmployeesToLocalStorage() {
    try {
        localStorage.setItem('employees', JSON.stringify(employees));
        console.log("Employees saved to localStorage"); // Confirm saving
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
}

function loadEmployeesFromLocalStorage() {
    try {
        const savedEmployees = localStorage.getItem('employees');
        if (savedEmployees) {
            employees = JSON.parse(savedEmployees);
            console.log("Employees loaded from localStorage"); // Confirm loading
        } else {
            // If no saved data, use default employees
            employees = [...defaultEmployees];
            saveEmployeesToLocalStorage();
            console.log("Used default employees");
        }
    } catch (error) {
        console.error("Error loading from localStorage:", error);
        employees = [...defaultEmployees];
    }
}

// Attach initialization to DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeEmployeeManagement);

// Function to edit an existing employee
function editEmployee(index) {
    const employee = employees[index];
    const firstName = prompt("Введіть нове ім'я:", employee.firstName);
    const lastName = prompt("Введіть нове прізвище:", employee.lastName);
    const department = prompt("Введіть новий відділ:", employee.department);
    const position = prompt("Введіть нову посаду:", employee.position);

    if (firstName && lastName && department && position) {
        employees[index] = { 
            ...employee, // Preserve other properties like hireDate
            firstName, 
            lastName, 
            department, 
            position 
        };
        saveEmployeesToLocalStorage(); // Save after editing
        renderEmployees();
        if (document.getElementById('departmentStats')) {
            renderDepartmentStats();
        }
    } else {
        alert("Всі поля мають бути заповнені!");
    }
}

// Function to delete an employee
function deleteEmployee(index) {
    if (confirm("Ви впевнені, що хочете видалити цього працівника?")) {
        employees.splice(index, 1);
        saveEmployeesToLocalStorage(); // Save after deleting
        renderEmployees();
        if (document.getElementById('departmentStats')) {
            renderDepartmentStats();
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadEmployeesFromLocalStorage(); // Load saved data first
    renderEmployees(); // Render the table
    
    // Add event listeners
    document.getElementById('addEmployee').addEventListener('click', addEmployee);
    
    // If department stats exist, render them
    if (document.getElementById('departmentStats')) {
        renderDepartmentStats();
    }
});

// Function to calculate department statistics
function getDepartmentStats() {
    const stats = {};

    employees.forEach(employee => {
        if (!stats[employee.department]) {
            stats[employee.department] = 0;
        }
        stats[employee.department]++;
    });

    return stats;
}

// Function to render department statistics
function renderDepartmentStats() {
    const stats = getDepartmentStats();
    const statsTable = document.getElementById('departmentStats');
    statsTable.innerHTML = ''; // Clear table before rendering

    // Calculate the total number of employees
    const totalEmployees = employees.length;

    for (const [department, count] of Object.entries(stats)) {
        // Calculate the percentage for each department
        const percentage = ((count / totalEmployees) * 100).toFixed(2); // Round to two decimal places

        const row = document.createElement('tr');
        
        // Append department, count, and percentage to the table
        row.innerHTML = `
            <td>${department}</td>
            <td>${count}</td>
            <td>${percentage}%</td>
        `;
        
        statsTable.appendChild(row);
    }
}


// Initialize department overview on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('departmentStats')) {
        renderDepartmentStats();
    }
});


// Function to render a report in the results table
function renderReport(data) {
    const resultsTable = document.getElementById('reportResults');
    resultsTable.innerHTML = ''; // Clear table before rendering

    if (data.length === 0) {
        resultsTable.innerHTML = '<tr><td colspan="4">Немає даних для відображення</td></tr>';
        return;
    }

    data.forEach(employee => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>${employee.department}</td>
            <td>${employee.position}</td>
        `;
        resultsTable.appendChild(row);
    });
}

// Function to generate a report of all employees
function generateAllEmployeesReport() {
    renderReport(employees);
}

// Function to generate a report of employees hired in the last year
function generateHiredLastYearReport() {
    const currentYear = new Date().getFullYear();
    const filteredEmployees = employees.filter(employee => {
        const hireYear = new Date(employee.hireDate).getFullYear();
        return hireYear === currentYear - 1;
    });

    renderReport(filteredEmployees);
}

// Initialize reports page logic
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('generateAllEmployeesReport')) {
        document.getElementById('generateAllEmployeesReport').addEventListener('click', generateAllEmployeesReport);
        document.getElementById('generateHiredLastYearReport').addEventListener('click', generateHiredLastYearReport);
    }
});

document.getElementById('exportBtn').addEventListener('click', function () {
  // Select the table element
  const table = document.querySelector('table');
  
  // Convert the HTML table to a worksheet
  const ws = XLSX.utils.table_to_sheet(table);
  
  // Create a new workbook and append the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Reports");
  
  // Export the workbook to a file
  XLSX.writeFile(wb, "report.xlsx");
});



// Function to apply the selected theme
function applyTheme() {
    const theme = document.getElementById('themeSelector').value;
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
    }
}

// Function to apply language changes (example placeholder)
function applyLanguage() {
    const language = document.getElementById('languageSelector').value;
    if (language === 'english') {
        alert('Language changed to English');
    } else {
        alert('Мова змінена на українську');
    }
}

// Initialize settings page logic
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('applyThemeBtn').addEventListener('click', applyTheme);
    document.getElementById('applyLanguageBtn').addEventListener('click', applyLanguage);

    // Set initial theme (default: light)
    document.body.classList.add('light-theme');
});


function saveEmployeesToLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(employees));
}


function loadEmployeesFromLocalStorage() {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
        employees = JSON.parse(savedEmployees); // Parse the JSON string to get back the array
    }
}


