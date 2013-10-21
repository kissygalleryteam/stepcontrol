## 综述

stepcontrol是一个控制步骤的组件，本身不提供样式。

* 版本：1.0
* 作者：展烨
* 标签：
* demo：[http://gallery.kissyui.com/stepcontrol/1.0/demo/index.html](http://gallery.kissyui.com/stepcontrol/1.0/demo/index.html)

## 初始化组件

    S.use('gallery/stepcontrol/1.0/index', function (S, Stepcontrol) {
         var stepcontrol = new Stepcontrol(config);
    })

## API说明


### config 参数说明

- container: 容器节点（必须）
- stepCls: 每个步骤的容器class , 默认 .step
- nextCls: 下一步 按钮的class, 默认.J_NextStep
- prevCls: 上一步 按钮的class, 默认.J_PrevStep
- currentStepCls: 当前步骤的class, 默认.current-step
- completeCls: 已经完成步骤（即当前步骤之前的所有步骤）的class, 默认.complete


### ATTRS

- currentStep: 当前步骤的序号

### 方法
- activeStep(stepNum): 激活第stepNum个步骤，即给其所在的步骤节点的class加入currentStepCls , 之前的步骤节点加入completeCls
- async(fn): 在某个步骤中异步操作，fn为用户传人的函数，见demo。

### 事件
-beforeCurrentStepChange
-afterCurrentStepChange

      stepcontrol.on('beforeCurrentStepChange',function(e){
        //e.newVal
        //e.prevVal
      });


