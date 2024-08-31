import { NextResponse } from "next/server";

export async function middleware(request) {

const token = request.cookies.get("authToken");
if (token){
    //user redirected to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));


}
//user denied to acess login page
return NextResponse.next();
}