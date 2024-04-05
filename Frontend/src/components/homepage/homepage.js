import React from "react"
import "./homepage.css"

const Homepage  = ({user,setLoginUser}) =>{
    // console.log(res.data.existingUser.name)
    const name  = user?.name;
    return (
        
        <div className="homepage">
            <h1>Welcome to {name} App </h1>
            
            <div className="button" onClick={()=> setLoginUser("")}> Logout</div>
        </div>
    )
}
export default Homepage;
