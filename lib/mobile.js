import React,{Component} from 'react';
import { createForm } from 'rc-form';

import Form from 'antd/lib/form';
import Radio from './editors/mobile/radio';
import Input from './editors/mobile/input';
import Checkbox from './editors/mobile/checkbox';
import Select from './editors/mobile/select';
import Section from './editors/mobile/Section';
import Textarea from './editors/mobile/textarea';
import DatePicker from './editors/mobile/datepicker';
import RangePicker from './editors/mobile/rangepicker';
import Switch from './editors/mobile/switch';
import Rate from './editors/mobile/rate';
import Area from './editors/mobile/area';
import Refill from './editors/mobile/refill';
import Custom from './editors/mobile/custom';

import {List,Button} from "jw-components-mobile";

require('./styles/loading.css');
// require('antd/lib/form/style/index.css');
require('./styles/mobile/form.css');

const FormItem = Form.Item;
class BasicDemo extends React.Component {
  handleSubmit(e) {
    let self = this;
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!',errors);
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
    this.props.formData.changeData(init_schema, schema, value)
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
      formData:this.props.formData,
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
                  rules:schema["rules"] || [],
                  initialValue:schema['defaultValue'],
                  trigger:'onChange',validateTrigger:'onChange'
                })(
                    <Input  {...data} />
                )
      
    }
    if(schema.element == 'Radio'){
      component = getFieldDecorator(schema["name"],{
                    rules:schema["rules"] || [],
                    initialValue:schema['defaultValue'],
                    trigger:'onChange',validateTrigger:'onChange'
                  })(
                    <Radio {...data}></Radio>
                  )
    }
    if(schema.element == 'Checkbox'){
      component = getFieldDecorator(schema["name"],{
                    rules:schema["rules"] || [],
                    initialValue:schema['defaultValue'],
                    trigger:'onChange',validateTrigger:'onChange'
                  })(
                    <Checkbox {...data}></Checkbox>
                  )
    }
    if(schema.element == 'Select'){
      component =getFieldDecorator(schema["name"], {
                rules: schema["rules"] || [],
                initialValue:schema['defaultValue'],
              })( 
                 <Select   {...data} />
              )
    }
    if(schema.element == 'Area'){
      component =getFieldDecorator(schema["name"], {
                rules: schema["rules"] || [],
                initialValue:schema['defaultValue'],
              })( 
                 <Select   {...data} />
              )
    }
    if(schema.element == 'Refill'){
      component =getFieldDecorator(schema["name"], {
                rules: schema["rules"] || [],
                initialValue:schema['defaultValue'],
              })( 
                 <Refill   {...data} />
              )
    }
    if(schema.element == 'Section'){
      component = getFieldDecorator(schema["name"],{
                    rules:schema["rules"] || [],
                    initialValue:schema['defaultValue'],
                    trigger:'onChange',validateTrigger:'onChange'
                  })(
                    <Section {...data}></Section>
                  )
    }
    if(schema.element == 'Textarea'){
      component =getFieldDecorator(schema["name"], {
                rules: schema["rules"] || [],
                initialValue:schema['defaultValue'],
              })( 
                 <Textarea   {...data} />
              )
    }
    if(schema.element == 'DatePicker'){
      component =getFieldDecorator(schema["name"], {
                rules: schema["rules"] || [],
                initialValue:schema['defaultValue'],
              })( 
                 <DatePicker  {...data} />
              ) 
    }
    if(schema.element == 'ComboEle'){
      component =getFieldDecorator(schema["name"], {
                rules: schema["rules"] || [],
                initialValue:schema['defaultValue'],
              })( 
                 <RangePicker  {...data} />
              ) 
    }
    if(schema.element == 'Switch'){
      component =getFieldDecorator(schema["name"], {
                rules: schema["rules"] || [],
                initialValue:schema['defaultValue'],
              })( 
                 <Switch  {...data} />
              ) 
    }

    if(schema.element == 'Rate'){
      component =getFieldDecorator(schema["name"], {
                rules: schema["rules"] || [],
                initialValue:schema['defaultValue'],
              })( 
                 <Rate  {...data} />
              ) 
    }

    if(schema.element == 'Custom'){
       component = <Custom {...data}></Custom>
    }

    if(component == ''){
      return ''
    }
    
    return <FormItem key={schema['name']} className={'form-item-'+schema['element']+' '+(schema['className']||'')} style={schema['style'] || {}} help={schema["help"] || ''} extra={schema['extra'] || ''} colon={schema['colon']} hasFeedback={schema['hasFeedback'] || false} validateStatus={schema['validateStatus']}>
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
   _init_list(data){
    let self = this;
    if(data.length==0){
      return false
    }
    return (_.map(data, function(item,index){
      if(item.length){
        let nowData = self._init_list(item);
        return <div className="form-block">
                <div className="form-block-w">
                  {nowData}
                </div>
              </div>
      }else{
        return self.getFields(item,index);
      }
    }))
  }
  render() {
    let self = this;
    let items = this._init_list(self.props.formData.schema);
    return (
      <div className={"form-detail "+self.props.formData['className']}>
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
const WrappedRegistrationForm = Form.create()(BasicDemo);
export default WrappedRegistrationForm;