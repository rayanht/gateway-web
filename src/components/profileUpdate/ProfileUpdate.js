import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink as Link, Route, Routes } from "react-router-dom";
import {
	Container,
	Button,
	Row,
	Col,
	ListGroup,
	ProgressBar
} from 'react-bootstrap';
import './Profile.css';

class ProfileUpdate extends React.Component
{

	constructor(props) {
        super(props);
        this.state = {
          loading: false,
          userData: {
          	about: '',
          	skill: [],
          	langs: [],
          	knowledge: [],
          	experience: {},
          	attitude: [],
          	profile: {
          		displayName: 'MasterStark',
			      	userName: 'MasterStark',
			      	avatar: 'profile/masterstark.svg',
			      	userBio: '',
			      	socials: []
          	}
          },
          currentTime: new Date(),
        }

    }

	componentDidMount() {

		var existing = localStorage.getItem('gtwUserState');
		// If no existing data, create an array
		// Otherwise, convert the localStorage string to an array
		existing = existing ? JSON.parse(existing) : {};
		// Set data to state
		if(!!existing.about) {
			this.setState(prevState => ({
			    userData: {...prevState.userData,  about: existing.about }
			}));
		}
		if(!!existing.skill) {
			this.setState(prevState => ({
			    userData: {...prevState.userData,  skill: existing.skill }
			}));
		}
		if(!!existing.langs) {
			this.setState(prevState => ({
			    userData: {...prevState.userData,  langs: existing.langs }
			}));
		}
		if(!!existing.knowledge) {
			this.setState(prevState => ({
			    userData: {...prevState.userData,  knowledge: existing.knowledge }
			}));
		}
		if(!!existing.experience) {
			this.setState(prevState => ({
			    userData: {...prevState.userData,  experience: existing.experience }
			}));
		}
		if(!!existing.attitude) {
			this.setState(prevState => ({
			    userData: {...prevState.userData,  attitude: existing.attitude }
			}));
		}
		if(!!existing.profile) {
			this.setState(prevState => ({
			    userData: {...prevState.userData,  profile: existing.profile }
			}));
		}

		this.timerID = setInterval( () => this.tick(),
      1000
    );
	}

	componentWillUnmount() {
    	clearInterval(this.timerID);
  	}

	tick() {
    this.setState({
      currentTime: new Date()
    });
	}

	getSocialIcon(platform) {
		var icon = 'profile/share.svg';
		if(platform == 'Twitter')
		{
			icon = 'profile/twitter.svg';
		} else if(platform == 'Discord') {
			icon = 'profile/discord.svg';
		} else if(platform == 'Telegram') {
			icon = 'profile/telegram.svg';
		} else if(platform == 'Github') {
			icon = 'profile/git.svg';
		} else if(platform == 'Email') {
			icon = 'profile/email.svg';
		}

		return icon;
	}

	render()
  	{

  		const { userData } = this.state;
  		console.log("userData", userData);
    	return (
    		<section className="gateway-profile">
    			<Container>
    				<Row>
    					<Col md={2}>
    						<div className="gateway-profile-left">
    							<img src={userData.profile.avatar} />
    						</div>
    					</Col>
    					<Col md={7}>
    						
	    					<div className="gateway-profile-middle">
			    					<Row>	
			    						
			    						<Col md={8}>
			    							<div className="gateway-profile-middle-inner-content">
			    								<h1>{userData.profile.displayName}</h1>
			    								<h5>@{userData.profile.userName}</h5>
													
			    							</div>
			    							<div className="gateway-profile-middle-inner-content">
			    								<div className="user-bio">
			    									{userData.profile.userBio}
			    								</div>
			    								<div className="social">
			    									{
															userData.profile.socials.length > 0 && userData.profile.socials.map(item => 
																<a href={item.platform_value}>
																	<img src={this.getSocialIcon(item.platform_name)} alt="" />
																</a>
															)
														}
			    								</div>
			    								<Link to="/complete-profile" className="complete-profile-btn">
			    									Complete Profile
			    								</Link>
			    							</div>
			    						</Col>
			    						<Col md={4}>
			    							<div className="gateway-profile-middle-inner-top">
			    								<p>harisson.eth</p>
			    								<div className="gateway-profile-middle-btn-grp">
			    									<a href="#"><img src="profile/copy.svg" /></a>
			    									<a href="#"><img src="profile/edit-ellipse.svg" /></a>
			    								</div>
			    							</div>
			    						</Col>	s
			    					</Row>		
	    						</div>
	    					
	    						
	    						<div className="gway-prfile-col">
	    							<div className="gway-about-hd">
	    								<h2>About</h2>
	    								{ userData.about ?
			    								<Link to="/add-about">
			    									<img src="profile/edit-ellipse.svg" alt="image" />
			    								</Link>
		    								: null
		    							}
	    							</div>
	    							{ userData.about ? <div dangerouslySetInnerHTML={{ __html: userData.about }} /> :
	    							<p>
	    							You can write about your years of experience, industry, or skills. 
	    							People also talk about their achievements or previous job experiences.
	    							</p>
	    							}
	    							{ !userData.about ? <Link to="/add-about" className="add-now-btn">ADD NOW</Link> : null }
	    						</div>
	    						<div className="gway-prfile-col">
	    							<div className="gway-about-hd">
	    								<h2>Experience</h2>
										<Link to="/add-experience">
	    									<img src="profile/plus-btn.svg" alt="image" />
	    								</Link>
	    							</div>
	    							<p>Add your Experience and Contributions. </p>
	    							<div className="gway-contact-card">
							            <p>If you have received a 
							              credential from Gateway
							              and it isn’t displayed. Contact
							              us here.
							             </p>
										 <Link to="/contact">
	    									Contact NOW
	    								</Link>
							        </div>
	    						</div>
	    						<div className="gway-prfile-col">
	    							<div className="gway-about-hd">
	    								<h2>Activity</h2>
	    								<a href="#"><img src="profile/plus-btn.svg" alt="image" /></a>
	    							</div>
	    							<p>Share articles you created or whatever align to you beliefs with you network.</p>
	    							<a href="#" className="add-now-btn">ADD NOW</a>
	    						</div>
	    					</Col>

    					<Col md={3}>
    						<div className="gateway-profile-right">
    							<div className="gateway-profile-right-top">
    								<p>Time Zone</p>
    								<a href="#">
    									<img src="profile/location-ellipse.svg" />
    								</a>
    							</div>
    							<div className="gateway-profile-right-content">
    								<img src="profile/vector.svg" />
    								<h3>{ this.state.currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) }</h3>
    								<p>LOS ANGELES, CA, USA</p>
    								<span>PDT (UTC-7)</span>
    							</div>
    						</div>
    						<div className="gway-skill-col skill-second-sec">
    							<div className="gway-skill-col-hd">
    								<h3>Skills</h3>
									 <Link to="/add-skills">
    									<img src="profile/plus-btn.svg" alt="image" />
    								</Link>
    							</div>
    							<ListGroup as="ul">
	    							{
	    								!!userData.skill && userData.skill.length > 0 ?
												userData.skill.length > 0 && userData.skill.map(item => 
													<ListGroup.Item as="li" key={item.label}><a className="gway-btn">{item.label}</a></ListGroup.Item>
												)
											:
												<ListGroup.Item as="li"><a className="gway-btn">No skills found</a></ListGroup.Item>
										}
								  	
									</ListGroup>
    						</div>
							<div className="gway-skill-col skill-second-sec gway-skill-col-inner">
    							<div className="gway-skill-col-hd">
    								<h3>Knowledge</h3> 
									 <Link to="/add-knowledge">
    									<img src="profile/plus-btn.svg" alt="image" />
    								</Link>
    							</div>
    							<ListGroup as="ul">
	    							{
	    								!!userData.knowledge && userData.knowledge.length > 0 ?
												userData.knowledge.length > 0 && userData.knowledge.map(item => 
													<ListGroup.Item as="li" key={item.label}><a className="gway-btn">{item.label}</a></ListGroup.Item>
												)
											:
												<ListGroup.Item as="li"><a className="gway-btn">No knowledge found</a></ListGroup.Item>
										}
								  	
									</ListGroup>
    						</div>
							<div className="gway-skill-col skill-second-sec gway-skill-col-inner gway-attitudes-col-inner">
    							<div className="gway-skill-col-hd">
								<h3>Attitudes</h3>
								 <Link to="/add-attitude">
    									<img src="profile/plus-btn.svg" alt="image" />
    								</Link>
    							</div>
    							<ListGroup as="ul">
	    							{
	    								!!userData.attitude && userData.attitude.length > 0 ?
												userData.attitude.length > 0 && userData.attitude.map(item => 
													<ListGroup.Item as="li" key={item.label}><a className="gway-btn">{item.label}</a></ListGroup.Item>
												)
											:
												<ListGroup.Item as="li"><a className="gway-btn">No attitudes found</a></ListGroup.Item>
										}
								  	
									</ListGroup>
    						</div>
    						<div className="gway-skill-col gway-languages-col-inner">
    							<div className="gway-skill-col-hd">
    								<h3>Languages</h3>
									 <Link to="/add-language">
    									<img src="profile/plus-btn.svg" alt="image" />
    								</Link>
    								
    							</div>
    							<ListGroup as="ul">
								  	{
	    								!!userData.langs && userData.langs.length > 0 ?
												userData.langs.length > 0 && userData.langs.map(item => 
													<ListGroup.Item as="li" key={item.label}><a className="gway-btn">{item.label}</a></ListGroup.Item>
												)
											:
												<ListGroup.Item as="li"><a className="gway-btn">No language found</a></ListGroup.Item>
										}
									</ListGroup>
    						</div>
    						<div className="gway-skill-col">
    							<div className="gway-skill-col-hd">
    								<h3>DAOs you might like</h3>
    							</div>
    							<ListGroup as="ul" className="daos-like-ul">
								  <ListGroup.Item as="li"><a href="#" className="daos-like"><img src="profile/seed.png" alt="image" /><span>Seed Club</span></a></ListGroup.Item>
								  <ListGroup.Item as="li"><a href="#" className="daos-like"><img src="profile/Buildspace.png" alt="image" /><span>Buildspace</span></a></ListGroup.Item>
								  <ListGroup.Item as="li"><a href="#" className="daos-like"><img src="profile/Friends.png" alt="image" /><span>Friends with Benefits</span></a></ListGroup.Item>
								  <ListGroup.Item as="li"><a href="#" className="daos-like"><img src="profile/unishap.png" alt="image" /><span>Uniswap</span></a></ListGroup.Item>
								  <ListGroup.Item as="li"><a href="#" className="daos-like"><img src="profile/pleasr.png" alt="image" /><span>PleasrDAO</span></a></ListGroup.Item>
								</ListGroup>
    						</div>
    					</Col>
    				</Row>
    			</Container>
    		</section>
    	)
    }
}

export default ProfileUpdate;