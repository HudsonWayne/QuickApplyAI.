export default async function handler(req, res) {
  try {
    const { job, cv } = req.body;

    // For now, simulate application
    // Later, integrate with real job board APIs or email
    console.log("Applying to:", job.title, "with CV:", cv);

    res.status(200).json({ message: `Auto-applied to ${job.title} at ${job.company}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Application failed" });
  }
}
