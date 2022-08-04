import React from "react";

import PostList from "./PostList";

function HomePage({cookie: cookie}) {


 
    return (
        <div className="flex flex-col"  >


            <div className="main-content">
                <PostList />
            </div>




        </div>
    )
}

export default HomePage