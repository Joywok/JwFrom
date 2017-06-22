import {Radio} from 'jw-components-mobile';
import React,{PropType,Component} from 'react';
const RadioItem = Radio.RadioItem;

class Radios extends Component {
	onChange(value,schema){
  	console.log(value,"Radiovalue")
		this.props.onChange(value,schema)
  }
  changeData(data){
		this.props.onChange(value,schema)	
  }
	render(){

		let schema = this.props.schema;
		let self = this;
		let target = <div  >
			{
				_.map(schema.options,function(item){
					return <RadioItem checked={schema.defaultValue == item.value} onChange={()=>self.onChange(item.value,schema)}>{item.label}</RadioItem>
				})
			}
		</div>;
		if(schema["other"] && schema["other"]['template']){
			let Template = schema["other"]['template']
			target = <Template children={target} target={this}></Template>
		}else{
			target = <div className="Form-item-c">{target}</div>
		}
		return (
				<div className="Form-item-w">{target}</div>
		)
	}
}
export default Radios;