import React,{Component} from 'react';
import { createForm } from 'rc-form';
import Form from 'antd/lib/form';
import Radio from './editors/mobile/radio';
import Input from './editors/mobile/input';
import Checkbox from './editors/mobile/checkbox';
import Select from './editors/mobile/select';
import Textarea from './editors/mobile/textarea';
import {List,Button} from "jw-components-mobile";
const FormItem = Form.Item;
class BasicDemo extends React.Component {
  handleSubmit(e) {
    let self = this;
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      if(typeof(self.props.submit)=='function'){
        self.props.submit(values)
      }
    });
  }
  onChange(value, schema){
    let selected_schame = Object.assign(schema, {defaultValue:value});
    let init_schema = this.props.formData.schema;
    for(var i in init_schema){
      if(init_schema == schema){
        init_schema[i] = selected_schame;
      }
    }
    this.props.formData.changeData(init_schema)
  }
  changeData(name,data,reset){
    let init_schema = this.props.formData.schema;
    _.each(init_schema,function(i){
      if(i['name'] == name){
        Object.assign(i,data)
      }else{
        if(reset){
          Object.assign(i,reset);
        }
      }
    })
    this.props.formData.changeData(init_schema)
  }
  changeSchemas(data){
    this.props.formData.changeData(data)
  }
  getFields(schema,index){
    const { getFieldDecorator } = this.props.form;
    if(!schema['label']){
      schema['label'] = ''
    }
    let data = {
      schemas:this.props.formData.schema,
      schema:schema,
      onChange:this.onChange.bind(this),
      changeData:this.changeData.bind(this),
      changeSchemas:this.changeSchemas.bind(this),
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
    return <FormItem key={schema['name']} className={schema['className']||''} style={schema['style'] || {}} help={schema["help"] || ''} extra={schema['extra'] || ''} colon={schema['colon']} hasFeedback={schema['hasFeedback'] || false} validateStatus={schema['validateStatus']}>
            {component}
           </FormItem>
  }
  _init_button(){
    let data = this.props.formData;
    if(data['buttons']){
      return <FormItem className="form-btns">
         <Button type="button" className="form-cancel">取消</Button>
         <Button type="button" onClick={this.handleSubmit.bind(this)}>提交</Button>
       </FormItem>
    }
  }
  render() {
    let self = this;
    let items = [];
    _.each(self.props.formData.schema, function(item,index){
      items.push(self.getFields(item,index));
    })
    return (
      <div className="form-detail">
        <Form ref="form">
          <List className="jw-list">
            {items}
          </List>
          {this._init_button()}
        </Form>
      </div>
    );
  }
}
const WrappedRegistrationForm = createForm()(BasicDemo);
export default WrappedRegistrationForm;