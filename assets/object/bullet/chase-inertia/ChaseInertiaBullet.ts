import { _decorator, RigidBody2D, Vec2, v2, Collider2D } from 'cc';
import { Bullet } from '../Bullet'
const { ccclass, property } = _decorator;

/**
 * プレイヤーを追跡する弾丸
 */
@ccclass('ChaseInertiaBullet')
export class ChaseInertiaBullet extends Bullet {

    rigidBody: RigidBody2D = null;

    player = null;

    /**
     * 弾の加速度
     */
    @property
    acceleration: number = 1.5;

    /**
     * 弾の速度
     */
    @property
    speed: number = 30.0;

    /**
     * 弾丸初期化
     * @param bulletProperty 弾丸のプロパティ
     */
    init(bulletProperty): void {
        // 自身のボディを取得する
        this.rigidBody = this.node.getComponent(RigidBody2D);
        // プレイヤー情報を取得する
        this.player = bulletProperty.player;
        // 弾を回転させる
        this.rigidBody.angularVelocity = -10;
    }

    /**
     * 衝突処理
     * @param selfCollider 自身の接触オブジェクト
     * @param otherCollider 相手の接触オブジェクト
     * @param contact 接触情報
     */
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: any): void {
        // 何かに接触した弾は破滅させる
        this.alive = false;
    }

    update(deltaTime: number) {
        // 移動方向・速度を更新し続ける
        let playerPos: Vec2 = v2(this.player.node.position.x, this.player.node.position.y);
        let myPos: Vec2 = v2(this.node.position.x, this.node.position.y);
        let vel: Vec2 = playerPos.subtract(myPos);
        vel.normalize();
        vel.multiplyScalar(1.5);
        let nowVel: Vec2 = this.rigidBody.linearVelocity;
        nowVel.x += vel.x;
        nowVel.y += vel.y;
        if (nowVel.length() > this.speed) {
            // 弾の速度を調整する
            nowVel.normalize();
            nowVel.multiplyScalar(this.speed);
        }
        this.rigidBody.linearVelocity = nowVel;
    }
}


