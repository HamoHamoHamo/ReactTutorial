import styles from "../pages/Home.module.css"

const KINGBUSIP = "180.231.222.59";
const MILIIP = "210.92.31.41";

// datas를 acc[유저이름] = [데이터1, 데이터2 ...] 형식으로 구분해서 저장해줌
function parsingDataList(datas){
    let curUser = '';
    let curArr = [];
    const result = Object.entries(datas).reduce(
        (acc, [, data], index, arr) => {
            const { id, user, datetime, ip } = data;
            // console.log("INDEX", index)
            if(index===0){
                curUser = user;
            }
            if(curUser !== user){
                // console.log("aaaaaaaaaaaa",user);
                acc[curUser] = curArr;
                curUser = user;
                curArr = [];
            }
            
            const attendance = {
                id, user, datetime, ip
            }
            curArr.push(attendance)
            if(arr.length === index+1){
                acc[curUser] = curArr;
            }
            
            return acc;
        },
        {}
    )
    return result
}

function createList(dataArr){
    return (
        Object.entries(dataArr).map(([name,data], index) => {
            // console.log("dsfsffsdf", data);
            const personData = Object.entries(data).map(([,data], index) => {
                const { datetime, ip } = data;
                let wrongIpStyle = '';
                let date = datetime.substr(8,2)+"일";
                let time = datetime.substr(11,);
                if(ip !== KINGBUSIP && ip !== MILIIP){
                    wrongIpStyle = styles.wrongIp;
                    // date = `${date} KINGBUSIP: ${ip}`;
                }
                // console.log("aASDFAFD", datetime, ip)
                const styleText = `${styles.attendanceContents} ${wrongIpStyle}`
                
                return <div className={styleText} key={index}>{date} {time}</div>
            })
            
            return (
                <div key={index}>
                    <div className={styles.attendanceName}>{name}</div>
                    {personData}
                </div>
            )

        })
    )
}

export { parsingDataList,createList };