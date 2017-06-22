import {Radio} from 'jw-components';
import {Input} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import React,{PropType,Component} from 'react';
class Radios extends Component {
	getLabel(txt){
    if(txt){
      return <div className="label ant-form-item-label" dangerouslySetInnerHTML={{__html:txt}}></div>
    }else{
      return ''
    }
  }
	onChange(e,schema){
  	const value=e.target.value;
		this.props.onChange(value,schema)
  }
  _init_layout(){
  	let schema = this.props.schema;
  	if(schema['layout'] == 'horizontal'){
			return 'layout-horizontal'
		}else if(schema['layout'] == 'vertical'){
			return 'layout-vertical'
		}else{
			return ('layout-column layout-column-'+schema['column'])
		}
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
			target = <div className="Form-item-c">
								<Template children={target} target={self} changeData={self.props.changeData} changeSchemas={self.props.changeSchemas}></Template>
							</div>
		}else{
			target = <div className="Form-item-c">{target}</div>
		}
		return (
				<div className={"Form-item-w "+this._init_layout()} ref="container">
					{this.getLabel(schema.label)}
					{target}
				</div>
		)
	}
}
export default Radios;