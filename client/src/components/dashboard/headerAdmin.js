import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./dashboard.css";
import ListeArtAdmin from '../liste/listeAtelierAdmin';


export class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      titre: '',
      utilisateur:'',
      prix: '',
      debut: '',
      duree: '',
      place: '',
      description: '',
      image: '',
        visible : false
    }
    this.onChange = this.onChange.bind(this)
    this.handleUploadImage = this.handleUploadImage.bind(this);
}

onChange(event) {
  this.setState({
    [event.target.name]: event.target.value
  })
}
handleUploadImage(ev) {
  ev.preventDefault();

  const data = new FormData();
  data.append('image', this.uploadInput.files[0]);
  data.append('titre', this.state.titre);
  data.append('prix', this.state.prix);
  data.append('debut', this.state.debut);
  data.append('duree', this.state.duree);
  data.append('place', this.state.place);
  data.append('description', this.state.description)

  fetch('http://localhost:8080/api/ateliers', {
    method: 'POST',
    body: data,
  }).then((response) => {
    response.json().then((body) => {
      this.setState({ image: `http://localhost:8080/api/ateliers/${body.image}` });
      console.log('ity ilay body.image', body.image);

    });
  });
}
openModal() {
    this.setState({
        visible : true
    });
}
closeModal() {
    this.setState({
        visible : false
    });
}
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    console.log('localStorage.local sur dashbord'+localStorage.local);
    
    const { user } = this.props.auth;

    return (
        <div class="admin-panel clearfix">
          <div class="slidebar">
            <div class="logo">
              <img src="logo.png" alt="logo"/>
            </div>
            <ul>
              <li><a href="#dashboard" id="targeted">Ajouter des atelier</a></li>
              <li><a href="#posts">Lister des atelier</a></li>
              <li><a href="#media">Modifier des atelier</a></li>
              <li><a href="#pages">pages</a></li>
              <li><a href="#settings">settings</a></li>
            </ul>
          </div>
          <div class="main">
            <ul class="topbar clearfix">
              <li><a href="#ggws">q</a></li>
              <li><a href="#ggws" onClick={this.onLogoutClick} >Deconnecter</a></li>
              <li><a href="#ggws">{user.nom.split(" ")[0]}</a></li>
            </ul>
            <div class="mainContent clearfix">
              <div id="dashboard">
                <h2 class="header"><span class="icon"></span>Dashboard</h2>
                  <div style={{ height: "75vh" }} className="container valign-wrapper">
                    <div className="container-fluid">
                      <form onSubmit={this.handleUploadImage} className="md-form">
                        <div className="form-group mx-sm-3 mb-2 container">
                          <div className="row">
                            <div className="col-xs-6">
                              <input className="form-control" type="text"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="titre" placeholder="Titre" />

                            </div>
                            <div className="col-xs-6">
                              <input className="form-control" type="text"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="prix" placeholder="Prix" />
                                  
                            </div>
                              </div>
                              <br />
                              <br />
                            <div className="row">
                              <div className="col-xs-6">
                                <input className="form-control" type="text"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="debut" placeholder="Debut" />
                              </div>
                              <div className="col-xs-6">
                                  <input className="form-control" type="text"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="description" placeholder="Description" />

                              </div>
                            </div>
                             
                              <br />
                            <div className="row">
                              <div className="col-xs-6">
                                <input className="form-control" type="text"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="place" placeholder="Nombre des places" />
                              </div>
                              <div className="col-xs-6">
                                <input className="form-control" type="text"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="duree" placeholder="Durée" />
                              </div>
                            </div>
                            <br />
                              
                            <div className="row">
                              <input ref={(ref) => { this.uploadInput = ref; }} type="file" name="image" />
                                  <button id="validate" className="btn btn-info">Publier</button> 
                            </div>
                          </div>

                        </form>
                      </div>
                    </div>
               </div>
               <div id="posts">
                 <ListeArtAdmin />
               </div>
               <div id="media">
                 
               </div>
               <div id="settings">
                 <h2 class="header">settings</h2>
               </div>
             </div>
             <ul class="statusbar">
               <li><a href="#ggws">d</a></li>
               <li><a href="#ggws">red</a></li>
               <li class="profiles-setting"><a href="#ggws">s</a></li>
               <li class="logout"><a href="#ggws">k</a></li>
             </ul>
           </div>
        </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);