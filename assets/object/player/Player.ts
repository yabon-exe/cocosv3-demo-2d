import { _decorator, Component, RigidBody2D, find, v2, Collider2D, Contact2DType, tween, Tween, Node } from 'cc';
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
     * ダメージモーション
     */
    damageTween: Tween<Node>;

    /**
     * ダメージによるストップフラグ
     */
    damageStopping: boolean = false;

    /**
     * 衝突処理
     * 
     * @param selfCollider 自身の接触オブジェクト
     * @param otherCollider 相手の接触オブジェクト
     * @param contact 接触情報
     */
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: any): void {

        if (otherCollider.tag == 10) {
            // ダメージを受ける
            this.damageStopping = true;
            // 弾丸に当たったら振動する
            this.damageTween.start();   
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
            let property = find('Property', this.node.parent).getComponent(Property);
            let tag = property.getTag('NONE');
            collider.tag = tag;
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        // 揺れている期間
        const duration:number  = 0.03;
        // 揺れ幅
        const hitAngle:number = 20;
        //ダメージモーション設定
        this.damageTween = tween(this.node)
            .to(duration / 2.0, { angle: -hitAngle })
            .to(duration, { angle: hitAngle })
            .to(duration, { angle: -hitAngle })
            .to(duration, { angle: hitAngle })
            .to(duration, { angle: -hitAngle })
            .to(duration / 2.0, { angle: 0 })
            .call(() => {
                // モーション終了時にダメージによるストップフラグを解除する
                this.damageStopping = false;
            });   
    }
    update() {

        if (this.damageStopping) {
            // ダメージモーション中は停止
            this.rigidBody.linearVelocity = v2(0, 0);
        } else if (this.touchController.swiping) {
            // touch-controllerの入力を読み取って動作する
            let vel = this.touchController.swipeVec;
            this.rigidBody.linearVelocity = vel;
        } else {
            this.rigidBody.linearVelocity = v2(0, 0);
        }
    }
}

