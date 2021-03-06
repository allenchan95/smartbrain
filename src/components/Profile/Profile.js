import React from 'react';
import "./Profile.css";

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name : this.props.user.name,
			age : this.props.user.age,
			pet : this.props.user.pet
		}
	}

	onFormchange = (event) =>{
		switch(event.target.name){
			case 'user-name':
				this.setState({name: event.target.value})
				break;
			case 'user-age' :
				this.setState({age: event.target.value})
				break;
			case 'user-pet' :
				this.setState({pet: event.target.value})
				break;
			default:
			 return;
		}
	}

	onProfileUpdate = (data) => {
		fetch(`http://localhost:3000/profile/${this.props.user.id}` , { 
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': window.sessionStorage.getItem('token')
			},
			body: JSON.stringify({formInput: data})
		}).then(resp => {
			if(resp.status ===200 || resp.status ===304){
				this.props.toggleModal();
				this.props.loadUser({...this.props.user, ...data});
			}

		}).catch(console.log)
	}

	render(){
			const { user } = this.props;
			const {name,age,pet} = this.state;
			return (
				<div className="profile-modal">
				<article className="br3 ba b--black-10 mv6 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white-90">
			        <main className="pa4 black-70 w-80">
			         <img src="http://www.esek.org.gr/images/ESET/eset_user.png"
			      			className=" h3 w3  dib  " alt="avatar" />
			      	 <h1>{this.state.name}</h1>
			      	 <h4>{`Image submittied : ${user.entries}`}</h4>
			      	 <p>{`Member since : ${new Date(user.joined).toLocaleDateString()}`}</p>
			      	 <hr />
			         <label className="mt2 fw6" htmlFor="user-name">Name:</label>
			         <input
			             className="bw1 pa2 input-reset ba bg-transparent hover-bg-black-60 hover-white-80 w-100"
			             placeholder='Name'
			             type="text"
			             name="user-name"
			             id="name"
			             onChange={this.onFormchange}
			          />
			         <label className="mt2 fw6" htmlFor="user-age">Age:</label>
			         <input
			             className="bw1 pa2 input-reset ba bg-transparent hover-bg-black-60 hover-white-80 w-100"
			             placeholder='Age'
			             type="text"
			             name="user-age"
			             id="age"
			             onChange={this.onFormchange}
			          />
			         <label className="mt2 fw6" htmlFor="user-pet">Pet:</label>			          
			         <input
			             className="bw1 pa2 input-reset ba bg-transparent hover-bg-black-60 hover-white-80 w-100"
			             placeholder='Pet'
			             type="text"
			             name="user-pet"
			             id="pet"
			             onChange={this.onFormchange}
			          />
			          <div className='mt4' style={{display:'flex',justifyContent: 'space-evenly'}} >
			          	<button
			          		onClick={() => this.onProfileUpdate({ name, age, pet })}
			          		className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-10' >
			          		Save
			          	</button>
			          	<button className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-10' onClick={this.props.toggleModal}>
			          		Cancel
			          	</button>
			          </div>
			        </main>
			        <div className='modal-close' onClick={this.props.toggleModal} >&times;</div>
			      </article>
				
			</div>
		);
	}

}

export default Profile;