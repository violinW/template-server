let _ = require('lodash');

let extAnneList = {
  //表扬Anne的拓展方法(示例)
  praiseAnne: function () {
    console.log('Anne太棒了!');
  }
}

module.exports = (Assistent)=> {
  _.each(extAnneList, (funcBody, funcName)=> {
    Assistent.extend(funcName, funcBody);
  })

}