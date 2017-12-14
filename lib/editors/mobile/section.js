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
      return <div className="label section-label" dangerouslySetInnerHTML={{__html:txt}}></div>
    }else{
      return ''
    }
  }

  getLogo(logo){

    if(logo){
      return <img className="section-logo" src={logo}/>;
    }else{
      return '';
    }

  }

  render(){
    let schema = this.props.schema;
    let self = this;
    return (
        <div className="Form-item-w am-section" ref="container">
          {this.getLogo(schema.logo)}
          {this.getLabel(schema.label)}
        </div>
    )
  }
}
export default Section;