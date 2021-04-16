import axios from 'axios';
import Checkbox from 'jw-components/lib/checkbox';
import React,{PropType,Component} from 'react';
import { Form } from 'antd';
import message from 'antd/lib/message';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
class Checkboxs extends Component {
	getLabel(txt){
    if(txt){
      return <div className="label ant-form-item-label" dangerouslySetInnerHTML={{__html:txt}}></div>
    }else{
      return ''
    }
  }
	onChange(value,schema){
  	this.props.onChange(value,schema);
  	let propsSchema = this.props.schema;
		if(propsSchema['events'] && propsSchema['events']['onChange']){
			propsSchema['events']['onChange'].call(this,arguments);
		}
	}
	selectData(selected_schame,data){
		let self = this;
		let nowSchema = [];
    data.map(function(i,index){
      if(i.length){
        nowSchema.push(self.selectData(selected_schame,i))
      }else{
        if(i['name'] == selected_schame['name']){
          nowSchema.push(selected_schame)
        }else{
          nowSchema.push(i)
        }
      }
    })
    return nowSchema;
  }
	resetOptions(data){
		let self = this;
		const schemas = self["props"]['schemas'];
		let schema = self.props.schema;
		schema['options'] = data;
		let nowSchema = this.selectData(schema,schemas);
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
			target = schema["remote"]["loading"] || <div className="loading-bounce ">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>;
			if(schema['remote']['fetch'] && typeof(schema['remote']['fetch'])=='function'){
				schema['remote']['fetch'](this.resetOptions.bind(this));
			}else{
				axios({
					method:schema["remote"]["method"],
					url: schema["remote"]["url"],
					data: schema["remote"]["data"]
				})
				.then((response)=>{
					console.log(response);
					self.resetOptions(response)
				})
				.catch((error)=>{
					message.error(error.toString(),2);
				})
			}
		}else{
			// target = <CheckboxGroup options={schema.options} onChange={v=>self.onChange(v,schema)} value={schema["defaultValue"]} />
			target = <Checkbox.Group onChange={v=>self.onChange(v,schema)} value={schema["defaultValue"]}>
								{
									_.map(schema.options,function(item){
										let imgHtml='';
										if (item['image']) {
											imgHtml = <div className={"location img-set "}>
					                      <div className={"img-set-w "}>
					                        <img src={item.image}/>
					                      </div>
				                      </div>
				                    }
										return <div className="checkbox-groups-i-warp">
											<Checkbox value={item["value"]}>{item.label}</Checkbox>
											{imgHtml}
										</div>
									})
								}
							 </Checkbox.Group>
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

export default Checkboxs;