<?php
/**
 * @since   2017-07-08
 * @author  九月一十八 
 */

namespace Admin\Controller;

class ImagesCategoryController extends BaseController {

    public function index() {
        $list = D('ImagesCategory')->order('displayorder desc')->select();
        $list = formatTree(listToTree($list));
        $this->assign('list', $list);
        $this->display();
    }

	/**
     * 新增分类
     * @author  九月一十八 
     */
    public function add() {
        if (IS_POST) {
            $data = I('post.');
            $data['is_display'] = isset($data['is_display']) ? 1 : 0;
            $res = D('ImagesCategory')->add($data);
            if ($res === false) {
                $this->ajaxError('操作失败');
            } else {
                $this->ajaxSuccess('添加成功');
            }
        } else {
            $originList = D('ImagesCategory')->order('displayorder desc')->select();
            $parentid = '';
            $id = I('get.id');
            if (!empty($id)) {
                $parentid = $id;
            }
            $options = formatTree(listToTree($originList));
            $this->assign('options', $options);
            $this->assign('parentid', $parentid);
            $this->display();
        }
    }

    /**
     * 显示分类
     * @author  九月一十八 
     */
    public function open() {
        $id = I('post.id');
        $res = D('ImagesCategory')->where(array('pid' => $id))->save(array('is_display' => 0));
        if ($res === false) {
            $this->ajaxError('操作失败');
        } else {
            $this->ajaxSuccess('添加成功');
        }
    }

    /**
     * 隐藏分类
     * @author  九月一十八 
     */
    public function close() {
        $id = I('post.id');
        $res = D('ImagesCategory')->where(array('pid' => $id))->save(array('is_display' => 1));
        if ($res === false) {
            $this->ajaxError('操作失败');
        } else {
            $this->ajaxSuccess('添加成功');
        }
    }

    /**
     * 编辑分类
     * @author  九月一十八 
     */
    public function edit() {
        if (IS_GET) {
            $originList = D('ImagesCategory')->order('displayorder desc')->select();
            $list = $this->buildArrByNewKey2($originList);           
            $listInfo = $list[I('get.id')];         
            $options = formatTree(listToTree($originList));
            $this->assign('detail', $listInfo);
            $this->assign('options', $options);
            $this->display('add');
        } elseif (IS_POST) {
            $postData = I('post.');
            $postData['is_display'] = isset($postData['is_display']) ? 1 : 0;
            $res = D('ImagesCategory')->where(array('pid' => $postData['pid']))->save($postData);
            if ($res === false) {
                $this->ajaxError('操作失败');
            } else {
                $this->ajaxSuccess('编辑成功');
            }
        }
    }
    /**
     * 删除分类
     * @author  九月一十八
     */
    public function del() {
        $id = I('post.id');
        $childNum = D('ImagesCategory')->where(array('parentid' => $id))->count();
        if ($childNum) {
            $this->ajaxError("当前分类存在子分类,不可以被删除!");
        } else {
            D('ImagesCategory')->where(array('pid' => $id))->delete();
            $this->ajaxSuccess('编辑成功');
        }
    }

}