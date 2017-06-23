import {Radio} from 'jw-components-mobile';
import React,{PropType,Component} from 'react';
const RadioItem = Radio.RadioItem;

class Radios extends Component {
	getLabel(txt){
    if(txt){
      return <div className="label ant-form-item-label" dangerouslySetInnerHTML={{__html:txt}}></div>
    }else{
      return ''
    }
  }
	onChange(value,schema){
  	console.log(value,"Radiovalue")
		this.props.onChange(value,schema)
  }
  changeData(data){
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
		let target = <div  >
			{
				_.map(schema.options,function(item){
					return <RadioItem checked={schema.defaultValue == item.value} onChange={()=>self.onChange(item.value,schema)}>{item.label}</RadioItem>
				})
			}
		</div>;
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