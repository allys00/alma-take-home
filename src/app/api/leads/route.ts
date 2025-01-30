import { leads } from "@/reducer/leads/mock.data"

export async function GET() {
    return Response.json({ leads })
}


export async function POST(req: Request) {
    const { data } = await req.json()
    return Response.json({ lead: data })
}
