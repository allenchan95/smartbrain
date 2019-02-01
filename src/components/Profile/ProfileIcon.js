import React from "react";
import "./ProfileIcon.css";
class ProfileIcon extends React.Component {
	contractor(props){
		this.super(props)
	}

	render(){
		return (
			<div className="pa4 tc">
			  
			      <div className="dropdown">
					  <span>
						  <img src="http://www.esek.org.gr/images/ESET/eset_user.png"
			      			className="br-100 ba h3 w3 bw1 dib grow " alt="avatar" />
			      	  </span>
					<div className="dropdown-content">
					  <nav onClick={this.props.toggleModal} className=' f4 pd1 tag pointer' >Profile</nav>
					  <nav onClick ={ this.props.onRouteChange} className=' f4 pointer tag'>Sign Out</nav>
					  </div>

					</div>
			</div>

			)
	}

}
export default ProfileIcon;