// Array to store submitted projects
const projects = [];

// Function to validate URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}

// Function to handle project submission
function submitProject() {
    const projectLink = document.getElementById('project-link').value;

    if (!projectLink) {
        alert("Please enter a project link!");
        return;
    }

    if (!isValidUrl(projectLink)) {
        alert("Invalid URL! Please enter a valid link.");
        return;
    }

    // Check if the project already exists
    const existingProject = projects.find(
        (project) => project.link.toLowerCase() === projectLink.toLowerCase()
    );

    if (existingProject) {
        alert("This project is already in the list!");
        return;
    }

    // Add project to the array with default votes
    projects.push({ link: projectLink, votes: 0 });
    document.getElementById('project-link').value = ''; // Clear input field
    renderProjects(); // Update the voting section
}

// Function to handle voting
function vote(index) {
    projects[index].votes += 1; // Increment vote count for the selected project
    renderProjects(); // Re-render the voting list
}

// Function to render projects dynamically
function renderProjects() {
    const container = document.getElementById('voting-container');
    container.innerHTML = ''; // Clear the container

    // Sort projects by votes in descending order
    projects
        .sort((a, b) => b.votes - a.votes)
        .forEach((project, index) => {
            // Create a vote-item for each project
            const projectDiv = document.createElement('div');
            projectDiv.className = 'vote-item';
            projectDiv.innerHTML = `
                <span>
                    <a href="${project.link}" target="_blank">${project.link}</a> - Votes: ${project.votes}
                </span>
                <button onclick="vote(${index})">Vote</button>
            `;
            container.appendChild(projectDiv);
        });
}
