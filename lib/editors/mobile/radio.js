import {Radio} from 'jw-components-mobile';
import {Input} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import React,{PropType,Component} from 'react';
class Radios extends Component {
	onChange(e,schema){
  	const value=e.target.value;
		this.props.onChange(value,schema)
  }
  changeData(data){
		this.props.onChange(value,schema)	
  }
	render(){
		let schema = this.props.schema;
		let self = this;
		let target = <RadioGroup  value={schema['defaultValue'].toString()} onChange={(e)=>self.onChange(e,schema)}>
			{
				_.map(schema.options,function(item){
					return <Radio value={item.value}>{item.label}</Radio>
				})
			}
		</RadioGroup>;
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