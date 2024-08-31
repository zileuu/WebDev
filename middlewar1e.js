import { NextResponse } from ("next/server");
import {verifyJoseJWT} from "@/_utils/joseUtils";

export async function middleware(req) {
    const JWTokenCookie = req.cookies.get("JWToken")

    const JWTokenBearer = JWTokenCookie ? JWTokenCookie.value : null

    const JWToken = JWTokenBearer.split("")[1]

    const payload = await verifyJoseJWT(JWToken)

    const role = payload.role


    return role ==="admin"
    ? NextResponse.next()
    : new NextResponse("Authentication required", {status:401})

    
}
export const config = {
    matcher: ("/dashboard","/panel"),
}

