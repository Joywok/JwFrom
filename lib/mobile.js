// const schema= [
//   {name: 'pwd', element:'Input', type: 'text', label: '姓名', placeholder:'请输入姓名', defaultValue:'12312312312'},
//   {name: 'hobby', element:'Radio',label: '爱好', options: [
//     { value: '篮球', checked:false,label: '篮球'},
//     { value: '足球', checked:false,label: '足球'}
//   ], defaultValue:'篮球',arrayType:'vertical'},
//   {name: 'instrest', element:'CheckBox', label: '兴趣',options: ['电影' ,'睡觉'], defaultValue:[],arrayType:'vertical'},
//   {name:'txt', element:'Input', type: 'textarea', label: '描述', placeholder:'请给出一段描述',defaultValue: '这是一段描述'},
//   {name:'select',element:'Select',label:'select',options:[
//     {value:'电影',label:'电影'}
//     ,{value:'睡觉',label:'睡觉'}
//   ],defaultValue:''},
//   {name:'date',element:'Date',label:'日期',placeholder:'请选择日期',defaultValue:''}
// ]
let data = {
  layout:'horizontal',
  schema:[]
}
import React,{Component} from 'react';
import { createForm } from 'rc-form';
import {
  Form,Button
} from 'antd-mobile';

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
  constructor(props) {
		super(props);
		this.state = {
			formData:props.formData
		}
	}
  handleSubmit(e) {
    let self = this;
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log(values,'生成后的代码');
    });
  }
  onChange(value, schema){
    const selected_schame = _.extend(schema, {defaultValue:value});
    const init_schema = this.state.schema;
    for(var i in init_schema){
      if(init_schema == schema){
        init_schema[i] = selected_schame;
      }
    }
    this.setState({
      schema: init_schema,
    });
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
    if(component == ''){
      return ''
    }
    return <FormItem className={schema['className']||''} style={schema['style'] || {}} label={this.getLabel(index,schema.label)} labelCol={schema["labelCol"] || {}} help={schema["help"] || ''} extra={schema['extra'] || ''} colon={schema['colon']} hasFeedback={schema['hasFeedback'] || false} validateStatus={schema['validateStatus']}>
            {component}
           </FormItem>
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
       <Form onSubmit={this.handleSubmit.bind(this)}>
        {items}
         <FormItem className="form-btns">
           <Button type="button" className="form-cancel">取消</Button>
           <Button type="primary" htmlType="submit"> 提交</Button>
         </FormItem>
       </Form>
      </div>
    );
  }
}
const WrappedRegistrationForm = Form.create()(BasicDemo);
export default WrappedRegistrationForm;