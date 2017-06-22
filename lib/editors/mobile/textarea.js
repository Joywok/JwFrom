import {TextareaItem} from 'jw-components-mobile';
import React,{Component} from 'react';
class Textarea extends Component {
  onChange(value,schema){
    this.props.onChange(value,schema);
  }
  render(){
    let schema = this.props.schema;
    let target = <TextareaItem  autoHeight defaultValue={schema['defaultValue']} onChange={value => this.onChange(value, schema)} />;

    if(schema["other"] && schema["other"]['template']){
      let Template = schema["other"]['template']
      target = <Template children={target} target={this}></Template>
    }else{
      target = <div className="Form-item-c">{target}</div>
    }
    return (
      <div className="Form-item-w">
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
export default Textarea;