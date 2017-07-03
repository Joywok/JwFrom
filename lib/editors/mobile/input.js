import {InputItem} from 'jw-components-mobile';
import React,{Component} from 'react';
class InputCustom extends Component {
	onChange(value,schema){
  	this.props.onChange(value,schema);
  }
  getLabel(txt){
    if(txt){
      return <div className="label ant-form-item-label" dangerouslySetInnerHTML={{__html:txt}}></div>
    }else{
      return ''
    }
  }
	render(){
		let schema = this.props.schema;
		let target = <InputItem autoComplete={false} className="jw-input" placeholder={schema.placeholder} type={schema.type} onChange={value => this.onChange(value, schema)} defaultValue={schema['defaultValue']} />;
		if(schema["other"] && schema["other"]['template']){
			let Template = schema["other"]['template']
			target = <div className="Form-item-c">
								<Template children={target} target={self} changeData={self.props.changeData} changeSchemas={self.props.changeSchemas}></Template>
							</div>
		}else{
			target = <div className="Form-item-c">{target}</div>
		}
		return (
				<div className="Form-item-w" ref="container">
					{this.getLabel(schema.label)}
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