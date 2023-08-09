import { serialize } from "cookie"

export default function handler(req, res){
    res.setHeader("Set-Cookie", [
        serialize("user", "", {
            maxAge: -1,
            path: "/",
        }),
        serialize("password", "", {
            maxAge: -1,
            path: "/",
        }),
    ]);
    res.redirect(307, "/");
}