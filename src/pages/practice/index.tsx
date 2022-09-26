import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  handleThousands,
  handlePrecision,
  randomNum,
  deepClone,
  formatDate,
  handleRoundNum,
  isType,
  isNullObject,
  roughFormatTime,
  carefulFormatTime,
  turnCase,
  handleRepetitiveArr
} from '@/utils'

const Practice: React.FC = () => {
  const navigate = useNavigate()
  console.log('千位分隔符---', handleThousands(1000.01))
  console.log('千位分隔符---', handleThousands(111900.0000056789))
  console.log('千位分隔符---', handleThousands(100999))

  const a = Math.round(Math.random() * 1000) / 1000
  const b = Math.round(Math.random() * 1000) / 1000

  console.log('精度运算---', handlePrecision([a, b], '*'), a * b)
  console.log('随机数---', randomNum(-2, 3))

  const obj1 = {
    a: 666,
    b: {
      c: 99
    }
  }
  const obj2 = deepClone(obj1)
  obj1.a = 10000000
  obj2.b.c = 1000
  console.log('深复制---', obj1);
  console.log('深复制---', obj2);
  console.log('深复制---', deepClone(1000));

  const t = 24000111909
  console.log('格式化日期---', formatDate(new Date(), 'LLLLL'));
  console.log('粗略计算时间---', roughFormatTime(t));
  console.log('粗略计算时间---', carefulFormatTime(t));

  console.log('四舍五入---', handleRoundNum(50.5345, 2));

  console.log('类型检测---', isType([]));
  console.log('对象为空---', isNullObject([1]));

  const str = '  all listaa A cY  der  你好 cty'

  console.log('大小写转换，全大写---', turnCase(str, 'allCapital'));
  console.log('大小写转换，全小写---', turnCase(str, 'allLowercase'));
  console.log('大小写转换，仅仅首字母大写---', turnCase(str, 'initialCapital'));
  console.log('大小写转换，所有词组首字母大写---', turnCase(str, 'allInitialCapital'));
  console.log('大小写转换，默认---', turnCase(str));


  const arr1 = [
    { id: 1, name: '刘麻子', age: 18, hobby: 1, },
    { id: 2, name: '张三', age: 28, hobby: 1, },
    { id: 1, name: '李四', age: 18, hobby: 1, },
    { id: 3, name: '张三', age: 38, hobby: 1, },
    { id: 4, name: '王老五', age: 19, hobby: 1, },
    { id: 4, name: '刘麻子', age: 16, hobby: 1, },
    { id: 5, name: '臭猪猪', age: 21, hobby: 1, },
    { id: 6, name: '傻憨憨', age: 25, hobby: 1, },
    { id: 3, name: '土老帽', age: 19, hobby: 1, },
    { id: 2, name: '李四', age: 38, hobby: 1, },
  ]
  const arr2 = [1, 2, 3, 4, 5, 1, 3, 2,]

  console.log('指定数组去重, id---', handleRepetitiveArr(arr1, 'id'));
  console.log('指定数组去重, 基本数据类型---', handleRepetitiveArr(arr2));


  const change = () => {
    navigate('/practice/other')
  }
  return (
    <>
      <button onClick={change}>跳转</button>
      <div>练习</div>
    </>
  )
}

export default Practice