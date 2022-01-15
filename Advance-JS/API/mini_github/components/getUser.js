async function getUser(user){
    try{
        let response =await fetch (`https://api.github.com/users/${user}`);
let data =await response.json()
return data;
    }

catch(err){
    console.log("err:",err)
}
}
export default getUser