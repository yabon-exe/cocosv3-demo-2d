import { _decorator, Component, Prefab, instantiate, find, Collider2D } from 'cc';
import { Bullet } from '../bullet/Bullet'
import { Property } from '../property/Property'
const { ccclass, property } = _decorator;

/**
 * 弾丸発射砲台
 * 弾丸はカスタマイズ可能
 */
@ccclass('Battery')
export class Battery extends Component {

    player: any;

    bulletList: Array<Bullet> = [];

    bulletTag: number;

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
        let bullet = instantiate(this.bulletPrefab).getComponent('Bullet') as Bullet;

        if (bullet) {
            // 弾丸タグを設定する
            let bulletCollider: Collider2D = bullet.getComponent(Collider2D);
            bulletCollider.tag = this.bulletTag;
            // 弾丸リストに登録する
            this.bulletList.push(bullet);
            // 弾の位置は発射台と同じにする
            bullet.node.setPosition(this.node.position);
            // 弾は自分(発射台)の子オブジェクトとする
            bullet.node.parent = this.node.parent;
            // 発射弾丸にプロパティ(プレイヤー情報など)をセットする
            bullet.bulletProperty = {
                'player': this.player
            };
        }
    }

    start() {
        // player
        this.player = find('Player', this.node.parent).getComponent('Player');
        // 弾の発射設定
        this.schedule(this.fire, this.bulletInterval);
        // 弾丸タグを取得する
        let property = find('Property', this.node.parent).getComponent(Property);
        let tag = property.getTag('BULLET');
        this.bulletTag = tag;
    }

    update(deltaTime: number) {

        let delIdxs: Array<number> = [];
        let idx = 0;
        // 削除(生存フラグが折れた)弾のインデックスを取得する
        this.bulletList.forEach((bullet: Bullet) => {
            if (!bullet.alive) {
                delIdxs.push(idx);
            }
            idx++;
        });

        // インスタンス化した弾を削除する
        delIdxs.forEach((idx: number) => {
            if (this.bulletList.length > idx && this.bulletList[idx].node != undefined) {
                // ノードが存在している（削除済みになっていない）弾丸を削除する
                this.bulletList[idx].node.destroy()
                this.bulletList.splice(idx, 1);
            }
        });
    }
}


