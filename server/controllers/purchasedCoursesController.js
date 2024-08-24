const { initializeConnection } = require("../config/database");

exports.getPurchasedCourses = async (req, res) => {
  const username = req.user.username;

  try {
    const connection = await initializeConnection();
    const [userResults] = await connection.query(
      "SELECT id, email FROM users WHERE username = ?",
      [username]
    );

    if (userResults.length === 0) {
      return res.status(400).send("User does not exist");
    }

    const userId = userResults[0].id;

    const sql = `
      SELECT DISTINCT courses.id, courses.name, courses.description 
      FROM purchased_courses 
      INNER JOIN courses ON purchased_courses.course_id = courses.id 
      WHERE purchased_courses.user_id = ?
    `;
    const [results] = await connection.query(sql, [userId]);
    res.json(results);
  } catch (err) {
    console.error("Error fetching purchased courses:", err);
    res.status(500).send("Error fetching purchased courses");
  }
};