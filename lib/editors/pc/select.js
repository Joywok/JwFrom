import Select from 'jw-components/lib/select';
import React,{PropType,Component} from 'react';
class SelectCustom extends Component {
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
		let data = Object.assign({},{
			// value:schema['defaultValue'],
			
		},schema["attr"],schema["events"],{
			placeholder:schema['placeholder']
		});


		if(schema['defaultValue'] && schema['defaultValue'].length!=0){
			data['value'] = schema['defaultValue']
		}

		console.log(data,'zzzzzz');

		// console.log(data,'这个是什么啊');
		let target =<Select {...data} onChange={(e)=>this.onChange(e,schema)}>
									{schema['options'].map(function(item) {
										return <Option value={item.value}>{item.label}</Option>
									}, this)}
								</Select>
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

export default SelectCustom;