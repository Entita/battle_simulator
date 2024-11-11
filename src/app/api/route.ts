import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ success: true})
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { } = await req.json()
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}