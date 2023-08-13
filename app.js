const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const databasconnect = require('./config/databaseConfig');
var session = require('express-session')
var Project = require('./models/Project'); 
var Contact = require('./models/Contact'); 
const isAdmin = require('./middleware/IsAdmin');
databasconnect();

app.set('view engine', 'ejs');
app.use(expressLayouts); 
app.set("layout main-home", true)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true
}));
app.use((req, res, next) => {
    res.locals.loggedIn = req.session.loggedIn || false;
    next();
});

// Home route
// app.get('/', (req, res) => {
//     res.render('home', { layout: 'main-home' });
// });

// Login route
app.get('/', (req, res) => {
    res.render('login', {layout:false});
});

app.post('/login', async (req, res) => {
    
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
             // Assuming successful login
        req.session.loggedIn = true;
        req.session.user = { email: email, role: user.role }; // Store user data as needed

            res.redirect('/hero'); // Change the route accordingly
        } else {
            // Failed login, redirect back to the login page with an error message
            res.redirect('/login?error=1');
        }

    } catch (error) {
        console.log(error);
        res.redirect('/login?error=1');
    }
})


// Register route
app.get('/register', (req, res) => {
    res.render('register', {layout:false});
});

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {
        // Validate password confirmation
        if (password !== confirmPassword) {
            return res.redirect('/register?error=Passwords do not match');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create a new user with hashed password
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: 'user'
        });

        
        await user.save();

        // Redirect to the login page or dashboard
        res.redirect('/'); // Change the route accordingly
    } catch (error) {
        console.error(error);
        res.redirect('/register?error=1'); // Redirect back to registration with error
    }

})

app.get('/logout', (req, res) => {
    req.session.loggedIn = false;
    req.session.user = null;
    res.redirect('/');
});



// Hero route
app.get('/hero', (req, res) => {
    res.render('hero');
});

app.use((req, res, next) => {
    res.locals.flashMessage = req.session.flashMessage || ''; // Include flashMessage
    delete req.session.flashMessage; // Clear flashMessage after displaying
    next();
});


// Projects route
app.get('/projects',async (req, res) => {
    try {
        const projects = await Project.find(); // Fetch projects from the database
        res.render('projects', { projects }); // Pass the projects data to the template
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/add-project',isAdmin, async (req, res) => {
    const { projectName, projectDescription, websiteLink } = req.body;

    try {
        // Create a new instance of the Project model
        const project = new Project({
            projectName,
            projectDescription,
            websiteLink
        });

        // Save the project to the database
        await project.save();

        // Redirect the user back to the projects page or wherever you want
        res.redirect('/projects');
    } catch (error) {
        console.error(error);
        res.redirect('/projects?error=Failed to add project'); // Redirect back to projects page with error
    }
});


// app.js
app.get('/projects/:id/delete',isAdmin, async (req, res) => {
    const projectId = req.params.id;

    try {
        // Find the project by its _id and delete it
        await Project.findByIdAndDelete(projectId);

        // Redirect the user back to the projects page
        res.redirect('/projects');
    } catch (error) {
        console.error(error);
        res.redirect('/projects?error=Failed to delete project'); // Redirect back to projects page with error
    }
});


// Add Project route
app.get('/add-project',isAdmin, (req, res) => {
    res.render('addProject');
});

app.get('/Contact',async (req, res) => {
    res.render('Contact');
});

app.post('/Contact', async (req, res) => {
    const { name, email, contact} = req.body;
    try {
        // Create a new user with contact details
        const contacti = new Contact({
            name,
            email,
            contact,
        });

        
        await contacti.save();

        // Redirect to the login page or dashboard
        res.redirect('/Thanks'); // Change the route accordingly
    } catch (error) {
        console.error(error);
        res.send("Can't submit form as of now, Try Again Later!!");
    }

})

app.get('/Aboutme', (req, res) => {
    res.render('Aboutme');
})

app.get('/Thanks', (req, res) => {
    res.render("Thanks", {layout:false});
})

app.get("/Oops", (req, res) => {
    res.render('Oops')
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
