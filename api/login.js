export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  const USER = "NOX";
  const PASS = "nox123";

  if (username === USER && password === PASS) {
    return res.status(200).json({
      success: true,
      message: "ACCESS GRANTED"
    });
  }

  return res.status(401).json({
    success: false,
    message: "Username or password incorrect"
  });
}
