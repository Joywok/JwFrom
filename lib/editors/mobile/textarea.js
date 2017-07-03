import {TextareaItem} from 'jw-components-mobile';
import React,{Component} from 'react';
class Textarea extends Component {
  onChange(value,schema){
    this.props.onChange(value,schema);
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
    let target = <TextareaItem  defaultValue={schema['defaultValue']} onChange={value => this.onChange(value, schema)} />;

    if(schema["other"] && schema["other"]['template']){
      let Template = schema["other"]['template']
      target = <div className="Form-item-c">
                <Template children={target} target={self} changeData={self.props.changeData} changeSchemas={self.props.changeSchemas}></Template>
              </div>
    }else{
      target = <div className="Form-item-c">{target}</div>
    }
    return (
        <div className="Form-item-w " ref="container">
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
export default Textarea;