import { _decorator, RigidBody2D, Vec2, v2, Collider2D } from 'cc';
import { Bullet } from '../Bullet'
const { ccclass } = _decorator;

/**
 * プレイヤーに向かってまっすぐ飛ぶ弾丸
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
        // 移動方向・速度を設定する
        let playerPos: Vec2 = v2( player.node.position.x, player.node.position.y);
        let myPos: Vec2 = v2( this.node.position.x, this.node.position.y);
        let vel: Vec2 = playerPos.subtract(myPos);
        vel.normalize();
        vel.multiplyScalar(3);
        this.rigidBody.linearVelocity = vel;
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


