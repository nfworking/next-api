export async function GET() {
  const token = process.env.PROXMOX_API_TOKEN;

  if (!token) {
    return Response.json(
      { error: "Missing token" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      "https://ao2.fortmont.me/api2/json/nodes/",
      {
        headers: {
          Authorization: token,
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    return Response.json(data);
  } catch (err) {
    return Response.json(
      { error: "Failed to fetch" },
      { status: 500 }
    );
  }
}
