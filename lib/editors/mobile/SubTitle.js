import React,{PropType,Component} from 'react';
class SubTitle extends Component {
	getLabel(txt){
    if(txt){
      return <div className="form-sub-title label ant-form-item-label" dangerouslySetInnerHTML={{__html:txt}}></div>
    }else{
      return ''
    }
  }
	render(){
		let schema = this.props.schema;
		return (
				<div className="Form-item-w" ref="container">
					{this.getLabel(schema.label)}
				</div>
		)
	}
}

export default SubTitle;