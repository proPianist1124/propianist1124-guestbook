import { serialize } from "cookie";
import supabase from "./supabase"

export async function get_users(){
    const { data: users } = await supabase.from("users").select("name")

    let existing_users = [];
    for(let i = 0; i < users.length; i++){
        existing_users.push(users[i].name)
    }

    return existing_users;
}

export async function get_pws(){
    const { data: passwords } = await supabase.from("users").select("password")

    let existing_passwords = [];
    for(let i = 0; i < passwords.length; i++){
        existing_passwords.push(passwords[i].password)
    }
    return existing_passwords;
}

export async function get_msgs(){
    const { data: message_list } = await supabase.from("messages").select("content");
    const { data: date_list } = await supabase.from("messages").select("date");
    const { data: author_list } = await supabase.from("messages").select("author");

    let msgs = [];
    let dates = [];
    let authors = [];
    for(let i = 0; i < message_list.length; i++){
        msgs.push(`${i}^${message_list[i].content}`);
        dates.push(date_list[i].date);
        authors.push(author_list[i].author);
    }
    return [msgs, dates, authors]
}