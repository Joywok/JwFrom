import DatePicker from 'antd-mobile/lib/date-picker';
import List from 'antd-mobile/lib/list';
import moment from 'moment';
import React,{PropType,Component} from 'react';
class RangePicker extends Component {
	onChangeStart(value,schema){
  		this.props.onChange(value.format('X'),schema, "start");
		let propsSchema = this.props.schema;
		if(propsSchema['events'] && propsSchema['events']['onChange']){
			propsSchema['events']['onChange'].call(this,arguments);
		}
	}
	onChangeEnd(value,schema){
  		this.props.onChange(value.format('X'),schema, "end");
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
		let dataStart = Object.assign({},{
			mode:"date",
			title:"选择开始日期",
			disabled:false,
			value:schema['defaultValue']?moment(schema['defaultValue']*1000):moment(),
			format:function(val){
				return val.format('YYYY-MM-DD HH:mm:ss')
			}
		},schema['attr'],schema["events"])
		let dataEnd = Object.assign({},{
			mode:"date",
			title:"选择结束日期",
			disabled:false,
			value:schema['defaultValue']?moment(schema['defaultValue']*1000):moment(),
			format:function(val){
				return val.format('YYYY-MM-DD HH:mm:ss')
			}
		},schema['attr'],schema["events"])
		let targetStart = <DatePicker {...dataStart} onChange={(e)=>self.onChangeStart(e,schema)}>
										<List.Item arrow="horizontal"></List.Item>
								 </DatePicker>
		let targetEnd = <DatePicker {...dataEnd} onChange={(e)=>self.onChangeEnd(e,schema)}>
										<List.Item arrow="horizontal"></List.Item>
								 </DatePicker>
		if(schema.schema[0]["other"] && schema.schema[0].schema["other"]['template']){
			let Template = schema["other"]['template']
			targetStart = <div className="Form-item-c datapicker-start">
								<Template children={targetStart} target={self} changeData={self.props.changeData} changeSchemas={self.props.changeSchemas}></Template>
							</div>
		}else{
			targetStart = <div className="Form-item-c datapicker-start">{targetStart}</div>
		}

		if(schema.schema[1]["other"] && schema.schema[1].schema["other"]['template']){
			let Template = schema["other"]['template']
			targetEnd = <div className="Form-item-c datapicker-end">
								<Template children={targetEnd} target={self} changeData={self.props.changeData} changeSchemas={self.props.changeSchemas}></Template>
							</div>
		}else{
			targetEnd = <div className="Form-item-c datapicker-end">{targetEnd}</div>
		}
		return (
				<div className={"Form-item-w "+this._init_layout()} ref="container">
					{this.getLabel(schema.label)}
					<div>
					{targetEnd}
					<div className="rangepicker-line">~</div>
					{targetStart}
					</div>
				</div>
		)
	}
}

export default RangePicker;