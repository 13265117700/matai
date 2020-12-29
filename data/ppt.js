/**
 * 导入方式
 * import ppt from '@/data/ppt'
 */

const pptType = [
    // ppt类型
    { id: 1, name: '模板型PPT' },
    { id: 2, name: '内容型PPT' },
    { id: 3, name: '附演讲搞型PPT' },
    { id: 4, name: '视频型PPT' },
    { id: 5, name: '仅文字可替换' },
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


export default {
    pptType,
    aspectRatio,
    colorScheme
}
