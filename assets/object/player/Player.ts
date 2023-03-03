import { _decorator, Component, RigidBody2D, find, v2, Collider2D, Contact2DType, ColliderComponent } from 'cc';
const { ccclass } = _decorator;

/**
* プレイヤー
*/
@ccclass('Player')
export default class Player extends Component {
    touchController: any = null;
    rigidBody: RigidBody2D = null;
    
    start() {
        // touch-controllerを取得する
        this.touchController = find("TouchController", this.node.parent).getComponent('TouchController');
        // 自身のボディを取得する
        this.rigidBody = this.node.getComponent(RigidBody2D);
    }
    update() {

        // touch-controllerの入力を読み取って動作する
        if (this.touchController.swiping) {
            let vel = this.touchController.swipeVec;
            this.rigidBody.linearVelocity = vel;
        } else {
            this.rigidBody.linearVelocity = v2(0, 0);
        }
    }
}

