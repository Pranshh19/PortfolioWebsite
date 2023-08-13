const Project = require('./models/Project'); // Update the path if needed

const addProjectBtn = document.getElementById('add-project-btn');
const addProjectModal = document.getElementById('add-project-modal');
const projectNameInput = document.getElementById('project-name');
const projectDescriptionInput = document.getElementById('project-description');
const websiteLinkInput = document.getElementById('website-link');
const addBtn = document.getElementById('add-btn');
const cancelBtn = document.getElementById('cancel-btn');
const projectsContainer = document.querySelector('.projects-container');

// Event listener for "Add Project" button
addProjectBtn.addEventListener('click', () => {
    addProjectModal.style.display = 'block';
});

// Event listener for "Add" button in the modal
addBtn.addEventListener('click', () => {
    // Get input values
    const projectName = projectNameInput.value;
    const projectDescription = projectDescriptionInput.value;
    const websiteLink = websiteLinkInput.value;

    // Create a new project card
    const newProjectCard = document.createElement('div');
    newProjectCard.classList.add('project-card');
    newProjectCard.innerHTML = `
        <h2>${projectName}</h2>
        <p>${projectDescription}</p>
        <a href="${websiteLink}" target="_blank">Show Project</a>
        <a href="#">Show Source Code</a>
    `;

    // Add the new project card to the projects container
    projectsContainer.appendChild(newProjectCard);

    // Clear input fields
    projectNameInput.value = '';
    projectDescriptionInput.value = '';
    websiteLinkInput.value = '';

    // Close the modal
    addProjectModal.style.display = 'none';
});

// Event listener for "Cancel" button in the modal
cancelBtn.addEventListener('click', () => {
    // Clear input fields
    projectNameInput.value = '';
    projectDescriptionInput.value = '';
    websiteLinkInput.value = '';

    // Close the modal
    addProjectModal.style.display = 'none';
});




// ... Other code ...




// Event listener for "Add" button in the modal
addBtn.addEventListener('click', async () => {
    // Get input values
    const projectName = projectNameInput.value;
    const projectDescription = projectDescriptionInput.value;
    const websiteLink = websiteLinkInput.value;

    try {
        // Create a new project in the database
        const newProject = new Project({
            projectName,
            projectDescription,
            websiteLink
        });
        await newProject.save();

        // Create a new project card
        const newProjectCard = document.createElement('div');
        newProjectCard.classList.add('project-card');
        newProjectCard.innerHTML = `
            <h2>${projectName}</h2>
            <p>${projectDescription}</p>
            <a href="${websiteLink}" target="_blank">Show Project</a>
            <a href="#">Show Source Code</a>
        `;

        // Add the new project card to the projects container
        projectsContainer.appendChild(newProjectCard);

        // Clear input fields
        projectNameInput.value = '';
        projectDescriptionInput.value = '';
        websiteLinkInput.value = '';

        // Close the modal
        addProjectModal.style.display = 'none';
    } catch (error) {
        console.error('Error adding project:', error);
    }
});

// ... Other code ...
