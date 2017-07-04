import React,{Component} from 'react';
import { createForm } from 'rc-form';
import { Provider, connect } from 'react-redux';
import {
  Form, Select,InputNumber, Switch,
  Slider,Button,Upload, Icon,Col,DatePicker,TimePicker,
} from 'antd';

import Radio from './editors/pc/radio';
import Input from './editors/pc/input';
import Checkbox from './editors/pc/checkbox';
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
    let self = this;
    this.props.formData.changeData(data)
    // this.forceUpdate();
    // setTimeout(function(){
      // self.forceUpdate();
    // },0)
  }
  SelectChange(value,schema){
   this.onChange(value,schema);
  }
  dateChange(date,datestring,schema){
  	if(date){
  		console.log(Date.parse(new Date(date._d)),datestring);
	  	var timeStr=Date.parse(new Date(date._d));
	  	this.onChange(timeStr,schema);
  	}	
  }
  timeChange(v,time,schema){
    console.log(v,time,schema);
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
      component = getFieldDecorator(schema["name"], {
                    rules: schema["rules"] || [{ required: true, message: 'Please select your gender!' }],
                    initialValue:schema['defaultValue'],
                    trigger:'onChange',validateTrigger:'onChange'
                  })(
                    <Select  onChange={v=>this.SelectChange(v,schema)} placeholder="请选择" className="jw-web-select">
                    {
                      _.map(schema.options,function(item){
                        return  <Option value={item.label}>{item.label}</Option>
                      })
                    }
                    </Select>
                  )
    }
    if(schema.element == 'Date'){
      component = getFieldDecorator(schema["name"], {
                    rules: schema["rules"] || [{ required: true, message: 'Please select your gender!' }],
                    initialValue:schema['defaultValue'],
                    trigger:'onChange',validateTrigger:'onChange'
                  })( 
                      <DatePicker onChange={(v,date)=>this.dateChange(v,date,schema)} defaultValue={schema.defaultValue} format={dateFormat} />
                  )
    }
    if(schema.element == 'Time'){
      component = getFieldDecorator(schema["name"], {
                    rules: schema["rules"] || [{ required: true, message: 'Please select your gender!' }],
                    initialValue:schema['defaultValue'],
                    trigger:'onChange',validateTrigger:'onChange'
                  })( 
                  <div className="timePicker">
                    <TimePicker
                      onChange={(v,time)=>this.timeChange(v,time,schema)}
                      disabledHours={() => [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}
                      hideDisabledOptions
                      format = 'HH'
                    />
                    <span>:</span>
                    <TimePicker
                      onChange={(v,time)=>this.timeChange(v,time,schema)}
                      format = 'mm'
                    />
                  </div>
                  )
    }
    if(component == ''){
      return ''
    }
    return <FormItem className={'form-item-'+schema['element']+' '+(schema['className']||'')} style={schema['style'] || {}} help={schema["help"] || ''} extra={schema['extra'] || ''} hasFeedback={schema['hasFeedback'] || false} validateStatus={schema['validateStatus']}>
            {component}
           </FormItem>
  }
  _init_button(){
    let data = this.props.formData;
    if(data['buttons']){
      return <FormItem className="form-btns">
         <Button type="button" className="form-cancel">取消</Button>
         <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}> 提交</Button>
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
        {items}
        {this._init_button()}
       </Form>
      </div>
    );
  }
  componentDidMount(){
  }
}

const WrappedRegistrationForm = createForm({})(BasicDemo);
export default WrappedRegistrationForm;

