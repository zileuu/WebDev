import { NextResponse } from "next/server";

export function middleware(req){
    try{
        const{pathname}=req.nextUrl;

        //log the path name
        console.log("Pathname:", pathname);

        //define protected path
        const protectedPaths = ["/dashboard","/profile"];
        const isProtectedPath = protectedPaths.includes(pathname);

        if(isProtectedPath){
            //log cookies
            console.log("Cookies:",req.cookies.getAll());

            const token = req.cookies.get("token");

            //Log the token for debbuguing
            console.log("Token", token);

            if(!token){
                const loginUrl = new URL ("/login", req.url);
                console.log("Redirect to login:", loginUrl);
                return NextResponse.redirect(loginUrl);



            }}
            return NextResponse.next();}
            // allow request to proceed
     
    
    catch (error){
            console.error("Middleware:", error);

            const errorUrl = new URL("/error", req.url);
            return NextResponse.redirect(errorUrl);

        }
    }





