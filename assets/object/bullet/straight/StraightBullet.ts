import { _decorator, Component, Node } from 'cc';
import { Bullet } from '../Bullet'
const { ccclass, property } = _decorator;

@ccclass('StraightBullet')
export class StraightBullet extends Bullet {

    /**
     * 弾丸初期化
     */
    init(bulletProperty): void {

    }
}


