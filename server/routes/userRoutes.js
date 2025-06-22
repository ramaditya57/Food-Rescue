router.patch('/set-role', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // from authMiddleware
    const { role } = req.body;

    if (!['donor', 'volunteer'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const updated = await User.findByIdAndUpdate(userId, { role }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update role' });
  }
});
