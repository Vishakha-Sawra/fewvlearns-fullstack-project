const stripe = require("../services/stripeClient");
const { initializeConnection } = require("../config/database");

const checkPurchasedCourses = async (userId, courseIds) => {
  try {
    const connection = await initializeConnection();
    const query = `SELECT course_id FROM purchased_courses WHERE user_id = ? AND course_id IN (${courseIds.map(() => '?').join(',')})`;
    const params = [userId, ...courseIds];

    console.log("Executing query:", query);
    console.log("With parameters:", params);

    const [results] = await connection.query(query, params);
    console.log("Purchased courses:", results); // Add logging here
    return results.map(result => result.course_id);
  } catch (err) {
    console.error("Error checking purchased courses:", err);
    throw new Error("Error checking purchased courses");
  }
};

const storeItems = new Map([
  [1, { priceInCents: 3000, name: "Learn About Kafka and Node.js"}],
  [2, { priceInCents: 2000, name: "React, but with webpack" }],
  [3, { priceInCents: 2000, name: "Learn About Terraform in Depth" }],
  [4, { priceInCents: 3000, name: "Kubernetes and Docker for deployment" }],
  [5, { priceInCents: 4000, name: "Create your own Serverless web app" }],
]);

exports.createCheckoutSession = async (req, res) => {
  try {
    console.log("User object:", req.user); // Add logging here

    const userId = req.user.id;
    if (!userId) {
      throw new Error("User ID is not defined. Ensure the user is authenticated.");
    }

    const courseIds = req.body.items.map((item) => item.id);

    // Check if any of the selected courses have already been purchased
    const purchasedCourseIds = await checkPurchasedCourses(userId, courseIds);

    console.log("Purchased course IDs:", purchasedCourseIds); // Add logging here

    if (purchasedCourseIds.length > 0) {
      return res.status(400).json({
        message: `You have already purchased courses with IDs: ${purchasedCourseIds.join(", ")}`,
        purchasedCourseIds,
      });
    }

    const lineItems = req.body.items.reduce((acc, item) => {
      const storeItem = storeItems.get(item.id);
      if (!storeItem) {
        console.error(`Item with id ${item.id} not found`);
        return acc; // Skip this item
      }
      acc.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: storeItem.name,
          },
          unit_amount: storeItem.priceInCents,
        },
        quantity: item.quantity,
      });
      return acc;
    }, []);

    if (lineItems.length === 0) {
      throw new Error("No valid items found for checkout.");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}&course_id=${JSON.stringify(courseIds)}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error("Error creating checkout session:", e.message);
    res.status(500).json({ error: e.message });
  }
};
