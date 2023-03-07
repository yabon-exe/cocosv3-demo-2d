import { _decorator, Component, Collider2D, Contact2DType } from 'cc';
const { ccclass } = _decorator;

/**
 * 弾丸(抽象)
 */
@ccclass('Bullet')
export abstract class Bullet extends Component {

    /**
     *  弾丸プロパティ
     */
    bulletProperty: {};

    /**
     * 生存フラグ
     */
    alive:boolean;

    /**
     * ※継承
     * 弾丸初期化
     * @param bulletProperty 弾丸のプロパティ
     */
    abstract init(bulletProperty): void;

    /**
     * ※継承
     * 衝突処理
     * @param selfCollider 自身の接触オブジェクト
     * @param otherCollider 相手の接触オブジェクト
     * @param contact 接触情報
     */
    abstract onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: any): void;

    start() {
        // 弾丸初期化
        this.alive = true;
        this.init(this.bulletProperty);
        // 弾丸の衝突イベント設定
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    update(deltaTime: number) {

    }
}


