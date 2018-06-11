import {Upload} from 'jw-components-mobile';
import React,{Component} from 'react';
class UploadItem extends Component {
	onChange(value,schema){
  	this.props.onChange(value,schema);
		let propsSchema = this.props.schema;
		if(propsSchema['events'] && propsSchema['events']['onChange']){
			propsSchema['events']['onChange'].call(this,arguments);
		}
  }
  getLabel(schema){
      return <div className="label ant-form-item-label upload-label">
      			<div className="upload-label-txt">{schema.label}</div>
      			<div className="upload-label-desc">{schema.placeholder}</div>
      		</div>
  }
	render(){
		let schema = this.props.schema;
		let target = <Upload {...schema['attr']} {...schema['placeholder']} {...schema['events']} value={schema['defaultValue']} onChange={value => this.onChange(value, schema)} />;
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
					{this.getLabel(schema)}
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
export default UploadItem;