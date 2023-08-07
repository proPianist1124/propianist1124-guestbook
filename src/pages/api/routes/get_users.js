import { serialize } from "cookie";
import supabase from "../../utils/supabase"

export async function get_users(){
    const { data: users } = await supabase.from('users').select("name")

    let existing_users = [];
    for(let i = 0; i < users.length; i++){
        existing_users.push(users[i].name)
    }

    return existing_users;
}