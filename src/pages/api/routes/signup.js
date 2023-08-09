import supabase from "../supabase"

export default async function handler(req, res){
    if(req.method == "POST"){
        const username_list = []
        const { data: usernames } = await supabase.from("users").select("name")

        for(let i = 0; i < usernames.length; i++){
            username_list.push(usernames[i].name)
        }
        if(username_list.includes(req.body.username)){
            res.send("Username already exists")
        }else{
            const username = req.body.username;
            const password = req.body.password;
    
            await supabase.from("users").insert({ name: username, password: password });
            res.redirect(307, "/");
        }
    }else{
        res.send("Bad request");
    }
}