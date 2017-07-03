import {Checkbox} from 'jw-components-mobile';
import React,{PropType,Component} from 'react';
const CheckboxItem = Checkbox.CheckboxItem;
class Checkboxs extends Component {
	onChange(e,v,schema){
		var defaultValue = this.props.schema.defaultValue;
   	var hasValue= _.filter(defaultValue, function(item){
   		return item==v.value;
   	});//判断当前默认里面有没有
	  if(hasValue.length>0){
     	defaultValue= _.filter(defaultValue, function(item){
   			return item!=v.value; 
   		});
	  }else{
	  	defaultValue.push(v['value']);
	  }
    this.props.onChange(defaultValue,schema);
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
		let target = <div>
			{
				_.map(schema.options,function(item,index){
					let is_has=false;
					 _.map(schema.defaultValue,function(i){
              if(i==item.value){
              	is_has=true;
              }
					 })
					return <CheckboxItem key={item.value} checked={is_has} onChange={(e)=>self.onChange(e,item,schema)}> <span>{item.label}</span></CheckboxItem>
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

export default Checkboxs;