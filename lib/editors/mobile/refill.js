import {Picker,List} from 'jw-components-mobile';
import React,{PropType,Component} from 'react';
import {InputItem} from 'jw-components-mobile';
import { createForm } from 'rc-form';
import Img from "../../images/refill@2x.png"

class Refill extends Component {
	constructor(props) {
    	super(props);
	    this.state = {
	    	pageClass: "refill-page hide",
	    	placeholderClass: "refill-placeholder"
	    };
	}
	onChange(value,schema){
		
		let self = this;
		setTimeout(function(){
			self.state.pageClass = "refill-page hide";
			self.setState(self.state);	
		}, 500)
		$(".refill-page").animate({left: this.state.left}, 500)
		this.props.onChange(value,schema);
		let propsSchema = this.props.schema;
		if(propsSchema['events'] && propsSchema['events']['onChange']){
			propsSchema['events']['onChange'].call(this,arguments);
		}
	}
	onSearchChange(value,schema){
		this.props.onChange(value,{name: schema.name+"_refill"});
		let propsSchema = this.props.schema;
		if(propsSchema['events'] && propsSchema['events']['onChange']){
			propsSchema['events']['onChange'].call(this,arguments);
		}
	}
	getLabel(txt){
		if(txt){
			return <div className="label form-refill" dangerouslySetInnerHTML={{__html:txt}}></div>
		}else{
			return ''
		}
	}

	openSearch(schema){
		this.state.pageClass = "refill-page";
		this.state.left = this.state.left = $("body").width();
		this.setState(this.state);
		$(".refill-page").animate({left: 0}, 500)
	}

	view(){
		let self = this;
		let schema = this.props.schema;
		let a = _.map(schema.dataList, function(dataItem){
		return(<div className="refill-group"  onClick={self.onChange.bind(self, dataItem, schema)}>
				{
					_.map(schema.viewSchema, function(viewItem){
						return(<div className="refill-item">
									<div className="refill-label">{viewItem.label}</div>
									<div className="refill-value">{dataItem[viewItem.key]}</div>
								</div>
						)
					})
				}
			</div>)
		})

		return a;
	}

	focus(){
		this.state.placeholderClass = "refill-placeholder hide";
		this.setState(this.state);
		$('.refill-input').find("input").focus();	
	}

	onBlur(value, schema){
		if(value == ""){
			this.state.placeholderClass = "refill-placeholder";
			this.setState(this.state);
		}
	}

  	render(){
	    let schema = this.props.schema;
	    let self = this;
	    let className = "Form-item-w am-refill " + schema.className;
	    return (
	        <div className={className} ref="container">
	          {this.getLabel(schema.label)}
	          <div className="refill-open-icon" onClick={this.openSearch.bind(self,schema)}><img src={Img}/></div>
	          <div className={self.state.pageClass}>
	          		<div className={this.state.placeholderClass} onClick={this.focus.bind(self)}><div className="refill-label-search"><div className="refill-icon-search"></div>{schema.placeholder}</div></div>
	          		<InputItem className="refill-input" onChange={value => this.onSearchChange(value, schema)} onBlur={value => this.onBlur(value, schema)}/>
	          		{self.view()}
	          </div>
	        </div>
    	)
  	}
}
export default Refill;