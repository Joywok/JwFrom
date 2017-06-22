import {Picker,List} from 'jw-components-mobile';
import React,{PropType,Component} from 'react';
import { createForm } from 'rc-form';

class Select extends Component {

  constructor(props) {
    super(props);
     
  }
  onChange(value,schema){
    this.props.onChange(value,schema)
  }
  render(){

    let schema = this.props.schema;
    let self = this;

    let target = <Picker data={schema.options} onChange={(value)=>this.onChange(value,schema)} value={schema.defaultValue} cols={1} >
                  <List.Item arrow="horizontal">选择地区（单列）</List.Item>
                </Picker>;


    
    if(schema["other"] && schema["other"]['template']){
      let Template = schema["other"]['template']
      target = <Template children={target} target={this}></Template>
    }else{
      target = <div className="Form-item-c">{target}</div>
    }
    return (
        <div className="Form-item-w">{target}</div>
    )
  }
}
export default Select;