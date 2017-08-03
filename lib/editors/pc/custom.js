import React,{PropType,Component} from 'react';
class Customs extends Component {
	render(){
		let schema = this.props.schema;
		let target = schema['components'];
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

export default Customs;