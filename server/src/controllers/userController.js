import User from '../models/User.js';

export const getUserData = async (req, res) => {
  try {
    // Get user ID from request parameters
    const userId = req.params.id; // Assuming the route is defined as /users/:id

    // Fetch user data from the database
    const user = await User.findOne({ _id: userId }); // Exclude password field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user data as the response
    res.status(200).json({
      username: user.username,
      email: user.email,
      totalTestsTaken: user.totalTestsTaken,
      averageScore: user.averageScore,
      highestScore: user.highestScore,
      testHistory: user.testHistory
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};