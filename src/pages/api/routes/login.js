import { serialize } from "cookie"
import supabase from "../supabase"

export default async function handler(req, res){
    if(req.method == "POST"){
        // const { data: users } = await supabase.from("users").select() string instead with "index of" req.body.username

        let usernames = [];
        let passwords = [];

        const { data: users } = await supabase.from("users").select()

        for(let i = 0; i < users.length; i++){
            usernames.push(users[i].name)
            passwords.push(users[i].password)
        }

        if(usernames.includes(req.body.username)){
            if(req.body.password == passwords[usernames.indexOf(req.body.username)]){
                res.setHeader("Set-Cookie", [
                    serialize("user", req.body.username, { path: "/" }),
                    serialize("password", req.body.password, { path: "/" })
                ]);
                res.redirect(302, "/")
            }else{
                res.send("Wrong password");
            }
        }else{
            res.send("User doesn't exist");
        }
    }else{
        res.send("Bad request");
    }
}