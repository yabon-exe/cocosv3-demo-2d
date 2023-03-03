import { _decorator, Component, Prefab, instantiate, find } from 'cc';
import { Bullet } from '../bullet/Bullet'
const { ccclass, property } = _decorator;

/**
 * 弾丸発射砲台
 * 弾丸はカスタマイズ可能
 */
@ccclass('Battery')
export class Battery extends Component {

    player: any;

    /**
     * 弾のPrefab
     */
    @property(Prefab)
    bulletPrefab: Prefab = null;

    /**
     * 弾の発射間隔
     */
    @property
    bulletInterval: number = 3.0;

    /**
     * 設定された弾丸を発射
     */
    fire() {
        // 弾のPrefabをインスタンス化(登場)させる
        let bullet = instantiate(this.bulletPrefab).getComponent('Bullet');

        if (bullet) {
            // 弾の位置は発射台と同じにする
            bullet.node.setPosition(this.node.position);
            // 弾は自分(発射台)の子オブジェクトとする
            bullet.node.parent = this.node.parent;
            // 発射弾丸にプロパティ(プレイヤー情報など)をセットする
            let bulletObj = bullet as Bullet;
            bulletObj.bulletProperty = {
                'player': this.player
            };
        }
    }

    start() {
        // player
        this.player = find('Player', this.node.parent).getComponent('Player');
        // 弾の発射設定
        this.schedule(this.fire, this.bulletInterval);
    }

    update(deltaTime: number) {

    }
}


