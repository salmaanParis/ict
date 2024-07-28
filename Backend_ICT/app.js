const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3001; // Define the port number

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://princymoljoseph:IxtVIf2mR7JCkC4m@cluster0.xsykx8r.mongodb.net/ICT_FinalProject",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("MongoDB connected successfully"))
.catch((error) => console.log("MongoDB connection error:", error));

// Define the signup schema and model
const signupSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  batch: String
});

const Signup = mongoose.model('Signup', signupSchema);

// Sample data for exit exam
const students = [
  {
    _id: '669114f840ab23ba48fff1cf',
    s_id: 'princy@gmail.com',
    s_name: 'Princy',
    s_course: 'FSD',
    s_startdate: '7th March 2024',
    s_mentor: 'Mridula',
    s_grade: 'A',
    s_exitscore: 80
  },
  {
    _id: '6691158440ab23ba48fff1d0',
    s_id: 'arjun@gmail.com',
    s_name: 'Arjun',
    s_course: 'FSD',
    s_startdate: '7th March 2024',
    s_mentor: 'Mridula',
    s_grade: 'A',
    s_exitscore: 85
  },
  {
    _id: '669115ae40ab23ba48fff1d1',
    s_id: 'salman@gmail.com',
    s_name: 'Salman',
    s_course: 'FSD',
    s_startdate: '7th March 2024',
    s_mentor: 'Mridula',
    s_grade: 'B',
    s_exitscore: 75
  },
  {
    _id: '669115e840ab23ba48fff1d2',
    s_id: 'fathima@gmail.com',
    s_name: 'Fathima',
    s_course: 'FSD',
    s_startdate: '7th March 2024',
    s_mentor: 'Mridula',
    s_grade: 'B',
    s_exitscore: 70
  },
  {
    _id: '6691161140ab23ba48fff1d3',
    s_id: 'shamna@gmail.com',
    s_name: 'Shamna',
    s_course: 'AI',
    s_startdate: '13th April 2024',
    s_mentor: 'Tiya',
    s_grade: 'B',
    s_exitscore: 40
  },
  {
    _id: '6691165440ab23ba48fff1d4',
    s_id: 'rahul@gmail.com',
    s_name: 'Rahul',
    s_exitscore: 65
  },
  {
    _id: '6691169a40ab23ba48fff1d5',
    s_id: 'ananya@gmail.com',
    s_name: 'Ananya',
    s_exitscore: 90
  },
  {
    _id: '669116c940ab23ba48fff1d6',
    s_id: 'deepak@gmail.com',
    s_name: 'Deepak',
    s_exitscore: 55
  },
  {
    _id: '6691170d40ab23ba48fff1d7',
    s_id: 'meera@gmail.com',
    s_name: 'Meera',
    s_exitscore: 18
  }
];



// Middleware to verify JWT token
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, "jwt-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded; // Attach decoded token to req.user
    next();
  });
};

// Protected route example
app.get('/home', verifyUser, (req, res) => {
  res.status(200).json("Success");
});

// Define the Login route (with bcrypt and JWT)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Signup.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email }, "jwt-secret-key", { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None' });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Define the Signup route
app.post('/Signup', (req, res) => {
  const { name, email, password, phone, batch } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => {
      Signup.create({ name, email, password: hash, phone, batch })
        .then(signup => {
          console.log('User data received:', req.body);
          res.status(201).json(signup);
        })
        .catch(err => {
          console.error('Error creating user:', err);
          res.status(400).json({ error: err.message });
        });
    })
    .catch(err => {
      console.error('Error hashing password:', err);
      res.status(500).json({ error: 'Server error' });
    });
});

// Route to check if a student passed the exit exam
app.post('/check-exit-exam', (req, res) => {
  const { email } = req.body;
  const student = students.find(student => student.s_id === email);
  if (student && student.s_exitscore >= 50) {
    res.status(200).json({ passed: true });
  } else {
    res.status(200).json({ passed: false });
  }
});

// Optional: Define a route to verify the token and retrieve user info
app.get('/verify-token', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, "jwt-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(200).json({ message: "Token is valid", email: decoded.email });
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


