import React from "react";
import  {useContext, createContext, useState, useEffect} from 'react';
import { collection, query, where, getDocs, getDoc, doc, setDoc, serverTimestamp,updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { onValue } from "firebase/database";

interface UserData {
  displayName: string;
  email: string;
  uid: string;
}

const ChatSearch = () => {
  const [username, setUsername] = React.useState("");
  const [Nuser, setUser] = React.useState<UserData | null>(null);
  const [err, setErr] = React.useState(false);
  const {user} = UserAuth();



  const handleSearch = async () => {
    console.log("searching for Nuser with username: ", username.trim());
    console.log("current uuser: ", user);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username.trim())
    );
    
    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);

      if (querySnapshot.empty) {
        setErr(true); // Set an error if no Nuser is found
        setUser(null);
      } else {
        querySnapshot.forEach((doc) => {
          setUser(doc.data() as UserData);
          console.log(doc.id, " DOCC => ", doc.data());
          setErr(false);
        });
      }
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  const handleKey = (e: { key: string }) => {
    console.log(e.key);
    if (e.key === "Enter") {
      console.log(" inside enter");
      handleSearch();
    }
  };

// add this function to create link between two users
const handleSelect = async () => {
    if(Nuser){
        const combineId = user.uid > Nuser.uid 
        ? user.uid + Nuser.uid 
        : Nuser.uid + user.uid; 

        console.log("combineId => ",combineId);

        try{

            const res = await getDoc(doc(db,"chats",combineId));

            if(!res.exists()){
                await setDoc(doc(db,"chats",combineId),{messages:[]});

                await updateDoc(doc(db,"userChats",user.uid),{
                    [combineId+".userInfo"] :  {
                        uid:Nuser.uid,
                        displayName:Nuser.displayName,
                    },
                    [combineId+".date"] : serverTimestamp()
                });

                await updateDoc(doc(db,"userChats",Nuser.uid),{
                    [combineId+".userInfo"] :  {
                        uid:user.uid,
                        displayName:user.displayName,
                    },
                    [combineId+".date"] : serverTimestamp()
                });
                console.log("user connection created");
            }
    
        }catch(err){
            console.log(err);
        }
    }
    setUser(null);
    setUsername("");
};

return (
    <div className="text-center">
      {err && <p className="text-red-500 text-lg font-bold">User not found</p>}

      {Nuser && (
        <div className="flex items-center justify-center mt-4 hover:bg-gray-700 cursor-pointer rounded-md p-2 transition-colors duration-200 text-white" onClick={handleSelect}>
          <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
            <span>{Nuser.displayName[0].toUpperCase()}</span>
            {Nuser.displayName.includes(" ") && (
              <span>{Nuser.displayName.split(" ")[1][0].toUpperCase()}</span>
            )}
          </div>
          <div className="ml-2 text-lg font-semibold">{Nuser.displayName}</div>
        </div>
      )}
    </div>
);
};

export default ChatSearch;
