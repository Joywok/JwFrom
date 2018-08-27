import {Radio, InputItem} from 'jw-components-mobile';
import React,{PropType,Component} from 'react';
const RadioItem = Radio.RadioItem;
class Radios extends Component {

	constructor(props) {
		super(props);
		this.state = {
			schema: this.props.schema
		}	
	}
	

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
  changeData(data){
		this.props.onChange(value,schema)	
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

  inputChange(value){

  	console.log(value)
  	let self = this;
  	for(var i in this.props.schema.options){
  		if(this.props.schema.options[i].hasInput){
  			this.props.schema.options[i].inputValue = value
  		}
  	}
  	self.setState({
  		schema: this.props.schema
  	})

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
  	let schema = this.state.schema;
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
			target = schema["remote"]["loading"] ||<div className="loading-bounce ">
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
			target = <div className="radio-list" {...schema['attr']}>
				{
					_.map(schema.options,function(item){
						return <RadioItem name={item.name || item.value} key={item.value} className="radio-list-i" checked={schema.defaultValue == item.value?true:false} disabled={item["disabled"]||false} onChange={()=>self.onChange(item.value,schema)}>{item.label}</RadioItem>
					})
				}
			</div>;
		}

		if(schema["other"] && schema["other"]['template']){
			let Template = schema["other"]['template']
			target = <div className="Form-item-c">
								<Template children={target} target={self} changeData={self.props.changeData} changeSchemas={self.props.changeSchemas}></Template>
							</div>
		}else{
			target = <div className="Form-item-c">{target}</div>
		}

		let input = "";
		for(var i in schema.options){
			if(schema.options[i].hasInput){
				input = <InputItem className="radio-input" onChange={this.inputChange.bind(this)} value={schema.options[i].inputValue}/>
			}
		}

		return (
				<div className={"Form-item-w "+this._init_layout()} ref="container">
					{this.getLabel(schema.label)}
					{target}
					{input}
				</div>
		)
	}
}
export default Radios;