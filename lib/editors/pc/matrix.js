import axios from 'axios';
import Radio from 'jw-components/lib/radio';
import Checkbox from 'jw-components/lib/checkbox';
import React,{PropType,Component} from 'react';
import { Form } from 'antd';
import message from 'antd/lib/message';
require('./../../styles/form.css');
const FormItem = Form.Item;
const RadioButton = Radio.Button;
class Matrix extends Component {
	getLabel(txt){
    if(txt){
      return <div className="label ant-form-item-label" dangerouslySetInnerHTML={{__html:txt}}></div>
    }else{
      return ''
    }
  }
	onChange(e,targetIndex,targetChildrenIndex){
		let checked = e.target.checked;
		let schema = this.props.schema;
		let data = this.props.schema['defaultValue'];
		_.each(data,function(i,index){
			if(index == targetIndex){
				_.each(i['list'],function(item,childrenIndex){
					if(childrenIndex == targetChildrenIndex){
						item['value'] = checked;
					}
				})
			}
		})
  	this.props.onChange(data,schema);
	}
	resetOptions(data){
		let self = this;
		const schemas = self["props"]['schemas'];
		_.each(schemas,function(i){
			if(i['name'] == self.props.schema["name"]){
				i['options'] = data;
			}
		})
		let changeSchemas = self.props.changeSchemas;
		changeSchemas(schemas);
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
		let target;
		if(schema["remote"] && (!schema['options'] || schema['options'].length==0)){
			target = schema["remote"]["loading"] || <div className="loader">Loading...</div>;
			if(schema['remote']['fetch'] && typeof(schema['remote']['fetch'])=='function'){
				schema['remote']['fetch'](this.resetOptions.bind(this));
			}else{
				axios({
					method:schema["remote"]["method"],
					url: schema["remote"]["url"],
					data: schema["remote"]["data"]
				})
				.then((response)=>{
					self.resetOptions(response)
				})
				.catch((error)=>{
					message.error(error.toString(),2);
				})
			}
		}else{
			// console.log(schema['options']);
			// <CheckboxGroup options={schema.options} onChange={v=>self.onChange(v,schema)} value={schema["defaultValue"]} />
			target = <div className="matrix-list">
				<div className="matrix-title">
					{
						_.map(schema['options']['title'],function(i){
							return <div className="matrix-title-i">{i}</div>
						})
					}
				</div>
				<div className="matrix-list-c">
					{
						_.map(schema['defaultValue'],function(i,index){
							return <div className="matrix-row-i">
											<div className="matrix-series-i title">{i["label"]}</div>
											{
												_.map(i['list'],function(i,childrenIndex){
													return <div className="matrix-series-i">{
														<Checkbox checked={i["value"]} disabled={i["disabled"]||false}onChange={(e)=>self.onChange(e,index,childrenIndex)}></Checkbox>
														// i['element'] && i['element']=='checkbox'?
														//  :<Radio checked={i["value"]} onChange={(e)=>self.onChange(e,index,childrenIndex)}></Radio>
													}</div>
												})
											}
										</div>
						})
					}
				</div>
			</div>
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
				<div className={"Form-item-w "+this._init_layout()} ref="container">
					{this.getLabel(schema.label)}
					{target}
				</div>
		)
	}
}

export default Matrix;