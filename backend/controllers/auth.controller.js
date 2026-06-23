export const verifyVoter = (req, res) => {
  const { voterId } = req.body;

  if (!voterId || voterId.length < 5) {
    return res.status(400).json({ success: false });
  }

  res.json({
    success: true,
    message: "Voter authenticated successfully"
  });
};
