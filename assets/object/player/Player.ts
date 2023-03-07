import { _decorator, Component, RigidBody2D, find, v2, Collider2D, Contact2DType, tween } from 'cc';
import { Property } from '../property/Property'
const { ccclass } = _decorator;

/**
* プレイヤー
*/
@ccclass('Player')
export default class Player extends Component {
    touchController: any = null;
    rigidBody: RigidBody2D = null;

    /**
     * 衝突処理
     * 
     * @param selfCollider 自身の接触オブジェクト
     * @param otherCollider 相手の接触オブジェクト
     * @param contact 接触情報
     */
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: any): void {

        if (otherCollider.tag == 10) {
            // 揺れている期間
            const duration:number  = 0.1;
            // 揺れ幅
            const hitAngle:number = 20;  

            tween(this.node)
                .to(duration / 2.0, { angle: -hitAngle })
                .to(duration, { angle: hitAngle })
                .to(duration, { angle: -hitAngle })
                .to(duration, { angle: hitAngle })
                .to(duration, { angle: -hitAngle })
                .to(duration / 2.0, { angle: 0 })
                .start();   
        }
    }

    start() {
        // touch-controllerを取得する
        this.touchController = find("TouchController", this.node.parent).getComponent('TouchController');
        // 自身のボディを取得する
        this.rigidBody = this.node.getComponent(RigidBody2D);

        // 弾丸の衝突イベント設定
        const collider = this.getComponent(Collider2D);
        if (collider) {
            // タグを設定する
            let property = find('Property', this.node.parent).getComponent('Property') as Property;
            let tag = property.getTag('NONE');
            collider.tag = tag;
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
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

