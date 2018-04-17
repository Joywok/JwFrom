import React,{PropType,Component} from 'react';
import { createForm } from 'rc-form';
import Img from "../../images/Group@2x.png"

class SelObjs extends Component {
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
    let self = this;
    let target = <div className="selobjs-icon"><img src={Img}/></div>;
    return (
        <div className="Form-item-w " ref="container">
          {this.getLabel(schema.label)}
          {target}
        </div>
    )
  }
}
export default SelObjs;