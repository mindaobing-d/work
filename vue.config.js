function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    devServer: {
        open: process.platform === 'darwin',
        host: 'localhost',
        port: 8888,
        https: false,
        hotOnly: false,
        open:true,
        proxy: 'http://localhost:3001', 
    }
}