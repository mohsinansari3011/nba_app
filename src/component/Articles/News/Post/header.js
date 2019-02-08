import React from 'react';
import TeamNfo from '../../Elements/teamNfo'
import PostData from '../../Elements/PostData'

const Header = (props) =>{



const teamNfo = (team) =>{ return team ? <TeamNfo team={team}/> : null; }
const postData = (date, author) => { return date ? <PostData data={{date,author}} /> : null; }



return(
    
    <div>
        {teamNfo(props.teamData)}
        {postData(props.date,props.author)}
    </div>
)

}


export default Header;
