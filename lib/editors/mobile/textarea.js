import {TextareaItem} from 'jw-components-mobile';
import React,{Component} from 'react';
class Textarea extends Component {
  constructor(props){
    console.log(props,'zzzzz');
    super(props)
  }
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

  onFocus(e){
     var _focusElem = null; //输入框焦点
     if (/(iPhone|iOS)/i.test(navigator.userAgent)) {
       _focusElem = e.target || e.srcElement;
         _focusElem.scrollIntoView()
         _focusElem.scrollIntoViewIfNeeded(true);
     }
     
  }    

  onClick(e){
    var _focusElem = null; //输入框焦点
    if($(e.target).is(":focus")){
    }else{
      if (/(iPhone|iOS)/i.test(navigator.userAgent)) {
         $(e.target).focus();
         _focusElem = e.target || e.srcElement;
         _focusElem.scrollIntoView()
         _focusElem.scrollIntoViewIfNeeded(true);
      }
    }
  }
  render(){
    let schema = this.props.schema;
    let target = <TextareaItem {...schema['attr']} {...schema['events']} value={schema['defaultValue']} onChange={value => this.onChange(value, schema)} onClick={(e)=>this.onClick(e)}  onFocus={(e)=>this.onFocus(e)}  />;
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