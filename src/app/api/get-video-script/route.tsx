import { chatSession } from "@/lib/AiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response): Promise<Response> {
    try {
        const {prompt} = await req.json();
        console.log("user prompts", prompt);

        const result = await chatSession.sendMessage(prompt);
        console.log("AI response",result.response.text());


        return NextResponse.json({'result': JSON.parse(result.response.text())})
    } catch (error) {
        return NextResponse.json({'error': error});
    }
}