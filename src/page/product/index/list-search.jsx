import React, { Component } from 'react';

class listSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: 'productId', // 搜索类型productId / productName
      searchKeyword: ''
    }
  }
  // 数据变化的时候
  onValChange(e) {
    let name = e.target.name,
        value = e.target.value.trim();
    this.setState({
      [name]: value
    })
  }
  // 点击搜素的时候
  onSearch() {
    this.props.onSearch(this.state.searchType, this.state.searchKeyword);
  }
  // 点击回车的时候
  onSearchKeywordKeyUp(e) {
    if (e.keyCode === 13) {
      this.onSearch();
    }
  }
  render() {
    return (
      <div className="row search-wrap">
        <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select className="form-control"
                name="searchType"
                onChange={(e) => { this.onValChange(e) }}>
                <option value="productId">按ID搜索商品</option>
                <option value="productName">按名称搜索商品</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text"
                className="form-control"
                name="searchKeyword"
                placeholder="关键词"
                onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
                onChange={(e) => this.onValChange(e)} />
            </div>
            <button className="btn btn-primary" onClick={(e)=>{this.onSearch(e)}}>搜索</button>
          </div>
        </div>
      </div>
    );
  }
}

export default listSearch;