import React, { Component } from 'react';
import { Select, Trigger, OptionList, Option, utils, getToggledOptions } from 'react';
//import utils, { getToggledOptions } from 'react';
import './FormCity.css';
import { withRouter } from 'react-router';
import { Redirect, browserHistory } from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import video from './static/img/video.mp4';
import Background from './static/img/paris.jpg';
import Background2 from './static/img/Paris2.jpg';
import axios from 'axios';
import App from './App';
import { WithContext as ReactTags } from 'react-tag-input';

var sectionStyle = {
	width: "100%",
	height: "100%",
	backgroundImage: `url(${Background})`,
	backgroundSize: `cover`
}



class CheckboxOption extends Component {
  render() {
    const { value, isChecked, children } = this.props
    return (
      <Option className="react-select-option" value={value}>
        <input
          type="checkbox"
          className="react-select-option__checkbox"
          defaultValue={null}
          checked={isChecked}
        />
        <div className="react-select-option__label">
          {children}
        </div>
      </Option>
    )
  }
}

 export class FormCity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tags: [],
            suggestions: [
                { id: 'Museum', text: 'Museum' },{  id: 'Zoo', text: 'Zoo' },{  id: 'Art Gallery', text: 'Art Gallery' },{  id: 'Hot Spring', text: 'Hot Spring' },{  id: 'Building', text: 'Building' },{  id: 'Cafe', text: 'Cafe' },{  id: 'Bowling', text: 'Bowling' },
                { id: 'Lake', text: 'Lake' },{  id: 'Lounge', text: 'Lounge' },{  id: 'Hotel', text: 'Hotel' },{  id: 'Plaza', text: 'Plaza' },{  id: 'Garden', text: 'Garden' },{  id: 'Sports', text: 'Sports' },{  id: 'Restaurant', text: 'Restaurant' },
			],
			dest: '',
			budget: '',
			nb_day: '',
			value: 'select',//kind of travel
			value2: 'select',//number of activities
			j_dep:'',
			j_arr:'',
			resultat:[],
			data:[],
			ids:[]
		};
		this.sendFormInformation = this.sendFormInformation.bind(this);
		this.changeDest = this.changeDest.bind(this);
		this.changeBudget = this.changeBudget.bind(this);
		this.onChange = this.onChange.bind(this);
		this.changeNbday = this.changeNbday.bind(this);
		this.onChange2 = this.onChange2.bind(this);
		this.changeJ_dep = this.changeJ_dep.bind(this);
		this.changeJ_arr = this.changeJ_arr.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
	}

	handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }
 
    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }
 
    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: newTags });
    }

	onChange(e) {
		console.log("CHANGE5");
		this.setState({value: e.target.value})
	}

	onChange2(e) {
		console.log("CHANGE6");
		this.setState({value2: e.target.value})
	}

	changeDest(e) {
      console.log("CHANGE1");
      this.setState({ dest: e.target.value });
    }
    changeBudget(e) {
      console.log("CHANGE2");
      this.setState({ budget: e.target.value });
		}
		changeNbday(e) {
      console.log("CHANGEX");
      this.setState({ nb_day: e.target.value });
    }
		changeJ_dep(e) {
      console.log("CHANGE3");
      this.setState({ j_dep: e.target.value });
		}
		changeJ_arr(e) {
      console.log("CHANGE4");
      this.setState({ j_arr: e.target.value });
    }

	sendFormInformation = (tags, dest, budget, time, value, value2, j_dep, j_arr,nb_day,event) => {
		var tags_list=[]
		for (var i = 0; i < this.state.tags.length; i++) {
		tags_list[i]=this.state.tags[i].id;
		}
		let formData = new FormData();
	formData.append('dest', dest);
	formData.append('budget',budget);
	formData.append('value', value);
	formData.append('value2',value2);
	formData.append('j_dep',j_dep);
	formData.append('nb_day',nb_day);
	formData.append('value2',j_arr);
	formData.append('tags', tags_list);
	console.log(formData);
	var url = 'http://10.4.95.236:5000/auth/FormCity?';
	var depart = 'dest='.concat(this.state.dest,'&');
	var result = depart.concat('budget=',this.state.budget,'&',
							'value=', this.state.value,'&',
							'nb_day=', this.state.nb_day,'&',
							'j_dep=', this.state.j_dep,'&',
							'j_arr=', this.state.j_arr,'&',
							'tags=', tags_list,'&',
							'value2=', this.state.value2,'&');
	alert(result);

	var request = new Request(url.concat(result), {method:'GET', headers : new Headers({
     'Authorization': 'Basic '+btoa('username:password'), 
     'Content-Type': 'application/x-www-form-urlencoded'
   },formData)});
	
//	fetch('http://192.168.127.1:5000/auth/form?add_dep=Metz&add_arr=Bordeaux&escales=Paris&tags=Art&max_escales=3&optimisation=affinity&mode=driving&h_dep=08:00&h_arr=21:00&j_dep=01122018&j_arr=01122018&t_max=7200&d_max=300000', {method:'GET', mode:'no-cors', headers : new Headers(formData)})
	fetch(request)
	.then((response) =>{
	console.log("test");
     console.log(response);
	var json=response.json();
		console.log(json);
		return json;
		this.state.resultat=json.steps;
		console.log("Resultat = ",this.state.resultat);})
	
//    return response.json();});
	.then(( steps ) => {this.state.resultat = steps;
		
		for (var i = 0, emp; i <this.state.resultat.steps.length; i++) { 
			emp = this.state.resultat.steps[i]; 
			this.state.data.push(emp.nom);
			this.state.ids.push(emp.id);
		}
		console.log('Nom = ',this.state.data);
		var data = this.state.data;
		var ids = this.state.ids;
		var j_dep = this.state.j_dep;
		var j_arr = this.state.j_arr;
		var nbActivities = this.state.value2;
		browserHistory.push({pathname:'/Activities',state:{ nom: data, ids:ids,j_arr:j_arr,j_dep:j_dep,nbActivities:nbActivities}}); 
	})	


	//.then(browserHistory.push('/Activities'));
		/*({
		  pathname: '/Activities',
		  search: '?the=search',
		  state: { some: 'dest' }
		})*/
  	}

  render () {

    const {dest, budget, time, value, value2, j_dep, j_arr, nb_day, tags, suggestions} = this.state;

    return (
    		<div className="cover-full">
				<section style={ sectionStyle } id="myPhoto">
				</section>
				<div className="register_container">
					<form id="checkout" role="form" >
						<div className="form-group">
							<h2> Veuillez indiquer les informations ci-dessous : </h2>
							<div className="row">
								<div className="col-sm-8">
									<input type="text"  value={this.state.dest} onChange={this.changeDest}  className="form-control" name="dest" placeholder="Destination" required />
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="row">
								<div className="col-sm-8">
									<input type="text" value={this.state.budget} onChange={this.changeBudget} className="form-control" name="budget" placeholder="Budget" required />
								</div>
							</div>
						</div>
						<div className="form-group">
						<div className="row">
							<label className="col-sm-2" htmlFor="j_dep">Départ</label>
							<div className="col-sm-8">
								<input type="date" value={this.state.j_dep} name="j_dep" required={true} onChange={this.changeJ_dep} />
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<label className="col-sm-2" htmlFor="j_dep">Retour</label>
							<div className="col-sm-8">
								<input type="date" value={this.state.j_arr} name="j_arr" required={true} onChange={this.changeJ_arr} />
							</div>
						</div>
					</div>
					<div className="form-group">
							<div className="row">
								<div className="col-sm-8">
									<input type="int" value={this.state.nb_day} onChange={this.changeNbday} className="form-control" name="nb_day" placeholder="Nombre de jours" required />
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="row">
								<div className="col-sm-8">
									<label htmlFor="select1" >Type de voyage</label>
									<select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
									  <option value="Select">Choisir</option>
									  <option value="Solo">Seul</option>
									  <option value="Couple">Couple</option>
									  <option value="Entre amis">Entre amis</option>
										<option value="Entre collègues">Entre collègues</option>
										<option value="Famille">En famille</option>
									</select>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="row">
								<div className="col-sm-8">
									<label htmlFor="select1" >Nombre d'activité par jour</label>
									<select value={this.state.value2} onChange={this.onChange2.bind(this)} className="form-control">
										<option value="0">0</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4+</option>
									</select>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="row">
								<label className="col-sm-2" htmlFor="tags">Tags</label>
								<div className="col-sm-8">
									<div>
										<ReactTags tags={tags}
											suggestions={suggestions}
											handleDelete={this.handleDelete}
											handleAddition={this.handleAddition}
											handleDrag={this.handleDrag}
											name="tags"
											id="tags" />
									</div>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="row">
								<div className="col-sm-8">
									<div className="col-sm-offset-2 col-sm-10">
										<div className="auth-button">
											<button
												type="button"
												name="auth-button-go"
												id="submit"
												onClick={(event) => this.sendFormInformation(dest, budget, time, value, value2,event)}>Soumettre
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
    )
  }
}

export default withRouter(FormCity);