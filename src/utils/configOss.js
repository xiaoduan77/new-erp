const OSS = require('ali-oss')
export function client() {
  var client = new OSS({
    region: 'oss-cn-hangzhou', // 地域
    // 		endpoint:"oss-cn-hangzhou.aliyuncs.com",//访问域名
    accessKeyId: 'LTAI5tJagEWuG7H9S1UdudFv', // 你自己的key和id
    accessKeySecret: 'OtWLgjSxWGnbcHC122gQILLaYq2w5b',
    bucket: 'fs-blockerp', // oss上你的存储空间名称
    secure: true
  })
  return client
}
