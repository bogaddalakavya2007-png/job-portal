javascript
const sampleJobs = [
    {
        jobId: "J101",
        title: "Frontend Developer",
        company: "Tech Solutions",
        location: "Hyderabad",
        salary: "₹4–6 LPA",
        skills: "HTML, CSS, JavaScript",
        interviewDate: "2026-11-05"
    },
    {
        jobId: "J102",
        title: "Java Developer",
        company: "CodeWorks",
        location: "Bengaluru",
        salary: "₹5–8 LPA",
        skills: "Java, SQL, OOP",
        interviewDate: "2026-11-12"
    },
    {
        jobId: "J103",
        title: "Data Analyst",
        company: "Bright Analytics",
        location: "Chennai",
        salary: "₹4–7 LPA",
        skills: "Python, SQL, Excel",
        interviewDate: "2026-11-18"
    }
];

const STORAGE_KEY = "kavyaJobPortalJobs";

let jobs;

try {
    const savedJobs = localStorage.getItem(STORAGE_KEY);
    jobs = savedJobs ? JSON.parse(savedJobs) : sampleJobs;
    if (!Array.isArray(jobs)) jobs = sampleJobs;
} catch {
    jobs = sampleJobs;
}

const tableBody = document.getElementById("jobTableBody");
const searchInput = document.getElementById("searchInput");
const jobCount = document.getElementById("jobCount");
const emptyMessage = document.getElementById("emptyMessage");
const jobFormSection = document.getElementById("jobFormSection");
const jobForm = document.getElementById("jobForm");

function saveJobs() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

function renderJobs() {
    const query = searchInput.value.trim().toLowerCase();

    const filteredJobs = jobs.filter(job =>
        Object.values(job).some(value =>
            String(value).toLowerCase().includes(query)
        )
    );

    tableBody.replaceChildren();

    filteredJobs.forEach(job => {
        const row = document.createElement("tr");

        const values = [
            job.jobId,
            job.title,
            job.company,
            job.location,
            job.salary,
            job.skills,
            job.interviewDate
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", () => {
            jobs = jobs.filter(item => item.jobId !== job.jobId);
            saveJobs();
            renderJobs();
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
    });

    jobCount.textContent =
        `${filteredJobs.length} job${filteredJobs.length === 1 ? "" : "s"}`;

    emptyMessage.hidden = filteredJobs.length !== 0;
}

document.getElementById("showFormBtn").addEventListener("click", () => {
    jobFormSection.hidden = !jobFormSection.hidden;
});

document.getElementById("cancelBtn").addEventListener("click", () => {
    jobForm.reset();
    jobFormSection.hidden = true;
});

jobForm.addEventListener("submit", event => {
    event.preventDefault();

    const newJob = {
        jobId: document.getElementById("jobId").value.trim(),
        title: document.getElementById("title").value.trim(),
        company: document.getElementById("company").value.trim(),
        location: document.getElementById("location").value.trim(),
        salary: document.getElementById("salary").value.trim(),
        skills: document.getElementById("skills").value.trim(),
        interviewDate: document.getElementById("interviewDate").value
    };

    if (jobs.some(job =>
        job.jobId.toLowerCase() === newJob.jobId.toLowerCase()
    )) {
        alert("That Job ID already exists. Please use a different ID.");
        return;
    }

    jobs.push(newJob);
    saveJobs();

    jobForm.reset();
    jobFormSection.hidden = true;
    searchInput.value = "";
    renderJobs();

    alert("Job added successfully!");
});

searchInput.addEventListener("input", renderJobs);

renderJobs();