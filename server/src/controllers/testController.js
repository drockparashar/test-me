import User from "../models/User.js";
import Test from "../models/Test.js";

export const submitTest = async (req, res) => {
  try {
    const {
      userId,
      testId,
      score,
      total,
      totalTime,
      detailedResults,
      selectedClass,
      selectedSubject,
      difficulty,
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
        difficulty,
      },
    });

    await newTest.save();

    // Update the user's test history
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Add the test document ID to the test details for proper linking
    const testHistoryEntry = {
      ...newTest.testDetails.toObject(),
      testDocumentId: newTest._id, // Store the actual Test document ID for linking
    };

    user.testHistory.push(testHistoryEntry);
    user.totalTestsTaken += 1;
    user.averageScore =
      (user.averageScore * (user.totalTestsTaken - 1) + score) /
      user.totalTestsTaken;
    user.highestScore = Math.max(user.highestScore, score);

    await user.save();

    console.log("Test submitted successfully with _id:", newTest._id);

    res.status(200).json({
      message: "Test submitted successfully",
      test: newTest._id,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting test" });
  }
};

export const getUserTestHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("testHistory");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.testHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching test history" });
  }
};

// Debug route to list all tests for a user
export const getUserTests = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching all tests for user:", userId);

    const tests = await Test.find({ userId }).sort({ _id: -1 }).limit(10);

    const testsInfo = tests.map((test) => ({
      _id: test._id,
      testId: test.testDetails.testId,
      score: test.testDetails.score,
      total: test.testDetails.total,
      testDate: test.testDetails.testDate,
      selectedSubject: test.testDetails.selectedSubject,
    }));

    res.status(200).json({
      message: "User tests found",
      count: testsInfo.length,
      tests: testsInfo,
    });
  } catch (error) {
    console.error("Error fetching user tests:", error);
    res.status(500).json({
      message: "Error fetching user tests",
      error: error.message,
    });
  }
};

export const getTestResult = async (req, res) => {
  try {
    const { testId } = req.params;
    console.log("Fetching test result for testId:", testId);

    // Validate ObjectId format
    if (!testId.match(/^[0-9a-fA-F]{24}$/)) {
      console.log("Invalid testId format:", testId);
      return res.status(400).json({ message: "Invalid test ID format" });
    }

    const test = await Test.findOne({ _id: testId });

    if (!test) {
      console.log("Test not found with _id:", testId);
      // Check if there are any tests in the database for debugging
      const totalTests = await Test.countDocuments();
      console.log("Total tests in database:", totalTests);
      return res.status(404).json({ message: "Test not found" });
    }

    const { testDetails } = test;
    console.log("Test details found:", {
      testId: testDetails.testId,
      score: testDetails.score,
      total: testDetails.total,
      detailedResultsCount: testDetails.detailedResults?.length || 0,
    });

    // The detailed results are already stored in testDetails.detailedResults
    const questions = testDetails.detailedResults || [];

    console.log("Questions/detailed results found:", questions.length);

    res.status(200).json({
      results: testDetails,
      questions: questions,
      difficulty: testDetails.difficulty,
    });
  } catch (error) {
    console.error("Error fetching test result:", error);
    res.status(500).json({
      message: "Error fetching test result",
      error: error.message,
    });
  }
};
