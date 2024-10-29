import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";
import { ChatModel } from "openai/resources";

export async function POST(req: Request) {
  const {
    apiKey,
    prompt,
    model,
  }: { apiKey: string; prompt: string; model: ChatModel } = await req.json();
  const openai = createOpenAI({
    apiKey,
  });

  try {
    console.log(prompt);
    // Request the OpenAI API for the response based on the prompt
    const result = await streamText({
      model: openai(model),
      prompt,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
