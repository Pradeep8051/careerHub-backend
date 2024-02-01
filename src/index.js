const  express = require('express');
const app = express();
const env = require("dotenv");
const path = require('path');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const cors = require('cors');
// const adminRoutes = require('./routes/admin/uath');
const authRoutes = require('./routes/auth.js');
const educationRoutes = require('./routes/education.js');
const JobsRoutes = require('./routes/Jobs.js');
const AppliedJobRoutes = require('./routes/AppliedJob.js');
const OTPRoutes = require('./routes/OTP.js');

const { IndustryInsert, GetIndustryList } = require('./controllers/comman.js');


app.use(cors());
// env
env.config();

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'uploads')) // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      let fileName=req.body.fileName
      const ext = path.extname(file.originalname);
      cb(null, `${fileName}${ext}`) 
      // cb(null, file.originalname) // Set the filename for uploaded files
    }
  });

const upload = multer({ storage: storage });

mongoose.connect(
    `mongodb+srv://${process.env.MONGOUSER}:${process.env.PASSWORD}@cluster0.14s2uua.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
     {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
        }
        ).then(() => {
            console.log('database is connected')
        }).catch((err)=>{
          console.log('database Error',err)
        });

app.use(express.json());

// app.use('/api',adminRoutes);

app.use(authRoutes);
app.use(educationRoutes);
app.use(JobsRoutes);
app.use(AppliedJobRoutes);
app.use(OTPRoutes);

app.use('/api',authRoutes);
app.use('/api',educationRoutes);
app.use('/api',JobsRoutes);
app.use('/api',AppliedJobRoutes);


app.post('/industryInsert',IndustryInsert);
app.get('/getIndustryList',GetIndustryList);

app.use('/public',express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).send('No file uploaded.');
    }  
    res.status(200).send('File uploaded successfully!');
  });

app.get('/test', (req, res) => {
  res.status(200).send('Test successfully!');
});

//Multiple files
app.post("/upload/multiple", upload.array("file", 10), (req, res) => {
    console.log(req.files)
    return res.send("Multiple files")
  })

// app.listen(process.env.PORT,'195.35.20.142');

app.listen(process.env.PORT,() => {
    console.log(`connected and port no ${process.env.PORT}.`);
});