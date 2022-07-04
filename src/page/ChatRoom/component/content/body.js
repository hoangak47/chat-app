import React from 'react';
import Message from '../message';

import './body.scss';

function Body() {
    return (
        <div className="chat-room-content-body">
            <Message
                img="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.6435-1/89548020_233796384461630_8402775220208795648_n.jpg?stp=dst-jpg_p100x100&_nc_cat=106&ccb=1-7&_nc_sid=7206a8&_nc_ohc=l2v_mluI9b4AX8KDJ7n&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fvca1-1.fna&oh=00_AT_Rle5GbbAb9HM0jXFOS-DISaqsXa8ID9ej2sGAtqZqNA&oe=62E57E21"
                name="User 1"
                mess="
                Giờ hạn chế nhai răng đó với ăn đồ mềm đi
                Giờ hạn chế nhai răng đó với ăn đồ mềm đi
                Giờ hạn chế nhai răng đó với ăn đồ mềm đi"
                time="12:00"
                id="KUOvwFrztKSlm2JYRqGieamNCUg2"
            />
            <Message
                img="https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-1/242570980_2846915335599989_396738908607692823_n.jpg?stp=dst-jpg_p100x100&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=ZiUREwCb_QAAX_nlJw9&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fvca1-1.fna&oh=00_AT9JrvTrTJOk5jzaKjzCtsXjW45PyMwNcythTZx5gJXKug&oe=62C4F5FB"
                name="User 2"
                mess="Hello"
                time="12:00"
            />
        </div>
    );
}

export default Body;
