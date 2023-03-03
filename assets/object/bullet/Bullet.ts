import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export abstract class Bullet extends Component {

    /**
     *  弾丸プロパティ
     */
    bulletProperty: {};

    abstract init(bulletProperty): void;

    start() {
        this.init(this.bulletProperty);
    }

    update(deltaTime: number) {

    }
}


