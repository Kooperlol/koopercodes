import clientPromise from "@/app/lib/mongodb";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("hamster");
    const rotations = await db.collection("data").findOne({ index: 1 });
    if (!rotations) {
      return Response.json({ error: "No rotations found" }, { status: 404 });
    }
    const data = rotations.rotations;
    return Response.json({ data });
  } catch (error) {
    console.error("GET /api/rotations", error);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}
