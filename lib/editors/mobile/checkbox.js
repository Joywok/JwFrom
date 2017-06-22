import Checkbox from 'jw-components-mobile/lib/checkbox';
import React,{PropType,Component} from 'react';
import { Form } from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
class Checkboxs extends Component {
	onChange(value,schema){
  	this.props.onChange(value,schema);
  }
	render(){
		let schema = this.props.schema;
		let self = this;
		let target = <CheckboxGroup options={schema.options} onChange={v=>self.onChange(v,schema)} value={schema["defaultValue"]} />
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

export default Checkboxs;