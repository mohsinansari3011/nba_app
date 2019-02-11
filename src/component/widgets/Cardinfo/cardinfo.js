import React from 'react';
import FontAwesome from 'react-fontawesome';
import style from './cardinfo.css'
import moment from 'moment';


const CardInfo = (props) =>{


    const teamName = (teams, team) => {
    let data = teams.find((item) => {
        return item.teamId === team
        })

        if (data) {
            return data.name
        }

    }

    const formatDate = (date)=>{
        return moment(date).format(' DD-MM-YYYY');
    }

    return(<div className={style.cardNfo}>
                <span className={style.teamName}> 
                   {teamName(props.teams,props.team)}
                </span>
                <span className={style.date}>
                    <FontAwesome name="clock-o"/>
                    {formatDate(props.date)}
                </span>
    </div>)
}

export default CardInfo;
