import React from 'react';

const Rank = ({user, entries}) =>{
    return(<div className="white tc">
        <div className="f4">
            {`${user}, your current count is ..`}
        </div>
        <div className="f2">
            {entries}
        </div>
    </div>);
}


export default Rank;