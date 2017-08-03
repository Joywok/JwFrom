import DatePicker from 'antd-mobile/lib/date-picker';
import List from 'antd-mobile/lib/list';
import moment from 'moment';
import React,{PropType,Component} from 'react';
class DatePickers extends Component {
	onChange(value,schema){
  	this.props.onChange(value.format('X'),schema);
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
			mode:"date",
			title:"选择日期",
			disabled:false,
			value:moment(schema['defaultValue']*1000) || moment(),
			format:function(val){
				return val.format('YYYY-MM-DD HH:mm:ss')
			}
		},schema['attr'],schema["events"])
		let target = <DatePicker {...data} onChange={(e)=>self.onChange(e,schema)}>
										<List.Item arrow="horizontal"></List.Item>
								 </DatePicker>
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

export default DatePickers;