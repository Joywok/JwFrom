import {InputItem} from 'jw-components-mobile';
import React,{Component} from 'react';
class InputCustom extends Component {
	onChange(value,schema){
  	this.props.onChange(value,schema);
  }
	render(){
		let schema = this.props.schema;
		let target = <InputItem autocomplete="off" className="jw-web-input" placeholder={schema.placeholder} type={schema.type} onChange={value => this.onChange(value, schema)} defaultValue={schema['defaultValue']} />;

		 
		if(schema["other"] && schema["other"]['template']){
			let Template = schema["other"]['template']
			target = <Template children={target} target={this}></Template>
		}else{
			target = <div className="Form-item-c">{target}</div>
		}
		return (
			<div className="Form-item-w">
				{target}
			</div>
		)
	}
	componentDidMount(){
		//初始化
	}
	componentDidUpdate(){
		//变化
		// console.log(this.refs.template,'123');
	}
}
export default InputCustom;