const rd = require('rd')
const qn = require('qn')
const path = require('path')

// rd.read('./test',(err,files)=>{
//     if(err) throw err;
//
//     console.log(files)
// })

let bucket = 'ntboao'
let dir_root = '/mmjpg/75F大胸美人儿于姬Una私房图片'


// 七牛云配置
const client = qn.create({
// 秘钥在控制模板->个人中心->密钥管理中可以看到
    accessKey: 'rsnQ1mPiWJwthOmbSSIfwvsKkNX0ZzTrISaLMlM0',
    secretKey: 'Gu00U4X8-KUgHIAybg4TeeZnhjRX5d7-Dn8Jo89M',
// 空间名
    bucket: bucket,
// 这个是你要生成的前缀（你的外链地址，可以在空间中查看）
// 其实写不写都行，不写后面也得写.
    origin: 'http://oy98650kl.bkt.clouddn.com'
})


// 异步遍历目录下的所有文件
rd.each(dir_root, (f, s, next) => {
    // 每找到一个文件都会调用一次此函数
    // 参数s是通过 fs.stat() 获取到的文件属性值
    // console.log('file: %s', f);
    if (s.size > 0) {
        let dirname = path.dirname(f).split(path.sep).pop()
        // console.log('dir: %s', dirname)
        let filename = f.toString().split(path.sep).pop()
        // console.log('file: %s', filename)
        client.uploadFile(f, {key: `/${dirname}/${filename}`}, function (err, result) {
            if (err) {
                console.log('上传失败')
                console.log(err)
            } else {
                let store_url = result.url;
                console.log('result: %s',store_url)
            }
            // 上传之后删除本地文件
            //fs.unlinkSync(filePath);
        });
    }

    // 必须调用next()才能继续
    next();
}, (err) => {
    if (err) throw err;
    // 完成
});

// // 同步遍历目录下的所有文件
// rd.eachSync('/tmp', (f, s)=> {
//     // 每找到一个文件都会调用一次此函数
//     // 参数s是通过 fs.stat() 获取到的文件属性值
//     console.log('file: %s', f);
// });

// client.uploadFile(filePath, {key: `/avatar/${fileName}`}, function (err1, result) {
//     if (err1) {
//         res.json({
//             status: '1',
//             msg: '上传失败'
//         });
//     } else {
//         res.json({
//             status: '0',
//             result: {
//                 path: result.url
//             },
//             msg: 'suc'
//         })
//     }
//     // 上传之后删除本地文件
//     fs.unlinkSync(filePath);
// });

