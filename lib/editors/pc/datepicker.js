import DatePicker from 'jw-components/lib/date-picker';
const { RangePicker,MonthPicker} = DatePicker;
import React,{Component} from 'react';
class DateCustom extends Component {
	getLabel(txt){
    if(txt){
      return <div className="label ant-form-item-label" dangerouslySetInnerHTML={{__html:txt}}></div>
    }else{
      return ''
    }
  }
	onChange(e,schema){
  	const value=e.target.value;
  	this.props.onChange(value,schema);
		let propsSchema = this.props.schema;
		if(propsSchema['events'] && propsSchema['events']['onChange']){
			propsSchema['events']['onChange'].call(this,arguments);
		}
  }
	render(){
		let self = this;
		let schema = this.props.schema;
		let data = Object.assign({},{
		},schema['attr'],schema["events"])
		let target;
		if(schema['type'] == 'month'){
			target = <MonthPicker {...data} />
		}else if(schema['type'] == 'range'){
			target = <RangePicker {...data} />
		}else{
			target = <DatePicker {...data} />
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
				<div className="Form-item-w" ref="container">
					{this.getLabel(schema.label)}
					{target}
				</div>
		)
	}
	componentDidMount(){
	}
	componentDidUpdate(){
	}
}
export default DateCustom;