import { _decorator, Component, RigidBody2D, find, v2, Collider2D, Contact2DType, ColliderComponent } from 'cc';
const { ccclass, property } = _decorator;

/**
* プレイヤー
*/
@ccclass('Player')
export default class Player extends Component {
    touchController: any = null;
    rigidBody: RigidBody2D = null;
    onLoad() {

        // touch-controllerを取得する
        this.touchController = find("TouchController", this.node.parent).getComponent('TouchController');

        // 自身のボディを取得する
        this.rigidBody = this.node.getComponent(RigidBody2D);


    }
    
    start() {


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


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// const { ccclass, property } = cc._decorator;
// 
// /**
// * プレイヤー
// */
// @ccclass
// export default class Player extends cc.Component {
// 
//     touchController: any = null;
//     rigidBody: any = null;
// 
//     onLoad() {
//         let physicsManager = cc.director.getPhysicsManager(); // 物理マネージャーを取得する
//         physicsManager.enabled = true; // 物理マネージャーを有効にする
// 
//         // touch-controllerを取得する
//         this.touchController = cc.find("touch-controller", this.node.parent).getComponent('touch-controller');
// 
//         // 自身のボディを取得する
//         this.rigidBody = this.node.getComponent(cc.RigidBody);
// 
//         // //衝突した時の動作を設定する
//         let collider: cc.PhysicsCircleCollider = this.node.getComponent(cc.PhysicsCircleCollider);
//         collider.node.group = 'test';
//     }
// 
//     start() {
// 
// 
//     }
// 
//     update() {
// 
//         // touch-controllerの入力を読み取って動作する
//         if (this.touchController.swiping) {
//             let vel = this.touchController.swipeVec;
//             this.rigidBody.linearVelocity = vel;
//         } else {
//             this.rigidBody.linearVelocity = cc.v2(0, 0);
//         }
//     }
// }
