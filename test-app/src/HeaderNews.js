import PropTypes from "prop-types";
import './currencyInput.css';

function HeaderNews(props) {
    return (




    <div>
        {(props.name != "UAH")
            ? <div className="new">{props.name} :<br/>{props.value * 1000}</div>
            : <div></div>
        }
    </div>

    );
}


export default HeaderNews;