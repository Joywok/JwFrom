import React,{Component} from 'react';
import { createForm } from 'rc-form';
import { Provider, connect } from 'react-redux';

import {
  Form,InputNumber,
  Slider,Button,Upload, Icon,Col,TimePicker,
} from 'antd';
require('./styles/loading.css');
import Radio from './editors/pc/radio';
import Input from './editors/pc/input';
import Checkbox from './editors/pc/checkbox';
import Matrix from './editors/pc/matrix';

import Switch from './editors/pc/switch';
import Select from './editors/pc/select';
import DatePicker from './editors/pc/datepicker';
import Rate from './editors/pc/rate';
import Custom from './editors/pc/custom';
// import { Input } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const dateFormat = 'YYYY/MM/DD';
const now = "08:00";
const timeformat = 'h:mm a';
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
    let self = this;
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
    let self = this;
    this.props.formData.changeData(data)
  }
  SelectChange(value,schema){
   this.onChange(value,schema);
  }
  dateChange(date,datestring,schema){
  	if(date){
  		// console.log(Date.parse(new Date(date._d)),datestring);
	  	var timeStr=Date.parse(new Date(date._d));
	  	this.onChange(timeStr,schema);
  	}	
  }
  timeChange(v,time,schema){
    // console.log(v,time,schema);
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
                  rules:schema["rules"] || [{ required: true, message: 'Please input your' }],
                  initialValue:schema['defaultValue'],
                  trigger:'onChange',validateTrigger:'onChange'
                })(
                    <Input {...data} />
                )
    }
    if(schema.element == 'Textarea'){
      data['type'] = "Textarea"
      component = getFieldDecorator(schema["name"], {
                  rules:schema["rules"] || [{ required: true, message: 'Please input your' }],
                  initialValue:schema['defaultValue'],
                  trigger:'onChange',validateTrigger:'onChange'
                })(
                    <Input {...data} />
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
    if(schema.element == 'Matrix'){
      component = getFieldDecorator(schema["name"],{
                    rules:schema["rules"] || [{ required: true, message: 'Please input your' }],
                    initialValue:schema['defaultValue'],
                    trigger:'onChange',validateTrigger:'onChange'
                  })(
                    <Matrix {...data}></Matrix>
                  )
    }
    if(schema.element == 'Switch'){
      component = getFieldDecorator(schema["name"],{
                    rules:schema["rules"] || [{ required: true, message: 'Please input your' }],
                    initialValue:schema['defaultValue'],
                    trigger:'onChange',validateTrigger:'onChange'
                  })(
                    <Switch {...data}></Switch>
                  )
    }
    if(schema.element == 'Select'){
      component = getFieldDecorator(schema["name"], {
                    rules: schema["rules"] || [{ required: true, message: 'Please select your gender!' }],
                    initialValue:schema['defaultValue'],
                    trigger:'onChange',validateTrigger:'onChange'
                  })(
                    <Select {...data}></Select>
                  )
    }
    if(schema.element == 'DatePicker'){
      let mode =  ['month', 'month'];
      component = getFieldDecorator(schema["name"], {
                    rules: schema["rules"] || [{ required: true, message: 'Please select your gender!' }],
                    initialValue:schema['defaultValue'],
                    trigger:'onChange',validateTrigger:'onChange'
                  })( 
                      <DatePicker mode={mode} {...data}></DatePicker>
                  )
    }

    if(schema.element == 'Rate'){
      component =getFieldDecorator(schema["name"], {
                rules: schema["rules"] || [{ required: true, message: 'Please select your gender!' }],
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
    return <FormItem key={schema['name']} className={'form-item-'+schema['element']+' '+(schema['className']||'')} style={schema['style'] || {}} help={schema["help"] || ''} extra={schema['extra'] || ''} hasFeedback={schema['hasFeedback'] || false} validateStatus={schema['validateStatus']}>
            {component}
           </FormItem>
  }
  _init_button(){
    let data = this.props.formData;
    if(data['buttons']){
      return <FormItem className="form-btns">
         <Button type="button" className="form-cancel">取消</Button>
         <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>提交</Button>
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
        {items}
        {this._init_button()}
       </Form>
      </div>
    );
  }
  componentDidMount(){

  }
}

const WrappedRegistrationForm = Form.create({})(BasicDemo);
export default WrappedRegistrationForm;

