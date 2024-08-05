/**
 * 图片预览是一个比较常用的功能，封装成函数调用可以简化我们使用的方式
 * 基于 element-plus 的 ElImageViewer 组件
 * 对于有类似的功能都可以使用这种方式，例如想使用函数调用的方式弹窗
 */
import {createVNode, render, VNode} from 'vue'
import type {ImageViewerProps} from 'element-plus'

type PreviewOption = Partial<ImageViewerProps>

/**
 * 图片预览
 * @param option
 */
export function imagePreview(option: PreviewOption) {
    const container: HTMLDivElement = document.createElement('div')
    let vm: VNode<any, any> = createVNode(ElImageViewer, {
        ...option,
        onClose() {
            render(null, container)
        }
    })
    // 将组件渲染成真实节点
    render(vm, container)
    document.getElementById("app")?.appendChild(container.firstElementChild!)
}
