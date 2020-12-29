/**
 * 导入方式
 * import vedio from '@/data/vedio'
 */

const videoFormat = [
    // 视频格式
    { id: 1, name: 'PNG序列' },
    { id: 2, name: 'fiash' },
    { id: 3, name: 'veg' },
    { id: 4, name: 'prproj' },
    { id: 5, name: 'AEP' },
    { id: 6, name: 'MOW' },
    { id: 7, name: 'TGA序列' },
    { id: 8, name: 'MP4' },
    { id: 9, name: 'MPG' },
    { id: 10, name: 'AVI' },
    { id: 11, name: 'WMV' },
]
const editRange = [
    // 可修改范围
    { id: 6, name: '直接使用不可修改' },
    { id: 7, name: '全部为分层内容' },
    { id: 8, name: '图文可替换' },
    { id: 9, name: '仅图片可替换' },
    { id: 10, name: '仅文字可替换' },
]

const colorScheme = [
    // 配色方案
    { id: 1, name: '红色系', code: '#ff0000' },
    { id: 2, name: '橙色系', code: '#FFA500' },
    { id: 3, name: '绿色系', code: '#00ff00' },
    { id: 4, name: '黄色系', code: '#FFFF00' },
    { id: 5, name: '蓝色系', code: '#0000ff' },
    { id: 6, name: '紫色系', code: '#800080' },
    { id: 7, name: '黑色系', code: '#000000' },
    { id: 8, name: '白色系', code: '#ffffff' },
    { id: 9, name: '灰色系', code: '#808080' },
    { id: 10, name: '金色系', code: '#FFD700' },
    { id: 11, name: '银色系', code: '#C0C0C0' },
    { id: 12, name: '青色系', code: '#00FFFF' },
]
const aspectRatio = [
    // 宽高比
    { id: 1, name: '16:9' },
    { id: 2, name: '4:3' },
    { id: 3, name: 'A4' },
    { id: 4, name: '超宽屏' },
    { id: 5, name: '竖屏' },
]

const pixel = [
    // 像素
    { id: 1, name1: 700, name2: 576 },
    { id: 2, name1: 800, name2: 800 },
    { id: 3, name1: 1280, name2: 720 },
    { id: 4, name1: 1920, name2: 600 },
    { id: 5, name1: 1920, name2: 1080 },
]

export default {
    videoFormat,
    editRange,
    aspectRatio, 
    colorScheme,
    pixel
}
