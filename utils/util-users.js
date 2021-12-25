const users=[]


//join user to chat
function userJoin(id,username,room){
   
    const user={id,username,room};
    //  console.log("user joined ",user);
    users.push(user);
    return user;
}


//get current user
function getCurrentUser(id){
    console.log(" get cur users ",users);
    return users.find(user=>user.id===id);
}


//  user leaves chat
function userLeave(id){
    console.log(" users left id  ",id);
    const index=users.findIndex(user=>user.id===id);
    console.log(" index ",index);
    if(index!==-1){

        // console.log(" lskdf; lkjd ",users.splice(index,1)[0]);
        return users.splice(index,1)[0];
    }
}

//Get room users
function getRoomUsers(room){
    return users.filter(user=>user.room===room);
}


module.exports={
    userJoin,getCurrentUser,userLeave,getRoomUsers
};