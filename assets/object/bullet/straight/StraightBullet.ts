import { _decorator, RigidBody2D, v2, Collider2D } from 'cc';
import { Bullet } from '../Bullet'
const { ccclass, property } = _decorator;

/**
 * まっすぐ飛ぶ弾丸
 */
@ccclass('StraightBullet')
export class StraightBullet extends Bullet {

    rigidBody: RigidBody2D = null;

    /**
     * 弾丸初期化
     * @param bulletProperty 弾丸のプロパティ
     */
    init(bulletProperty): void {
        // 自身のボディを取得する
        this.rigidBody = this.node.getComponent(RigidBody2D);
        // プレイヤー情報を取得する
        let player = bulletProperty.player;
        this.rigidBody.linearVelocity = v2(5, 0);
    }

    /**
     * 弾丸初期化
     * @param selfCollider 自身の接触オブジェクト
     * @param otherCollider 相手の接触オブジェクト
     * @param contact 接触情報
     */
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: any): void {
        console.log('-----------------------');
        console.log(selfCollider.name);
        console.log(otherCollider.name);
        console.log('=======================');
    }
}


