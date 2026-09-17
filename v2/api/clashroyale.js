export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const endpoint = req.query.endpoint || "";
  const token = process.env.CLASH_ROYALE_API_KEY || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImYxMDU3ZDM0LWVmZWYtNDUwNy1iNDhmLTM2ZjUwMTI4YjgwYSIsImlhdCI6MTc4OTY3ODI0OCwic3ViIjoiZGV2ZWxvcGVyL2I2YWRiNmRkLWVkM2MtNDhiZC04OTE5LTU1YjJhYjYyOTYwMCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxOTguODQuMjAxLjIxNCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.WCrHNZtHkfCYOP7Ni99hJhC-K8y1bUeFsJHJrtTnYv6rXCIN-ruitlHSXx_W0JrOmvNaeVS1dpW4jlYf0Vd3Fg";

  const targetUrl = `https://api.clashroyale.com/v1/${endpoint}`;

  try {
    const upstreamRes = await fetch(targetUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    const data = await upstreamRes.json();
    return res.status(upstreamRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message, message: "Cloud Proxy Error" });
  }
}
