import {Picker,List} from 'jw-components-mobile';
import React,{PropType,Component} from 'react';
import { createForm } from 'rc-form';

class Section extends Component {
  onChange(value,schema){
    this.props.onChange(value,schema);
    let propsSchema = this.props.schema;
    if(propsSchema['events'] && propsSchema['events']['onChange']){
			propsSchema['events']['onChange'].call(this,arguments);
		}
  }
  getLabel(txt){
    if(txt){
      return <div className="label form-section" dangerouslySetInnerHTML={{__html:txt}}></div>
    }else{
      return ''
    }
  }
  render(){
    let schema = this.props.schema;
    let self = this;
    return (
        <div className="Form-item-w" ref="container">
          {this.getLabel(schema.label)}
        </div>
    )
  }
}
export default Section;