const { initializeConnection } = require("../config/database");

exports.getCourseDetails = async (req, res) => {
  // const courseId = req.params.id; 
  const courseId = parseInt(req.params.id);
  const sql = "SELECT * FROM course_details WHERE id = ?"; 

  try {
    const connection = await initializeConnection();
    const [results] = await connection.query(sql, [courseId]);
    if (results.length === 0) {
      res.status(404).send("Course not found");
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    console.error("Error fetching course details:", err);
    res.status(500).send("Error fetching course details");
  }
};

