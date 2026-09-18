export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const endpoint = req.query.endpoint || "";
  const token = process.env.CLASH_ROYALE_API_KEY || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijk4NjgyNmYyLWUyY2MtNGUwZS1hNGUwLTlhMTBkOWU3NTdlYiIsImlhdCI6MTc4OTc0OTg1MSwic3ViIjoiZGV2ZWxvcGVyL2I2YWRiNmRkLWVkM2MtNDhiZC04OTE5LTU1YjJhYjYyOTYwMCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS43OS4yMTguNzkiXSwidHlwZSI6ImNsaWVudCJ9XX0.QPsNhg4EWwJAMiXmBUcijlb4m159CVw6e0xr_PHjyhfuc-1ynuvVstR3Et4AdZdteLJRky58uxIHWbtPwQl5ww";

  const targetUrl = `https://proxy.royaleapi.dev/v1/${endpoint}`;

  try {
    const upstreamRes = await fetch(targetUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "User-Agent": "NexusRoyale/1.0 (Macintosh; Intel Mac OS X 10_15_7)"
      }
    });

    const data = await upstreamRes.json();
    return res.status(upstreamRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message, message: "Cloud Proxy Error" });
  }
}
