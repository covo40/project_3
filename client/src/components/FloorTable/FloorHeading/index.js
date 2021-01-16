import React from "react";


function FloorHeading({ handleClick }) {
    return (
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col"
                    // onClick={handleClick}
                    data-value="first">
                    Item
                </th>
            </tr>
        </thead>
    )
}

export default FloorHeading;