import { NextResponse } from "next/server";
import { LemonSqueezyProvider } from "@/lib/billingProvider";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    await LemonSqueezyProvider.handleWebhook(payload);
    
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}
