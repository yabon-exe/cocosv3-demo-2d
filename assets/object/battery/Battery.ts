import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Bullet } from '../bullet/Bullet'
const { ccclass, property } = _decorator;

/**
 * 弾丸発射砲台
 * 弾丸はカスタマイズ可能
 */
@ccclass('Battery')
export class Battery extends Component {

    @property(Prefab)
    bulletPrefab: Prefab = null; // 弾のPrefab

    @property
    bulletInterval: number = 3.0; // 弾の発射間隔

    /**
     * 設定された弾丸を発射
     */
    fire() {
        // 弾のPrefabをインスタンス化(登場)させる
        let bulletNode = instantiate(this.bulletPrefab);

        if (bulletNode) {
            // 弾の位置は発射台と同じにする
            bulletNode.setPosition(this.node.position);
            // 弾は自分(発射台)の子オブジェクトとする
            bulletNode.parent = this.node.parent;
        }
    }

    start() {
        // 弾の発射設定
        this.schedule(this.fire, this.bulletInterval);
    }

    update(deltaTime: number) {

    }
}


