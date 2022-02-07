import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";





function Home() {
    return (
        <div class="body">
            <div>
                <input name="id" class="id" placeholder="id"/>
                <input name="password" class="password" placeholder="pw"/>
                <button>login</button>
            </div>
            <div>
                <Link to="/signup">signup</Link>
            </div>
        </div>
    )
}

export default Home;