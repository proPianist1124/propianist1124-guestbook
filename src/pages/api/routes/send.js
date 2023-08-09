import supabase from "../supabase"
const timestamp = require("time-stamp")

export default async function handler(req, res){
    if(req.method == "POST"){
        //res.send(`${req.body.content}\n${req.cookies.user}\n${timestamp("MM/DD")}`);
        await supabase.from("messages").insert({ content: req.body.content, author: req.cookies.user, date: timestamp("MM/DD") });
        res.redirect(302, "/")
    }else{
        res.send("Bad request");
    }
}