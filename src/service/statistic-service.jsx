/*
 * @Author: chenglin 
 * @Date: 2019-06-21 16:59:13 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-21 17:04:06
 */
import MUtil from 'util/mm.jsx'

const _mm = new MUtil();

class Statistic {
  // 统计数据
  getHomeCount() {
    return _mm.request({
      url: '/manage/statistic/base_count.do'
    })
  }
}

export default Statistic;