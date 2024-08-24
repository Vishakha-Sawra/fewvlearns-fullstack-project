const { initializeConnection } = require("../config/database");


exports.storePurchase = async (req, res) => {
  const { courseIds } = req.body;
  const username = req.user.username;

  if (!Array.isArray(courseIds) || courseIds.length === 0) {
    return res.status(400).send("Invalid course IDs");
  }

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
    const email = userResults[0].email;

    const values = courseIds.map((courseId) => [userId, email, courseId]);
    const sql = "INSERT INTO purchased_courses (user_id, email, course_id) VALUES ?";

    await connection.query(sql, [values]);
    res.status(200).send("Purchase stored successfully");
  } catch (err) {
    console.error("Error storing purchase:", err);
    res.status(500).send("Error storing purchase");
  }
};
