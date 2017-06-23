import {Checkbox} from 'jw-components-mobile';
import React,{PropType,Component} from 'react';
const CheckboxItem = Checkbox.CheckboxItem;
class Checkboxs extends Component {
	onChange(v,schema){
	  console.log(v,schema,"Checkboxsvalue");
   	var newArr= _.filter(schema.defaultValue, function(item){
   		return item.value==v.value; 
   	});
	  var arr=schema.defaultValue;
	  if(newArr.length>0){
     	arr= _.filter(schema.defaultValue, function(item){
   			return item.value!=v.value; 
   		});
	  }else{
	  	arr.push(v);
	  }
    this.props.onChange(arr,schema);
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
				_.map(schema.options,function(item){
					var is_has=false;
					 _.map(schema.defaultValue,function(i){
              if(i.value==item.value){
              	is_has=true;
              }
					 })
					return <CheckboxItem  checked={is_has}    onChange={()=>self.onChange(item,schema)}> <span>{item.label}</span></CheckboxItem>
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