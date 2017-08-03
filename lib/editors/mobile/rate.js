import Rating from 'react-rating'
import React,{Component} from 'react';
class RateCustom extends Component {
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
	render(){
		let schema = this.props.schema;
		let data = Object.assign({
			empty:<i className="fa fa-star-o"></i>,
			full:<i className="fa fa-star"></i>
		});

		if(schema && schema['attr']){
			data = Object.assign(data,schema["attr"])
		}
		if(schema && schema['events']){
			data = Object.assign(data,schema["events"])
		}
		console.log(data);
		let target = <Rating {...data} initialRate={schema['defaultValue']} onChange={value => this.onChange(value, schema)}/>;
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
		//初始化
	}
	componentDidUpdate(){
		//变化
		// console.log(this.refs.template,'123');
	}
}
export default RateCustom;