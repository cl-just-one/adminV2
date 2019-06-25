/*
 * @Author: chenglin 
 * @Date: 2019-06-25 17:32:48 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-25 18:24:38
 */
import React, { Component } from 'react';
import SimEditor from 'simditor';

import 'simditor/styles/simditor.scss'

class RichEditor extends Component {
  componentDidMount() {
    this.loadRichDitor()
  }
  loadRichDitor() {
    let element = this.refs['textarea'];
    this.simditor = new SimEditor({
      textarea: $(element),
      defaultValue: this.props.placeholder || "请输入内容",
      upload: {
        url: '/manage/product/richtext_img_upload.do',
        defaultImage: '',
        fileKey: 'upload_file'
      }
    })
    this.bindEditorEvent();
  }
  // 初始化富文本编辑器事件
  bindEditorEvent() {
    this.simditor.on("valuechanged", e => {
      this.props.onValueChange(this.simditor.getValue());
    })
  }
  render() {
    return (
      <div className="rich-editor">
        <textarea ref="textarea"></textarea>
      </div>
    );
  }
}

export default RichEditor;