import Input from 'jw-components/lib/input';
import React,{Component} from 'react';
class InputCustom extends Component {
	getLabel(txt){
    if(txt){
      return <div className="label ant-form-item-label" dangerouslySetInnerHTML={{__html:txt}}></div>
    }else{
      return ''
    }
  }
	onChange(e,schema){
  	const value=e.target.value;
  	this.props.onChange(value,schema);
		let propsSchema = this.props.schema;
		if(propsSchema['events'] && propsSchema['events']['onChange']){
			propsSchema['events']['onChange'].call(this,arguments);
		}
  }
	render(){
		let self = this;
		let schema = this.props.schema;
		let target;
		let data = Object.assign({});
		// ,(schema["attr"]||{}),(schema["events"]||{})
		if(schema && schema['attr']){
			data = Object.assign(data,schema["attr"])
		}
		if(schema && schema['events']){
			data = Object.assign(data,schema["events"])
		}
		if(this.props.type && this.props.type == 'Textarea'){
			const { TextArea } = Input;
			target = <TextArea {...data} onChange={(e)=>this.onChange(e,schema)} defaultValue={schema['defaultValue']}/>;
		}else{
			target = <Input {...data} onChange={(e)=>this.onChange(e,schema)} defaultValue={schema['defaultValue']}/>;
		}
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