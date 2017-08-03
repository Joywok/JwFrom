import Input from 'jw-components/lib/input';
const { TextArea } = Input;
import React,{Component} from 'react';
class TextareaCustom extends Component {
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
  }
	render(){
		let self = this;
		let schema = this.props.schema;
		let target = <TextArea placeholder={schema.placeholder} type={schema.type} onChange={(e)=>this.onChange(e,schema)} defaultValue={schema['defaultValue']} {...schema['attr']}/>;
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
export default TextareaCustom;