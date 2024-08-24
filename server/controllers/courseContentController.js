const { initializeConnection } = require("../config/database");

exports.getCourseContent = async (req, res) => {
    const { username } = req.user;
    const courseId = parseInt(req.params.id);
      const sql = `
        SELECT c.name, c.description, c.vimeoVideoId, c.syllabus, c.instructor_bio, c.testimonials
        FROM purchased_courses pc 
        JOIN courses c ON pc.course_id = c.id 
        JOIN users u ON pc.user_id = u.id 
        WHERE u.username = ? AND c.id = ?
      `;
    
      try {
        const connection = await initializeConnection();

        const [results] = await connection.query(sql, [username, courseId]);
    
        if (results.length === 0) {
          console.warn(`User ${username} has not purchased course with id ${courseId}`);
          res.status(404).send("Course not found or not purchased");
        } else {
          console.log(`Course content fetched successfully for courseId: ${courseId}`);
          res.json(results[0]);
        }
      } catch (err) {
        console.error("Error fetching course content:", err);
        res.status(500).send("Error fetching course content");
      }
}