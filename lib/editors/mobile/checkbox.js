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
    this.props.onChange(arr,schema) 	 
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
			target = <Template children={target} target={this}></Template>
		}else{
			target = <div className="Form-item-c">{target}</div>
		}
		return (
				<div className="Form-item-w">{target}</div>
		)
	}
}

export default Checkboxs;