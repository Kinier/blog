import React from "react";

import PostList from "./PostList";
import Header from "./Header";
import SideMenu from "./SideMenu";

function Home({cookie: cookie}) {


 
    return (
        <div className="flex flex-col"  >


            <div className="main-content">
                <PostList />
            </div>




        </div>
    )
}

export default Home