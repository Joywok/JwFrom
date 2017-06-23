import React,{Component} from 'react';
import { createForm } from 'rc-form';

import Radio from './editors/mobile/radio';
import Input from './editors/mobile/input';
import Checkbox from './editors/mobile/checkbox';
import Select from './editors/mobile/select';
import Textarea from './editors/mobile/textarea';
import {List,Button} from "jw-components-mobile";

class BasicDemo extends React.Component {
  onChange(value, schema){
    const selected_schame = _.extend(schema, {defaultValue:value});
    const init_schema = this.state.formData.schema;
    for(var i in init_schema){
      if(init_schema[i]== schema){
        init_schema[i] = selected_schame;
      }
    }
    var init_formData=this.state.formData;
    init_formData.schema=init_schema
    this.setState({
      formData: init_formData,
    });
    var values = this.props.form.getFieldsValue(); 
    this.props.onChange(values,this.state.formData);
  }
  submit(){
    var values = this.props.form.getFieldsValue(); 
    this.props.submit(values,this.state.formData);
  }
  getLabel(index,txt){
    if(txt){
      return <div className="label" dangerouslySetInnerHTML={{__html:txt}}></div>
    }else{
      return <div className="label"><span className="sequence_number">{index+1}</span><span className="txt">{txt}</span></div>
    }
  }
  getFields(schema,index){
    const { getFieldDecorator } = this.props.form;
    if(!schema['label']){
      schema['label'] = ''
    }
    let data = {
      schema:schema,
      onChange:this.onChange.bind(this),
      index:index
    }
    let component = '';
    if(schema.element == 'Input'){
      component = getFieldDecorator(schema["name"], {
                  rules:schema["rules"] || [{ required: true, message: 'Please input your' }],
                  initialValue:schema['defaultValue'],
                  trigger:'onChange',validateTrigger:'onChange'
                })(
                    <Input  {...data} />
                )
      
    }
    if(schema.element == 'Radio'){
      component = getFieldDecorator(schema["name"],{
                    rules:schema["rules"] || [{ required: true, message: 'Please input your' }],
                    initialValue:schema['defaultValue'],
                    trigger:'onChange',validateTrigger:'onChange'
                  })(
                    <Radio {...data}></Radio>
                  )
    }
    if(schema.element == 'Checkbox'){
      component = getFieldDecorator(schema["name"],{
                    rules:schema["rules"] || [{ required: true, message: 'Please input your' }],
                    initialValue:schema['defaultValue'],
                    trigger:'onChange',validateTrigger:'onChange'
                  })(
                    <Checkbox {...data}></Checkbox>
                  )
    }
    if(schema.element == 'Select'){
      component =getFieldDecorator(schema["name"], {
                rules: [{ required: true, message: 'Please select your gender!' }],
                initialValue:schema['defaultValue'],
              })( 
                 <Select   {...data} />
              )
    }
    if(schema.element == 'Textarea'){
      component =getFieldDecorator(schema["name"], {
                rules: [{ required: true, message: 'Please select your gender!' }],
                initialValue:schema['defaultValue'],
              })( 
                 <Textarea   {...data} />
              )
    }
   
    if(component == ''){
      return ''
    }
    return <div className={schema['className']||''} style={schema['style'] || {}} help={schema["help"] || ''} extra={schema['extra'] || ''} colon={schema['colon']} hasFeedback={schema['hasFeedback'] || false} validateStatus={schema['validateStatus']}>
            {component}
           </div>
  }
  _init_button(){
    let data = this.props.formData;
    if(data['buttons']){
      return <FormItem className="form-btns">
         <Button type="button" className="form-cancel">取消</Button>
         <Button type="button" onClick={()=>this.submit()}>提交</Button>
       </FormItem>
    }
  }
  render() {
    let self = this;
    let items = [];
    _.each(self.state.formData["schema"], function(item,index){
      items.push(self.getFields(item,index));
    })
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="form-detail">
       <div  onValuesChange={()=>this.onValuesChange()}>
          <List renderHeader={() => '基本样式'} className="jw-list">
            {items}
          </List>
          {this._init_button()}
       </div>
      </div>
    );
  }
}
const WrappedRegistrationForm = createForm()(BasicDemo);
export default WrappedRegistrationForm;