import "./homepage.css";
export default function Homepage(){


    function element(title,company,imgPath,location){
        return(
     
            <div className="job-box">
                <div className="job-first">
                    <div className="job-logo">
                        <img src={imgPath} alt="logo"/>
                    </div>

                    <div className="job-info">
                        <div className="title">
                            <span>{title}</span>
                        </div>
                        <div className="company">
                            <span>{company}</span>
                        </div>
                    </div>
                </div>

                <div className="location">
                    <h5>{location}</h5>
                </div>
            </div>
            

        );

    }


    return(
        <div className="homepage">
            <div className="job-container ">
                {element("Blockchain intern","Binance","./binance.png","Remote")}
                <br/>
                {element("Solidity intern","Consensys","./binance.png","Remote")}

            </div>

        </div>

    )
}