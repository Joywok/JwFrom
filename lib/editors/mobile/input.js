import Input from 'jw-components-mobile/lib/input';
import React,{Component} from 'react';
class InputCustom extends Component {
	onChange(e,schema){
  	const value=e.target.value;
  	this.props.onChange(value,schema);
  }
	render(){
		let schema = this.props.schema;
		let target = <Input autocomplete="off" className="jw-web-input" placeholder={schema.placeholder} type={schema.type} onChange={(e)=>this.onChange(e,schema)} defaultValue={schema['defaultValue']} />;
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