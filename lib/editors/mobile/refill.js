import {InputItem} from 'jw-components-mobile';
import React,{Component} from 'react';
class InputCustom extends Component {
	onChange(value,schema){
  	this.props.onChange(value,schema);
		let propsSchema = this.props.schema;
		if(propsSchema['events'] && propsSchema['events']['onChange']){
			propsSchema['events']['onChange'].call(this,arguments);
		}
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
		let target = <InputItem {...schema['attr']} {...schema['events']} value={schema['defaultValue']} onChange={value => this.onChange(value, schema)} />;
		if(schema["other"] && schema["other"]['template']){
			let Template = schema["other"]['template']
			target = <div className="Form-item-c hide">
								<Template children={target} target={self} changeData={self.props.changeData} changeSchemas={self.props.changeSchemas}></Template>
							</div>
		}else{
			target = <div className="Form-item-c hide">{target}</div>
		}
		return (
				<div className="Form-item-w" ref="container">
					{this.getLabel(schema.label)}
					{target}
					<div className="openC">+</div>
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