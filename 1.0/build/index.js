/*
combined files : 

gallery/stepcontrol/1.0/index

*/
/**
 * @fileoverview
 * @author 展烨<zhanye.xyf@taobao.com>
 * @module stepcontrol
 **/
KISSY.add('gallery/stepcontrol/1.0/index',function (S, Node,Base) {

    var EMPTY = '';
    var $ = Node.all;

    /**
     * 
     * @class Stepcontrol
     * @constructor
     * @extends Base
     */
    function Stepcontrol(cfg) {
        var self = this;

        self.container = S.one(cfg.container);
        self.stepCls = cfg.stepCls || '.step';
        self.nextCls = cfg.nextCls || '.J_NextStep';
        self.prevCls = cfg.prevCls || '.J_PrevStep';
        self.currentStepCls = cfg.currentStepCls || '.current-step';
        self.completeCls =  cfg.completeCls || '.complete';
        self.notPassedAttr = cfg.notPassedAttr || 'data-not-passed';
        self.asyncFlag = false;

        this._init();
        //调用父类构造函数
        Stepcontrol.superclass.constructor.call(self, cfg);
    }
    S.extend(Stepcontrol, Base, /** @lends Stepcontrol.prototype*/{

      _init: function () {

        var self = this;
        self.bindEvent();
      },

      prev: function (tg) {

        var self = this,
            currentStepNode = tg.parent(self.stepCls),
            prevStepNode = currentStepNode.prev(self.stepCls);

        if (!prevStepNode) return;

        self.set('currentStep', self.get('currentStep') - 1);

        if(!self.asyncFlag){

          self.activeStep(self.get('currentStep'));
        }

        self.asyncFlag = false;

      },

      next: function (tg) {

        var self = this,
            currentStepNode = tg.parent(self.stepCls),
            nextStepNode = currentStepNode.next(self.stepCls);

        if (!nextStepNode) return;

        self.set('currentStep', self.get('currentStep') + 1);

        S.log('currentStep is:');
        S.log(self.get('currentStep'));

        if(!self.asyncFlag){

          self.activeStep(self.get('currentStep'));
        }

        self.asyncFlag = false;
      },

      //激活某步骤 
      activeStep: function(stepNum){

        var self = this;

        if(isNaN(stepNum)){
          return;
        }

        self.set('currentStep',stepNum);
        stepNum -= 1;

        var allStepNodes = self.container.all(self.stepCls),
          targetStepNode = allStepNodes.item(stepNum);

        allStepNodes.each(function(v,k){

          v = S.one(v);

          if(k < stepNum){

            v.removeClass(self.currentStepCls).addClass(self.completeCls);
          }
          else if(k == stepNum){

            v.addClass(self.currentStepCls).removeClass(self.completeCls);
          }
          else{

            v.removeClass(self.currentStepCls).removeClass(self.completeCls);
          }
        });

        if(self.isGotoStepNode){

          self.gotoStepNode(targetStepNode);
        }

      },

      async: function(fn){

        var self = this;
        self.asyncFlag = true;
        fn();
      },

      gotoStepNode: function(node){

        var top = node.offset().top;
        S.log('top is');
        S.log(top);
        window.scrollTo(0,top);
      },

      bindEvent: function(){

        var self = this;

        self.container.delegate('click', self.nextCls, function (e) {

          var tg = S.one(e.currentTarget);
          if(tg.hasAttr(self.notPassedAttr)){
            return;
          }
          self.next(S.one(e.currentTarget));
        });

        self.container.delegate('click', self.prevCls, function (e) {

          self.prev(S.one(e.currentTarget));
        });

      }

    }, {ATTRS : /** @lends Stepcontrol*/{
      currentStep: {
                     value: 1
                   }
    }});

    return Stepcontrol;
}, {requires:['node', 'base']});




