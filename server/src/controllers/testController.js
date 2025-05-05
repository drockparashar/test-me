import User from '../models/User.js';
import Test from '../models/Test.js';

export const submitTest = async (req, res) => {
  try {
    const {
      userId, testId, score, total, totalTime, detailedResults,
      selectedClass, selectedSubject, difficulty
    } = req.body;

    // Create a new test entry
    const newTest = new Test({
      userId,
      testDetails: {
        testId,
        testDate: new Date(),
        score,
        total,
        totalTime,
        detailedResults,
        selectedClass,
        selectedSubject,
        difficulty
      }
    });

    await newTest.save();

    // Update the user’s test history
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.testHistory.push(newTest.testDetails);
    user.totalTestsTaken += 1;
    user.averageScore = ((user.averageScore * (user.totalTestsTaken - 1)) + score) / user.totalTestsTaken;
    user.highestScore = Math.max(user.highestScore, score);

    await user.save();

    res.status(200).json({ message: "Test submitted successfully", test: newTest._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting test" });
  }
};


export const getUserTestHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('testHistory');

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.testHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching test history" });
  }
};

export const getTestResult = async (req, res) => {
  try {
    const { testId } = req.params;
    console.log(testId);
    const test = await Test.findOne({_id: testId});

    if (!test) return res.status(404).json({ message: "Test not found" });

    const { testDetails } = test;
    const user = await User.findById(test.userId).select('testHistory');
    const questions = user.testHistory.find(t => t._id.toString() === testId)?.detailedResults || [];

    res.status(200).json({ results: testDetails, questions, difficulty: testDetails.difficulty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching test result" });
  }
};