import {InputItem} from 'jw-components-mobile';
import React,{Component} from 'react';
import Img from "../../images/add1@2x.png"
class DrivePicker extends Component {
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
		
		return (
				<div className="Form-item-w" ref="container">
					{this.getLabel(schema.label)}
					<div className="file-upload-label">上传</div>
					<img className="file-upload-icon" src={Img} />
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
export default DrivePicker;