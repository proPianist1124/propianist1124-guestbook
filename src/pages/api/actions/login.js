import { serialize } from "cookie"
import supabase from "../../utils/supabase"

export default async function handler(req, res){
    if(req.method == "POST"){
        const { data: users } = await supabase.from("users").select("name")

        let existing_users = [];
        for(let i = 0; i < users.length; i++){
            existing_users.push(users[i].name)
        }

        if(existing_users.includes(req.body.username)){
            const { data: passwords } = await supabase.from("users").select("password");
            let existing_passwords = [];
            for(let i = 0; i < passwords.length; i++){
                existing_passwords.push(passwords[i].password)
            }
            if(req.body.password == existing_passwords[existing_users.indexOf(req.body.username)]){
                res.setHeader("Set-Cookie", [
                    serialize("user", req.body.username, { path: "/" }),
                    serialize("password", req.body.password, { path: "/" })
                ]);
                res.redirect(302, "/")
            }else{
                res.send("Wrong password")
            }
        }else{
            res.send("User doesn't exist")
        }
    }else{
        res.send("Bad request")
    }
}