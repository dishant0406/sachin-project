var express = require('express');
var router = express.Router();
let College = require("../model/College");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/submit', (req, res) => {
  res.render('submit'); // Render the submit.ejs template
});

router.post('/submit', async (req, res) => {
  try {
    const { collegeName, city, district, state, collegeType, courses, nirfRanking, fieldOfStudy } = req.body;

    // Construct the location object
    const location = {
      city,
      district,
      state,
    };

    // Split the courses string into an array
    const coursesArray = courses.split(',').map(course => course.trim());

    // Create a new College document
    const newCollege = new College({
      collegeName,
      location,
      collegeType,
      courses: coursesArray,
      nirfRanking: parseInt(nirfRanking), // Convert to number (assuming it's a numeric value)
      fieldOfStudy,
    });

    // Save the document to the database
    await newCollege.save();

    res.render('submit');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/allcolleges', async (req, res) => {
  try {
    // Fetch all colleges from the database
    const colleges = await College.find();

    // Render the 'allcollege.ejs' template with the fetched data
    res.render('allcollege', { colleges });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/delete-college/:collegeId', async (req, res) => {
  try {
    const { collegeId } = req.params;

    // Delete the college from the database using the college ID
    const deletedCollege = await College.findByIdAndDelete(collegeId);

    if (deletedCollege) {
      res.json({ success: true, message: 'College deleted successfully.' });
    } else {
      res.json({ success: false, message: 'College not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



module.exports = router;
