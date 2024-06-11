import { dbConnect } from "@/backend/config/dbConnect";
import User from "@/backend/model/User";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(req) {
  try {
    const reqBody = req.json();
    const { username, email, password } = reqBody;
    console.log(req.body);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
